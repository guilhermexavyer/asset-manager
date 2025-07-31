<?php
require_once '../model/Pessoa.php';
require_once '../dao/PessoaDAO.php';

$dao = new PessoaDAO();

// Verifica se está em modo de edição
$pessoaParaEditar = null;
if (isset($_GET['edit'])) {
    $idEditar = $_GET['edit'];
    $pessoaParaEditar = $dao->buscarPorId($idEditar);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pessoa = new Pessoa();
    $pessoa->nome = $_POST['nome'];
    // Remove máscara do CPF
    $pessoa->cpf = preg_replace('/\D/', '', $_POST['cpf']);

    // Data obrigatória (converte para YYYY-MM-DD)
    if (!empty($_POST['dt_nascimento'])) {
        $data = DateTime::createFromFormat('d/m/Y', $_POST['dt_nascimento']);
        if ($data) {
            $pessoa->dt_nascimento = $data->format('Y-m-d');
        } else {
            die("Data de nascimento inválida!");
        }
    } else {
        die("Data de nascimento é obrigatória!");
    }

    $pessoa->sexo = $_POST['sexo'];
    $pessoa->endereco = $_POST['endereco'];
    // Remove máscara do telefone
    $pessoa->telefone = preg_replace('/\D/', '', $_POST['telefone']);
    $pessoa->email = $_POST['email'];
    $pessoa->cidade = $_POST['cidade'];
    $pessoa->estado = $_POST['estado'];
    $pessoa->observacao = $_POST['observacao'];
    $pessoa->status = $_POST['status'];

    if (isset($_POST['id']) && !empty($_POST['id'])) {
        $pessoa->id = $_POST['id'];
        $dao->atualizar($pessoa, $_POST['id']);
    } else {
        $dao->inserir($pessoa);
    }

    header("Location: ../view/PessoaFisicaView.php");
    exit;
}

if (isset($_GET['delete'])) {
    $dao->deletar($_GET['delete']);
    header("Location: ../view/PessoaFisicaView.php");
    exit;
}
