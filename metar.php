<?php
// metar.php
// Proxy para obtener datos de NAABOL IFIS y evitar problemas de CORS

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

$url = "http://sare.naabol.gob.bo/ifis-appv3/public/sabo?page=1";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);

$response = curl_exec($ch);

if(curl_errno($ch)) {
    echo "Error al obtener datos: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);
?>

