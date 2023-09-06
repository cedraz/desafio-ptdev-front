import verifyToken from '../utils/tokenAuth.js';
const userDiv = document.querySelector('.user');

async function getProfile(token) {
  const url = `http://localhost:1337/api/users/me`;
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await (await fetch(url, init)).json();
    return response;
  } catch (err) {
    console.log('An error occurred', err);
  }
}

async function renderProfile() {
  const [name, username, email, birthday] = userDiv.querySelectorAll('input');

  const data = localStorage.getItem('data');
  if (!data) {
    window.location.href = 'login.html';
  } else {
    verifyToken();
    const jwt = JSON.parse(localStorage.getItem('data')).token.jwt;
    const profile = await getProfile(jwt);

    [name.value, username.value, email.value, birthday.value] = [
      profile.name,
      profile.username,
      profile.email,
      profile.birthday,
    ];
  }
}

renderProfile();
