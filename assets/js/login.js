const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const botao = document.getElementById('enter');

function verificarCampos() {
  if (usuario.value.trim() !== '' && senha.value.trim() !== '') {
    botao.disabled = false;
  } else {
    botao.disabled = true;
  }
}

usuario.addEventListener('input', verificarCampos);
senha.addEventListener('input', verificarCampos);