document.addEventListener('DOMContentLoaded', () => {
  // Recupera os dados do usuário do localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Verifica se o usuário está logado
  if (!usuario) {
    alert('Você precisa fazer login!');
    window.location.href = '/login.html';  // Redireciona para login caso não haja usuário no localStorage
    return;
  }

  // Preenche os campos com os dados do usuário
  document.getElementById('user-id').textContent = usuario.idusuario;
  document.getElementById('user-name').textContent = usuario.nome;
  document.getElementById('user-email').textContent = usuario.email;
});

function logout() {
  // Remove o usuário do localStorage
  localStorage.removeItem('usuario');
  
  // Redireciona o usuário para a página de login
  window.location.href = '/login.html';
}

// Função de logout
function logout() {
  
  localStorage.removeItem('usuario');  // Remove o usuário do localStorage
  window.location.href = '/login.html';  // Redireciona para a página de login
}
