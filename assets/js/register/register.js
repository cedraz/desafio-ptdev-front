const submitBtn = document.querySelector('.btn-entrar');
const form = document.querySelector('.singUp-inputs');
const inputs = form.querySelectorAll('input');

export async function register() {
  const url = `https://desafio-ptdev-back.onrender.com/api/auth/local/register`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log('An error occurred', err);
  }
}

submitBtn.addEventListener('click', async (e) => {
  try {
    e.preventDefault();

    const [name, username, email, birthDate, password, repeatPassword] = inputs;

    for (const input of inputs) {
      if (input.value === '') {
        alert('Preencha todos os campos');
        return;
      }
    }

    if (name.value.length < 8 || name.value.length > 50) {
      alert(
        'O nome completo deve conter no mínimo 8 caracteres e no máximo 50 caracteres.'
      );
      return;
    }

    if (username.value.length < 4 || username.value.length > 15) {
      alert(
        'O nome de usuário deve conter no mínimo 6 caracteres e no máximo 15 caracteres.'
      );
      return;
    }

    if (!/^[a-zA-Z0-9]*$/.test(username.value)) {
      alert(
        'O nome de usuário não pode ter caracteres especiais nem espaços em branco.'
      );
      return;
    }

    if (email.value.indexOf('@') === -1) {
      alert('Digite um email válido.');
      return;
    }

    if (
      Number(birthDate.value.slice(0, 4)) < 1900 ||
      Number(birthDate.value.slice(0, 4)) > 2005
    ) {
      alert('Digite um ano de nascimento válido.');
      return;
    }

    if (password.value.length < 6 || password.value.length > 30) {
      alert(
        'A senha deve conter no mínimo 6 caracteres e no máximo 20 caracteres.'
      );
      return;
    }

    if (!/^[a-zA-Z0-9]*$/.test(password.value)) {
      alert(
        'A senha não pode conter caracteres especiais nem espaços em branco'
      );
      return;
    }

    if (password.value !== repeatPassword.value) {
      alert('A senha e a confirmação de senha devem ser iguais');
      return;
    }

    const body = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      birthday: birthDate.value,
    };

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await (
      await fetch(
        'https://desafio-ptdev-back.onrender.com/api/auth/local/register',
        init
      )
    ).json();
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
  } catch (error) {
    console.log(error);
  }
});
