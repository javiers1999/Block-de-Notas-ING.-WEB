<?php
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET": 
        if (isset($_GET['action'])){
            $action = $_GET['action'];
            switch ($action){
                case 'datos':
                    $archivo = file_get_contents('./BDA.json');
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
                    $archivo = file_get_contents('./BDA.json');
                    $jsonData = json_decode($archivo, true);
                    var_dump($jsonData);
                    $aIngresar = new stdClass();
                    $aIngresar->titulo = $jsonObj->titulo;
                    $aIngresar->estado = $jsonObj->estado;
                    $aIngresar->descripcion = $jsonObj->descripcion;
                    
                    $cant = count($jsonData); 
                    $jsonData[$cant] = $aIngresar;

                    var_dump($jsonData);

                    $file = fopen("BDA.json" , "w");
                    if ($file){
                        fwrite($file, json_encode($jsonData));
                        fclose($file);
                    } else {
                        echo json_encode(array("error" => 400));
                    }
                    break;
                case 'eliminarDato':
                    $archivo = file_get_contents('./BDA.json');
                    $jsonData = json_decode($archivo);
                    var_dump($jsonData);
                    var_dump($jsonObj);
                    for($i = 0; $i<count($jsonData); $i++){
                        if ($jsonObj->titulo == $jsonData[$i]->titulo && $jsonObj->descripcion == $jsonData[$i]->descripcion){
                           unset($jsonData[$i]);
                        }
                    }
                    var_dump($jsonData);

                    $file = fopen("BDA.json" , "w");
                    if ($file){
                        fwrite($file, json_encode($jsonData));
                        fclose($file);
                    } else {
                        echo json_encode(array("error" => 400));
                    }
                    
                    break;
            }
        } else {
            echo json_encode(array('error' => 200));
        }
        break;
}
