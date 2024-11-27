
async function cadastrar(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3010/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = '/login.html'; // Substitua pelo caminho da sua página de login
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    alert('Erro ao cadastrar usuário.');
  }
}
