const editBtn = document.querySelector('.btn-editar');
const userDiv = document.querySelector('.user');

async function updateProfile({ name, username, email, birthday, token }) {
  const userID = JSON.parse(localStorage.getItem('data')).user.id;
  const url = `https://desafio-ptdev-back.onrender.com/api/users/${userID}`;
  const body = {
    name,
    username,
    email,
    birthday,
  };

  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  const response = await (await fetch(url, init)).json();
  if (response.error) {
    alert(response.error.message);
  }
}

editBtn.addEventListener('click', () => {
  const [name, username, email, birthday] = userDiv.querySelectorAll('input');
  if (editBtn.innerHTML == 'Editar Informações') {
    userDiv.querySelectorAll('input').forEach((input) => {
      input.disabled = false;
    });
    editBtn.innerHTML = 'Salvar';
  } else if (editBtn.innerHTML == 'Salvar') {
    if (name.value.length < 8 || name.value.length > 50) {
      alert(
        'O nome completo deve conter no mínimo 8 caracteres e no máximo 50 caracteres.'
      );
      editBtn.innerHTML = 'Editar Informações';
      return;
    }

    if (username.value.length < 4 || username.value.length > 15) {
      alert(
        'O nome de usuário deve conter no mínimo 6 caracteres e no máximo 15 caracteres.'
      );
      editBtn.innerHTML = 'Editar Informações';
      return;
    }

    if (!/^[a-zA-Z0-9]*$/.test(username.value)) {
      alert(
        'O nome de usuário não pode ter caracteres especiais nem espaços em branco.'
      );
      editBtn.innerHTML = 'Editar Informações';
      return;
    }

    if (email.value.indexOf('@') === -1) {
      alert('Digite um email válido.');
      editBtn.innerHTML = 'Editar Informações';
      return;
    }

    if (
      Number(birthday.value.slice(0, 4)) < 1900 ||
      Number(birthday.value.slice(0, 4)) > 2005
    ) {
      alert('Digite um ano de nascimento válido.');
      editBtn.innerHTML = 'Editar Informações';
      return;
    }

    try {
      updateProfile({
        name: name.value,
        username: username.value,
        email: email.value,
        birthday: birthday.value,
        token: JSON.parse(localStorage.getItem('data')).token.jwt,
      });
    } catch (error) {
      alert(error);
    }

    userDiv.querySelectorAll('input').forEach((input) => {
      input.disabled = true;
    });
    editBtn.innerHTML = 'Editar Informações';
  }
});
