async function loginUser(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    const response = await fetch('http://localhost:3010/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('usuario', JSON.stringify(data));
      window.location.href = '/dashboard.html';
    } else {
      alert('Credenciais inválidas!');
    }
  }
  
  document.querySelector('form').addEventListener('submit', loginUser);
  