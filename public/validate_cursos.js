document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form');
	form.addEventListener('submit', function (event) {
		const nome = document.getElementById('nome');
		const cargaHoraria = document.getElementById('cargaHoraria');
		const turno = document.getElementById('turno');
		const tipo = document.getElementById('tipo');

		const nomeValor = nome.value.trim();
		const cargaHorariaValor = cargaHoraria.value.trim();
		const turnoValor =  turno.value;
		const tipoValor = tipo.value;

		function setError(element, message){
			inputControl = element.parentElement;
			errorDisplay = inputControl.querySelector('.error');
			errorDisplay.innerText = message;
			inputControl.classList.add('error');
			inputControl.classList.remove('success');
		}
	
		function setSuccess(element, message){
			inputControl = element.parentElement;
			errorDisplay = inputControl.querySelector('.error');
			errorDisplay.innerText = message;
			inputControl.classList.add('success');
			inputControl.classList.remove('error');
		}

		if (!nomeValor.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/)) {
			event.preventDefault();
			setError(nome, 'O nome do tipo deve ter pelo menos 2 caracteres e conter apenas letras.');
		}else{
			setSuccess(nome, '');
		}

		if(cargaHorariaValor > 10000){
			event.preventDefault();
			setError(cargaHoraria, 'A carga horária máxima permitida é 10.000 horas');
		}else if (isNaN(cargaHorariaValor) || cargaHorariaValor <= 0) {
			event.preventDefault();
			setError(cargaHoraria, 'A carga horária deve ser um número positivo.');
		}else{
			setSuccess(cargaHoraria, '');
		}

		if(!turnoValor) {
			event.preventDefault();
			setError(turno, 'Selecione o turno');
			turno.style = "border: 2px solid red;";
		}else{
			setSuccess(turno, '');
			turno.style = "border: 2px solid green;";
		}

		if (!tipoValor) {
			event.preventDefault();
			setError(tipo, 'Selecione o tipo do curso');
			tipo.style = "border: 2px solid red;";
		}else{
			setSuccess(tipo, '');
			tipo.style = "border: 2px solid green;";
		}
	});
});
