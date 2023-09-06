const form = document.querySelector('.login-inputs');
const inputs = form.querySelectorAll('input');
const submitButton = form.querySelector('.btn-entrar');

const [identifier, password] = inputs;

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();

  login(identifier.value, password.value);
});

async function login(identifier, password) {
  const url = `http://localhost:1337/api/auth/local`;

  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier: identifier, password: password }),
  };

  const response = await (await fetch(url, init)).json();
  if (!response.error) {
    const { jwt, user } = response;
    const data = {
      token: {
        jwt,
        createdAt: new Date().getTime(),
      },
      user,
    };
    localStorage.setItem('data', JSON.stringify(data));
    window.location.href = `/front/index.html`;
  } else {
    alert(response.error.message);
  }
}
