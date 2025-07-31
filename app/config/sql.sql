CREATE DATABASE cadastro_pf;

USE cadastro_pf;

CREATE TABLE pessoas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    dt_nascimento DATE NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    email VARCHAR(100),
    endereco VARCHAR(200),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    observacao TEXT,
    status ENUM('Ativo', 'Inativo') NOT NULL DEFAULT 'Ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);