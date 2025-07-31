// Máscara da data
const input = document.getElementById('dt_nascimento');
IMask(input, {
    mask: '00/00/0000'
});

// Máscara do telefone
const inputTelefone = document.getElementById('telefone');
IMask(inputTelefone, {
    mask: [
        { mask: '(00) 0000-0000' },   // Fixo (10 dígitos)
        { mask: '(00) 00000-0000' }   // Celular (11 dígitos)
    ],
    dispatch: function (appended, dynamicMasked) {
        const value = (dynamicMasked.value + appended).replace(/\D/g, '');
        return value.length > 10 ? dynamicMasked.compiledMasks[1] : dynamicMasked.compiledMasks[0];
    }
});

const inputCPF = document.getElementById('cpf');
IMask(inputCPF, {
    mask: '000.000.000-00'
});