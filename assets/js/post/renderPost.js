import getAttributes from '../utils/getAttributes.js';

const postContainer = document.querySelector('[post-container]');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const host = 'https://desafio-ptdev-back.onrender.com/api/posts/';

async function getPost() {
  const url = `${host}${id}?populate=deep`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log('An error occurred', err);
  }
}

async function renderPost() {
  const post = await getPost();
  const { imgURL, authorImg, category, title, authorName, date, description } =
    getAttributes(post);
  const postHTML = `
    <p class="news-category">${category}</p>
    <p class="news-title">${title}</p>
    <p class="news-data">${date}</p>
    <p class="news-author">Autor(es):</p>

    <div class="news-container">
      <div class="news-column">
        <div class="news-authors">
          <img
            src="${authorImg}"
            alt="autor"
            class="news-authors-img"
          />
          <p>${authorName}</p>
        </div>
        </div>
      </div>

      <div class="news-notice">
        <img
          src="${imgURL}"
          alt="imagemNotícia"
          class="news-notice-img"
        />

        <p class="news-notice-text">
          ${description}
        </p>
      </div>
    </div>
    `;
  postContainer.innerHTML = postHTML;
}

renderPost();
