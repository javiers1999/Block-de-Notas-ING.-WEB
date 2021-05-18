<?php
header('Access-Control-Allow-Origin: http://localhost:4200'); 
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: X-Requested-With, Accept, Content-Type");
header('content-type: application/json; charset=utf-8');


switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        if (isset($_GET['action'])){
            $action = $_GET['action'];
            switch ($action){
                case 'datos':
                    $archivo = file_get_contents('./BD.json');
                    echo($archivo);
                    break;
            }
        }
        break;
    case "POST":
        $json = file_get_contents('php://input');
        $jsonObj = json_decode($json);
        if ($json && isset($jsonObj->action)){
            $action = $jsonObj->action;
            switch ($action){
                case 'datos':
                    $archivo = file_get_contents('./BD.json');
                    $jsonData = json_decode($archivo);

                    $aIngresar = array(
                        "titulo" => $jsonObj->titulo,
                        "estado" => $jsonObj->estado,
                        "descripcion" => $jsonObj->descripcion
                    );
                    $jsonData[count($jsonData)] = $aIngresar;

                    echo json_encode($jsonData);

                    $file = fopen("BD.json" , "w");
                    fwrite($file, json_encode($jsonData));
                    break;
            }
        } else {
            echo json_encode(array('error' => 200));
        }
        break;
}
