<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, origin");

$servername = "localhost";
$username = "root";
$password = "";
$database = "app-tcc";
$conn = new mysqli($servername, $username, $password, $database);

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $usuario = $data['usuario'] ?? '';
    $senha = $data['senha'] ?? '';

    if ($usuario && $senha) {
        $query = "SELECT idUsuario, usuario, idProjeto FROM usuario WHERE usuario='$usuario' AND senha='$senha'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            echo json_encode([
                'success' => true,
                'idUsuario' => $user['idUsuario'],
                'usuario' => $user['usuario'],
                'idProjeto' => $user['idProjeto']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciais inválidas']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Dados de login incompletos']);
    }
}
?>
