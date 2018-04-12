function cambiarEstilo(estilo) {
    document.getElementById('pagestyle').setAttribute('href', estilo);
    localStorage.setItem('tema', estilo);
};

function verificarEstilo() {
    var estilo = localStorage.getItem('tema');
    if (estilo === null)
        $('#pagestyle').attr("href", "css/estilo.css");
    else
        $('#pagestyle').attr("href", estilo);
};