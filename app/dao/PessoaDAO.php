<?php
require_once '../config/conexao.php';

class PessoaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Conexao::conectar();
    }

    public function inserir($pessoa) {
        $sql = "INSERT INTO pessoas (
            nome, cpf, dt_nascimento, sexo, endereco, telefone,
            email, cidade, estado, observacao, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param(
            "sssssssssss",
            $pessoa->nome,
            $pessoa->cpf,
            $pessoa->dt_nascimento,
            $pessoa->sexo,
            $pessoa->endereco,
            $pessoa->telefone,
            $pessoa->email,
            $pessoa->cidade,
            $pessoa->estado,
            $pessoa->observacao,
            $pessoa->status
        );

        return $stmt->execute();
    }

    public function listar() {
        $result = $this->conn->query("SELECT * FROM pessoas ORDER BY id DESC");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deletar($id) {
        $stmt = $this->conn->prepare("DELETE FROM pessoas WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function buscarPorId($id) {
        $stmt = $this->conn->prepare("SELECT * FROM pessoas WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function atualizar($pessoa, $id) {
        $sql = "UPDATE pessoas SET 
            nome = ?, cpf = ?, dt_nascimento = ?, sexo = ?, endereco = ?, telefone = ?, 
            email = ?, cidade = ?, estado = ?, observacao = ?, status = ? 
            WHERE id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param(
            "sssssssssssi",
            $pessoa->nome,
            $pessoa->cpf,
            $pessoa->dt_nascimento,
            $pessoa->sexo,
            $pessoa->endereco,
            $pessoa->telefone,
            $pessoa->email,
            $pessoa->cidade,
            $pessoa->estado,
            $pessoa->observacao,
            $pessoa->status,
            $id
        );

        return $stmt->execute();
    }
}
?>
