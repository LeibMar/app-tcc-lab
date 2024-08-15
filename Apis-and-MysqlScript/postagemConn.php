<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type, origin");
$servername = "localhost";
$username = "root";
$password = "";
$database = "app-tcc";
$conn = new mysqli($servername, $username, $password, $database);

$postagens = [];

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $postagem = $_POST['postagem'] ?? '';
    $idUsuario = $_POST['idUsuario'] ?? ''; 
    $idProjeto = $_POST['idProjeto'] ?? '';  
    $fileUrls = [];
    date_default_timezone_set('America/Sao_paulo');
    $dateTime =  date('Y-m-d H:i:s'); 

    for ($i = 0; $i < 4; $i++) {
        if (isset($_FILES["file$i"])) {
            $targetDir = "C:/xampp/htdocs/uploads/";
            $fileName = basename($_FILES["file$i"]["name"]);
            $targetFilePath = $targetDir . $fileName;

            if (move_uploaded_file($_FILES["file$i"]["tmp_name"], $targetFilePath)) {
                $fileUrls[] = "http://localhost:8080/" . $fileName;
            } else {
                $fileUrls[] = null;
            }
        } else {
            $fileUrls[] = null;
        }
    }

    if (isset($_POST['id'])) {
        echo "entrou no looping de editar";
        $id = $_POST['id'];
        $query = "UPDATE postagem SET textoPostagem='$postagem', arquivoPostagem1='$fileUrls[0]', arquivoPostagem2='$fileUrls[1]', arquivoPostagem3='$fileUrls[2]', arquivoPostagem4='$fileUrls[3]', dataHora='$dateTime' WHERE idPostagem='$id' AND idUsuario='$idUsuario'";
    } else {
        $query = "INSERT INTO postagem (textoPostagem, arquivoPostagem1, arquivoPostagem2, arquivoPostagem3, arquivoPostagem4, idUsuario, idProjeto, dataHora) VALUES ('$postagem', '$fileUrls[0]', '$fileUrls[1]', '$fileUrls[2]', '$fileUrls[3]', '$idUsuario', '$idProjeto', '$dateTime')";
        echo "entrou no looping de postar";
    }

    if (mysqli_query($conn, $query)) {
        echo "Postagem feita com sucesso";
    } else {
        echo "Erro ao fazer postagem";
    }
}

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $query = "select 
postagem.idProjeto,    
usuario.usuario,
postagem.textoPostagem,
postagem.arquivoPostagem1,
postagem.arquivoPostagem2,
postagem.arquivoPostagem3,
postagem.arquivoPostagem4,
postagem.dataHora,
postagem.idUsuario

from
postagem
JOIN
usuario ON postagem.idUsuario = usuario.idUsuario
ORDER BY dataHora";
    if ($is_query_run = mysqli_query($conn, $query)) {
        while ($query_executed = mysqli_fetch_assoc($is_query_run)) {
            $postagens[] = $query_executed;
        }
    }

    echo json_encode($postagens);
}
?>
