<?php
class Conexao {
    public static function conectar() {
        $host = "localhost";
        $usuario = "root";
        $senha = "123456";
        $banco = "cadastro_pf";

        $conn = new mysqli($host, $usuario, $senha, $banco);

        if ($conn->connect_error) {
            die("Erro de conexão: " . $conn->connect_error);
        }

        return $conn;
    }
}
?>
