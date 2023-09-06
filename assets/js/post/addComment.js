import verifyToken from '../utils/tokenAuth.js';
import renderComments from './renderComments.js';

const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get('id');

const commentBtn = document.querySelector('#add-comment-btn');
const commentInput = document.querySelector('.comment-input');
const caracteres = document.querySelector('.contador-caracteres');

commentInput.addEventListener('input', (e) => {
  caracteres.innerHTML = `${e.target.value.length}/500`;
  if (e.target.value.length >= 200 && e.target.value.length < 300) {
    caracteres.style.color = '#a5a500';
  } else if (e.target.value.length >= 300 && e.target.value.length < 400) {
    console.log('a');
    caracteres.style.color = '#960000';
  } else if (e.target.value.length >= 450) {
    caracteres.style.color = '#ff2b2b';
    caracteres.style.fontWeight = '600';
  }
});

commentBtn.addEventListener('click', async (e) => {
  verifyToken();

  const value = commentInput.value;

  const { token, user } = JSON.parse(localStorage.getItem('data'));

  const url = `https://desafio-ptdev-back.onrender.com/api/comments`;

  if (value.length > 500) {
    alert('Seu comentário deve ter no máximo 500 caracteres');
    return;
  }
  if (value.length == 0) {
    alert('Seu comentário não pode estar vazio');
    return;
  }

  const body = {
    data: {
      // VERIFICAR TAMANHO DO CONTEUDO SE NÃO VAI DAR ERRO
      content: value,
      users_permissions_user: user.id,
      post: postID,
    },
  };

  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.jwt}`,
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(url, init);
    commentInput.value = '';
    renderComments();
  } catch (err) {
    console.log('An error occurred', err);
  }
});
