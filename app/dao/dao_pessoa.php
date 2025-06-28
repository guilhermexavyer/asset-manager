<?php
require_once "config/conexao.php";

class PessoaDAO {
    private $con;

    public function __construct() {
        $this->con = Conexao::conectar();
    }

    public function inserir(Pessoa $p) {
        $sql = "INSERT INTO pessoa (nm_pessoa, nr_cpf, dt_nascimento, ie_sexo, nr_telefone, ds_endereco) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->con->prepare($sql);
        $stmt->execute([
            $p->nm_pessoa,
            $p->nr_cpf,
            $p->dt_nascimento,
            $p->ie_sexo,
            $p->nr_telefone,
            $p->ds_endereco
        ]);
    }

    public function listar() {
        $stmt = $this->con->query("SELECT * FROM pessoa");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>