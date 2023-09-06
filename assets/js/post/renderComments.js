import getComments from '../utils/getComments.js';

const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get('id');
const postCommentsContainer = document.querySelector(
  '[post-comments-container]'
);
const moreCommentsBtn = document.querySelector('#more-comments-btn');
// Começa com apenas 4 comentários (true)
let commentsState = true;

async function filterCommentsById() {
  const comments = await getComments();
  const filteredComments = comments.filter((comment) => comment.attributes.post.data.id == postID);
  return filteredComments;
}

moreCommentsBtn.addEventListener('click', async (e) => {
  const posicaoRolagem = document.documentElement.scrollTop;
  commentsState = !commentsState;
  if (e.target.innerText == 'Mostrar menos') {
    renderComments();
    window.scrollTo(0, posicaoRolagem);
    e.target.innerText = 'Mostrar mais';
  } else if (e.target.innerText == 'Mostrar mais') {
    renderComments();
    window.scrollTo(0, posicaoRolagem);
    e.target.innerText = 'Mostrar menos';
  }
});

function commentsMap(comments) {
  if (comments.length > 0) {
    
    comments.map((comment) => {
      const commentHTML = `
            <div class="comment">
              <p class="comment-name">${comment.attributes.users_permissions_user.data.attributes.username}</p>
              <p class="comment-text">
                ${comment.attributes.content}
              </p>
              </div>
            `;
      postCommentsContainer.innerHTML += commentHTML;
    });
  } else {
    const commentHTML = `
                <div class="comment">
                  Nenhum comentário
                </div>
            `;
    postCommentsContainer.innerHTML = commentHTML;
  }
}

export default async function renderComments() {
  const comments = await filterCommentsById();
  postCommentsContainer.innerHTML = '';
  if (commentsState){
    commentsMap(comments.slice(-4));
  } else {
    commentsMap(comments);
  }
}

renderComments();