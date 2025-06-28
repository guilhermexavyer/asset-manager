document.getElementById('ancora-aviso-privacidade').addEventListener('click', function(event) {
    event.preventDefault();

    fetch('modal/modal_aviso_privacidade.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('modal-aviso-privacidade').innerHTML = html;
        });
});

function fecharModalAvisoPrivacidade() {
    document.getElementById('modal-aviso-privacidade').innerHTML = '';
}