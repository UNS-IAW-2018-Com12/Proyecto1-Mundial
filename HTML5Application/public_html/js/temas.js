function cambiarEstilo(estilo) {
	document.getElementById('pagestyle').setAttribute('href', estilo);
	localStorage.setItem('tema', estilo);
}

window.onload = function() {
	var estilo = localStorage.getItem('tema');
	if(estilo != "") {
		document.getElementById('pagestyle').setAttribute('href', estilo);
	}
	else {
		document.getElementById('pagestyle').setAttribute('href', 'css/estilo.css');
	}
};