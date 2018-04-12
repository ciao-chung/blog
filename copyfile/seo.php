<?php
$ssrHost = 'http://ssr.ciao-chung.com';

$host = $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER["SERVER_NAME"];
$user_agent = urlencode($_SERVER['HTTP_USER_AGENT']);
$port = '';

if($_SERVER["REQUEST_SCHEME"] == 'http' && $_SERVER["SERVER_PORT"] != 80){
    $port = ':'.$_SERVER["SERVER_PORT"];
}

if($_SERVER["REQUEST_SCHEME"] == 'https' && $_SERVER["SERVER_PORT"] != 443){
    $port = ':'.$_SERVER["SERVER_PORT"];
}
$requestUrl = $host.$port.$_SERVER['REQUEST_URI'];
$result = file_get_contents($ssrHost.'/'.$requestUrl);
echo $result;