document.querySelector('form').addEventListener('submit', function (e) {
	const nome = document.getElementById('nome').value.trim();
	const email = document.getElementById('email').value.trim();
	const curso = document.getElementById('curso').value;
	const tel = document.getElementById('tel').value.trim();

	if (!nome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/)) {
		e.preventDefault();
		alert('Nome deve conter apenas letras e ter pelo menos 3 caracteres');
		return;
	}

	if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		e.preventDefault();
		alert('Email inválido');
		return;
	}

	if (!curso) {
		e.preventDefault();
		alert('Selecione um curso');
		return;
	}

	if (tel && tel.length < 11) {
		e.preventDefault();
		alert('Telefone deve ter no mínimo 11 dígitos numéricos');
		return;
	}
});
