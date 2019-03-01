<?php
/* 
 * $link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
 * $idnt = basename($link);
 * if ($link[strlen($link)-1] == '/') $idnt = "";
 * $context = substr($link, 0, strlen($link)-strlen($idnt));
 * 
 * switch ($idnt) {
 *     case 'memorize':
 *         echo file_get_contents('play.html?mode=memorize');
 *         exit;
 *     case 'writing':
 *         echo file_get_contents('play.html?mode=writing');
 *         exit;
 *     case 'settings':
 *         echo file_get_contents('settings.html');
 *         exit;
 * }
 * 
 * 
 * if (isset($_COOKIE['memorize_visited'])) {
 *     echo file_get_contents('dashboard.html');
 *     exit;
 * }
 * */
setcookie("memorize_visited",time(),time()+ (10 * 365 * 24 * 60 * 60));

?>

<!Doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Memorize</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
        <link href="style.css" rel="stylesheet"/>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </head>
    <body>
        <section class="section">
            <div class="container">
                <h1 class="title">
                    Memorize
                </h1>
                <p class="subtitle">
                    You can memorize <strong>anything</strong>.
                </p>

                <a href="dashboard.html" class="button is-light">Go -&gt;</a>
            </div>
        </section>
    </body>
</html>
