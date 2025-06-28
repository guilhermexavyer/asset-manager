<?php
require_once "model/pessoa.php";
require_once "dao/dao_pessoa.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $p = new Pessoa(
        $_POST['nm_pessoa'],
        $_POST['nr_cpf'],
        $_POST['dt_nascimento'],
        $_POST['ie_sexo'],
        $_POST['nr_telefone'],
        $_POST['ds_endereco']
    );

    $dao = new PessoaDAO();
    $dao->inserir($p);

    header("Location: view/view_pessoa.php");
    exit;
}
?>