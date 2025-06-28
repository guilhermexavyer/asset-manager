<?php
require_once "dao/dao_pessoa.php";

$dao = new PessoaDAO();
$pessoas = $dao->listar();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Cadastro de Pessoas</title>
</head>
<body>
    <h2>Cadastro de Pessoa</h2>
    <form method="post" action="../controller/controller_pessoa.php">
        <label>Nome:</label><input type="text" name="nm_pessoa" required><br>
        <label>CPF:</label><input type="text" name="nr_cpf" required><br>
        <label>Data de Nascimento:</label><input type="date" name="dt_nascimento"><br>
        <label>Sexo:</label>
        <select name="ie_sexo">
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
        </select><br>
        <label>Telefone:</label><input type="text" name="nr_telefone"><br>
        <label>Endereço:</label><input type="text" name="ds_endereco"><br>
        <input type="submit" value="Cadastrar">
    </form>

    <h2>Pessoas Cadastradas</h2>
    <table border="1">
        <tr>
            <th>Nome</th><th>CPF</th><th>Nascimento</th><th>Sexo</th><th>Telefone</th><th>Endereço</th>
        </tr>
        <?php foreach ($pessoas as $p) { ?>
            <tr>
                <td><?= htmlspecialchars($p['nm_pessoa']) ?></td>
                <td><?= htmlspecialchars($p['nr_cpf']) ?></td>
                <td><?= htmlspecialchars($p['dt_nascimento']) ?></td>
                <td><?= htmlspecialchars($p['ie_sexo']) ?></td>
                <td><?= htmlspecialchars($p['nr_telefone']) ?></td>
                <td><?= htmlspecialchars($p['ds_endereco']) ?></td>
            </tr>
        <?php } ?>
    </table>
</body>
</html>
