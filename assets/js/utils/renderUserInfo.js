import verifyToken from './tokenAuth.js';
const userInfoContainer = document.querySelector('.login');

if (localStorage.getItem('data')) {
  verifyToken();

  const userInfo = JSON.parse(localStorage.getItem('data'));
  const userInfoHTML = `
  
    <a class="login-a" href="profile.html">
        <img src="./assets/img/login-icon.svg" alt="login-icon" class="login-icon" />
    </a>
        <div>    
            <p class="login-name">${userInfo.user.username}</p>
            <b class="login-text-bold" id="logoutButton">Logout</b>
        </div>

    `;
  userInfoContainer.innerHTML = userInfoHTML;
}

function logoutUser() {
  localStorage.removeItem('data');
  window.location.href = 'index.html';
}

const logoutButton = document.getElementById('logoutButton');

if (logoutButton) {
  logoutButton.addEventListener('click', logoutUser);
}
