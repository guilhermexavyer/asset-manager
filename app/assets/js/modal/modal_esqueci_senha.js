document.getElementById('ancora-esqueci-senha').addEventListener('click', function(event) {
    event.preventDefault();

    fetch('modal/modal_esqueci_senha.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-esqueci-senha').innerHTML = html;
        });
});

function fecharModalEsqueciSenha() {
    document.getElementById('modal-esqueci-senha').innerHTML = '';
}