document.querySelector('form').addEventListener('submit', function (e) {
	const nome = document.getElementById('nome');
	const email = document.getElementById('email');
	const curso = document.getElementById('curso');
	const tel = document.getElementById('tel');
	const matricula = document.getElementById('status');

	const nomeValor = nome.value.trim();
	const emailValor = email.value.trim();
	const cursoValor = curso.value;
	const telValor = tel.value.trim();

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

	if (!nomeValor.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/)) {
		e.preventDefault();
		setError(nome, 'Nome deve conter apenas letras e ter pelo menos 3 caracteres');
	}else{
		setSuccess(nome, '');
	}

	if (!emailValor.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		e.preventDefault();
		setError(email, 'Email inválido');
	}else{
		setSuccess(email, '');
	}

	if (!cursoValor) {
		e.preventDefault();
		setError(curso, 'Selecione um curso');
		curso.style = "border: 2px solid red;";
	}else{
		setSuccess(curso, '');
		curso.style = "border: 2px solid green;";
	}

	if (telValor != null && (telValor.length < 11 || telValor.length > 12) || telValor < 0) {
		e.preventDefault();
		setError(tel, 'Telefone deve ter 11 dígitos: (xx)xxxxx-xxxx');
	}else{
		setSuccess(tel, '');
	}

	matricula.style = "border: 2px solid green;";
});
