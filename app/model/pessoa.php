<?php
class Pessoa {
    public $cd_pessoa;
    public $nm_pessoa;
    public $nr_cpf;
    public $dt_nascimento;
    public $ie_sexo;
    public $nr_telefone;
    public $ds_endereco;

    public function __construct($nm_pessoa = "", $nr_cpf = "", $dt_nascimento = "", $ie_sexo = "", $nr_telefone = "", $ds_endereco = "") {
        $this->nm_pessoa = $nm_pessoa;
        $this->nr_cpf = $nr_cpf;
        $this->dt_nascimento = $dt_nascimento;
        $this->ie_sexo = $ie_sexo;
        $this->nr_telefone = $nr_telefone;
        $this->ds_endereco = $ds_endereco;
    }
}
?>