<?php
class Conexao {
    public static function conectar() {
        try {
            $con = new PDO("mysql:host=localhost;dbname=asset_manager_homol", "root", "123456");
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $con;
        } catch (PDOException $e) {
            echo "Erro: " . $e->getMessage();
        }
    }
}
?>
