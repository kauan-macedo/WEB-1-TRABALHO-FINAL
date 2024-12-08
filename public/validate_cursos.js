document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form');
	form.addEventListener('submit', function (event) {
		const nome = document.getElementById('nome').value.trim();
		const cargaHoraria = document.getElementById('cargaHoraria').value.trim();
		const turno = document.getElementById('turno').value;
		const tipo = document.getElementById('tipo').value;

		if (!nome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/)) {
			event.preventDefault();
			alert('O nome do curso deve ter pelo menos 2 caracteres e conter apenas letras.');
			return;
		}

		if (isNaN(cargaHoraria) || cargaHoraria <= 0) {
			event.preventDefault();
			alert('A carga horária deve ser um número positivo.');
			return;
		}

		if (!nome || !cargaHoraria || !turno || !tipo) {
			event.preventDefault();
			alert('Por favor, preencha todos os campos.');
		}
	});
});
