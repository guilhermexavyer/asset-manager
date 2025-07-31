<?php
    require_once '../dao/PessoaDAO.php';
    $dao = new PessoaDAO();
    $pessoas = $dao->listar();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>patrimon.io</title>
    <link rel="icon" href="../assets/images/icone.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/dashboard.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Menu Lateral Principal -->
    <nav class="sidebar-principal" id="sidebarPrincipal">
        <!-- Container do Logo -->
        <div class="container-logo">
            <div class="icone-logo">
                <i class="fa-solid fa-box"></i>
            </div>
            <div class="texto-logo">
                <span class="texto-logo-principal">patrimon.</span><span class="texto-logo-secundario">io</span>
            </div>
        </div>

        <!-- Menu de Navegação -->
        <ul class="menu-navegacao">
            <li class="item-navegacao ativo">
                <a href="dashboard.html" class="link-navegacao">
                    <i class="fas fa-tachometer-alt icone-navegacao"></i>
                    <span class="texto-navegacao">Dashboard</span>
                </a>
            </li>
            <li class="item-navegacao tem-submenu" data-tooltip="Patrimônio">
                <a href="#patrimonio" class="link-navegacao">
                    <i class="fas fa-building icone-navegacao"></i>
                    <span class="texto-navegacao">Patrimônio</span>
                    <i class="fas fa-chevron-down seta-submenu"></i>
                </a>
                <ul class="submenu">
                    <li class="item-submenu">
                        <a href="#ativos" class="link-submenu">
                            <i class="fas fa-boxes icone-submenu"></i>
                            <span class="texto-submenu">Ativos</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#licencas" class="link-submenu">
                            <i class="fas fa-certificate icone-submenu"></i>
                            <span class="texto-submenu">Licenças</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#dominios" class="link-submenu">
                            <i class="fas fa-globe icone-submenu"></i>
                            <span class="texto-submenu">Domínios</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="item-navegacao tem-submenu" data-tooltip="Cadastros Gerais">
                <a href="#cadastros" class="link-navegacao">
                    <i class="fas fa-database icone-navegacao"></i>
                    <span class="texto-navegacao">Cadastros Gerais</span>
                    <i class="fas fa-chevron-down seta-submenu"></i>
                </a>
                <ul class="submenu">
                    <li class="item-submenu">
                        <a href="#categoria-ativos" class="link-submenu">
                            <i class="fas fa-tags icone-submenu"></i>
                            <span class="texto-submenu">Categoria de Ativos</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#categoria-licencas" class="link-submenu">
                            <i class="fas fa-tags icone-submenu"></i>
                            <span class="texto-submenu">Categoria de Licenças</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#fornecedor" class="link-submenu">
                            <i class="fas fa-truck icone-submenu"></i>
                            <span class="texto-submenu">Fornecedor</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#localizacao" class="link-submenu">
                            <i class="fas fa-map-marker-alt icone-submenu"></i>
                            <span class="texto-submenu">Localização</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#pessoa-fisica" class="link-submenu">
                            <i class="fas fa-user icone-submenu"></i>
                            <span class="texto-submenu">Pessoa Física</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#pessoa-juridica" class="link-submenu">
                            <i class="fas fa-building icone-submenu"></i>
                            <span class="texto-submenu">Pessoa Jurídica</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#prestador-servico" class="link-submenu">
                            <i class="fas fa-handshake icone-submenu"></i>
                            <span class="texto-submenu">Prestador de Serviço</span>
                        </a>
                    </li>
                    <li class="item-submenu">
                        <a href="#usuarios" class="link-submenu">
                            <i class="fas fa-users icone-submenu"></i>
                            <span class="texto-submenu">Usuários</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="item-navegacao">
                <a href="#manutencao" class="link-navegacao">
                    <i class="fas fa-tools icone-navegacao"></i>
                    <span class="texto-navegacao">Manutenção</span>
                </a>
            </li>
            <li class="item-navegacao">
                <a href="#relatorios" class="link-navegacao">
                    <i class="fas fa-chart-bar icone-navegacao"></i>
                    <span class="texto-navegacao">Relatórios</span>
                </a>
            </li>
            <li class="item-navegacao">
                <a href="#configuracoes" class="link-navegacao">
                    <i class="fas fa-cog icone-navegacao"></i>
                    <span class="texto-navegacao">Configurações</span>
                </a>
            </li>
        </ul>

        <!-- Container de Logout -->
        <div class="container-logout">
            <button class="botao-logout" id="botaoLogout">
                <i class="fas fa-sign-out-alt"></i>
                <span class="texto-logout">SAIR</span>
            </button>
        </div>
    </nav>

    <!-- Overlay para Mobile -->
    <div class="overlay-mobile" id="overlayMobile"></div>

    <!-- Conteúdo Principal -->
    <main class="conteudo-principal">
        <!-- Cabeçalho do Dashboard -->
        <header class="cabecalho-dashboard">
            <button class="botao-menu-toggle" id="botaoMenuToggle">
                <i class="fas fa-bars"></i>
            </button>
            <h1 class="titulo-pagina">Pessoa Física</h1>
            <div class="informacoes-usuario">
                <span class="nome-usuario">Nome da Pessoa</span>
                <div class="avatar-usuario">
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
        </header>

        <!-- Área de Conteúdo -->
        <div class="area-conteudo">
            <!-- Cards de cadastro -->

            <div class="cards-cadastro">
                <div class="card-cadastro">
                    <h3>Cadastro</h3>

                    <form method="POST" action="../controller/PessoaController.php">
                        <div class="linha-campos">
                            <div class="campo">
                                <div class="campo-label">
                                    <i class="fa-solid fa-asterisk"></i>
                                    <label for="">Nome</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: nome"></i>
                                </div>
                                <div class="campo-input">
                                    <input type="text" name="nome" required style="width: 100%;">
                                </div>
                            </div>
                        </div>

                        <div class="linha-campos">
                            <div class="campo">
                                <div class="campo-label">
                                    <i class="fa-solid fa-asterisk"></i>
                                    <label for="">CPF</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: cpf"></i>
                                </div>
                                <div class="campo-input">
                                    <input type="text" id="cpf" name="cpf" required style="width: 98%;">
                                </div>
                            </div>
                            <div class="campo">
                                <div class="campo-label">
                                    <i class="fa-solid fa-asterisk"></i>
                                    <label for="">Data de nascimento</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: dt_nascimento"></i>
                                </div>
                                <div class="campo-input">
                                    <input type="text" id="dt_nascimento" name="dt_nascimento" placeholder="dd/mm/aaaa" maxlength="10" style="width: 98%;">
                                </div>
                            </div>
                            <div class="campo">
                                <div class="campo-label">
                                    <i class="fa-solid fa-asterisk"></i>
                                    <label for="">Sexo</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: sexo"></i>
                                </div>
                                <div class="campo-input">
                                    <select name="sexo" required style="width: 98%;">
                                        <option value="" selected>---</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="linha-campos">
                            <div class="campo">
                                <div class="campo-label">
                                    <i class="fa-solid fa-asterisk"></i>
                                    <label for="">Telefone</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: telefone"></i>
                                </div>
                                <div class="campo-input">
                                    <input type="text" id="telefone" name="telefone" placeholder="(00) 0000-0000" required style="width: 98%;">
                                </div>
                            </div>
                            <div class="campo">
                                <div class="campo-label">
                                    <label for="">E-mail</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: email"></i>
                                </div>
                                <div class="campo-input">
                                    <input type="text" name="email" style="width: 98%;">
                                </div>
                            </div>
                        </div>

                        <div class="linha-campos">
                            <div class="campo">
                                <div class="campo-label">
                                    <label for="">Endereço</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: endereco"></i>
                                </div>
                                <div class="campo-input">
                                    <input type="text" name="endereco" style="width: 100%;">
                                </div>
                            </div>
                        </div>

                        <div class="linha-campos">
                            <div class="campo">
                                <div class="campo-label">
                                    <label for="">Cidade</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: cidade"></i>
                                </div>
                                <div class="campo-input">
                                    <input type="text" name="cidade" style="width: 98%;">
                                </div>
                            </div>
                            <div class="campo">
                                <div class="campo-label">
                                    <label for="">Estado</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: estado"></i>
                                </div>
                                <div class="campo-input">
                                    <select name="estado" style="width: 98%;">
                                        <option value="" selected>---</option>
                                        <option value="AC">AC</option>
                                        <option value="AL">AL</option>
                                        <option value="AP">AP</option>
                                        <option value="AM">AM</option>
                                        <option value="BA">BA</option>
                                        <option value="CE">CE</option>
                                        <option value="DF">DF</option>
                                        <option value="ES">ES</option>
                                        <option value="GO">GO</option>
                                        <option value="MA">MA</option>
                                        <option value="MT">MT</option>
                                        <option value="MS">MS</option>
                                        <option value="MG">MG</option>
                                        <option value="PA">PA</option>
                                        <option value="PB">PB</option>
                                        <option value="PR">PR</option>
                                        <option value="PE">PE</option>
                                        <option value="PI">PI</option>
                                        <option value="RJ">RJ</option>
                                        <option value="RN">RN</option>
                                        <option value="RS">RS</option>
                                        <option value="RO">RO</option>
                                        <option value="RR">RR</option>
                                        <option value="SC">SC</option>
                                        <option value="SP">SP</option>
                                        <option value="SE">SE</option>
                                        <option value="TO">TO</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="linha-campos">
                            <div class="campo">
                                <div class="campo-label">
                                    <label for="">Observação</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: observacao"></i>
                                </div>
                                <div class="campo-input">
                                    <textarea name="observacao" style="width: 100%;"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="linha-campos">
                            <div class="campo">
                                <div class="campo-label">
                                    <i class="fa-solid fa-asterisk"></i>
                                    <label>Situação</label>
                                    <i class="fa-solid fa-database" title="Tabela: pessoa_fisica | Atributo: status"></i>
                                </div>
                                <div class="campo-input">
                                    <label><input type="radio" name="status" value="Ativo" checked> Ativo</label>
                                    <label><input type="radio" name="status" value="Inativo"> Inativo</label>
                                </div>
                            </div>
                        </div>

                        <div class="formulario-botoes">
                            <a href="" style="width:49%">Limpar campos</a>
                            <button type="submit" style="width:49%">Salvar</button>
                        </div>
                    </form>    
                </div>

                <div class="card-cadastro">
                    <h3>Registros</h3>
                    <table>
                        <!-- Cabeçalho da tabela -->
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data de Nascimento</th>
                                <th>Sexo</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <!-- Dados da tabela -->
                        <tbody>
                            <?php foreach ($pessoas as $p): ?>
                            <tr>
                                <td class="status">
                                    <?php if ($p['status'] === 'Ativo'): ?>
                                        <span title="Ativo" style="display:inline-block; width:12px; height:12px; background-color:#00a300; border-radius:50%;"></span>
                                    <?php elseif ($p['status'] === 'Inativo'): ?>
                                        <span title="Inativo" style="display:inline-block; width:12px; height:12px; background-color:red; border-radius:50%;"></span>
                                    <?php else: ?>
                                        <?= htmlspecialchars($p['status']) ?>
                                    <?php endif; ?>
                                </td>
                                <td class="id"><?= htmlspecialchars($p['id']) ?></td>
                                <td class="nome"><?= htmlspecialchars($p['nome']) ?></td>
                                <td>
                                    <?= !empty($p['cpf'])
                                        ? preg_replace("/(\d{3})(\d{3})(\d{3})(\d{2})/", "$1.$2.$3-$4", $p['cpf'])
                                        : '' 
                                    ?>
                                </td>
                                <td>
                                    <?= !empty($p['dt_nascimento'])
                                        ? date('d/m/Y', strtotime($p['dt_nascimento']))
                                        : ''
                                    ?>
                                </td>
                                <td><?= htmlspecialchars($p['sexo']) ?></td>
                                <td>
                                    <?php 
                                        $tel = preg_replace('/\D/', '', $p['telefone']); 
                                        if (!empty($tel)) {
                                            if (strlen($tel) === 11) {
                                                echo sprintf("(%s) %s-%s",
                                                    substr($tel, 0, 2),
                                                    substr($tel, 2, 5),
                                                    substr($tel, 7)
                                                );
                                            } elseif (strlen($tel) === 10) {
                                                echo sprintf("(%s) %s-%s",
                                                    substr($tel, 0, 2),
                                                    substr($tel, 2, 4),
                                                    substr($tel, 6)
                                                );
                                            } else {
                                                echo $p['telefone'];
                                            }
                                        }
                                    ?>
                                </td>
                                <td class="acoes">
                                    <a href="EditarPessoaFisicaView.php?id=<?= $p['id'] ?>" title="Ver"><i class="fa-solid fa-eye"></i></a>
                                    <a href="../controller/PessoaController.php?delete=<?= $p['id'] ?>" title="Excluir" onclick="return confirm('Tem certeza?')"><i class="fa-solid fa-trash"></i></a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <script src="../assets/js/dashboard.js"></script>
    <script src="https://unpkg.com/imask"></script>
    <script src="../assets/js/mascaras.js"></script>

</body>
</html>

