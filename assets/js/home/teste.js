import getPosts from '../utils/getPost.js';
import getAttributes from '../utils/getAttributes.js';
import stringCutter from '../utils/stringCutter.js';

const heroPrincipalDiv = document.querySelector('.hero-principal-div');
const heroNewsContainer = document.querySelector('.hero-news-container');

function largePost(
  postURL,
  imgURL,
  imgName,
  category,
  title,
  authorName,
  date,
  description
) {
  const formattedDescription = stringCutter(description, 200);

  const firstPost = `
                    <a href="${postURL}">
                        <div class="hero-first-news">
                            <div class="hero-img-wrapper">
                              <img class="hero-img" src="${imgURL}" >
                            </div>
                            <div class="hero-infos">
                                <p class="category">${category}</p>
                                <h2>${title}</h2>
                                <div class="hero-author-infos">
                                    <p class="author">${authorName}</p>
                                    <img
                                      src="./assets/img/bolinha.svg"
                                      alt="ball"
                                    />
                                    <p class="data">${date}</p>
                                </div>
                                <p class="news-description">
                                    ${formattedDescription}
                                </p>
                            </div>
                        </div>
                    </a>
  `;

  return firstPost;
}

function smallPost(
  postURL,
  postImgURL,
  postImgName,
  category,
  title,
  date,
  description
) {
  const formattedDescription = stringCutter(description, 100);

  const smallPost = `
              <a href="${postURL}">
                <div class="hero-news">
                  <img
                    src="${postImgURL}"
                    alt="${postImgName}"
                    class="img-down"
                  />
                  <div class="second-hero-info">
                    <p class="category">${category}</p>
                    <h3>${title}</h3>
                    <p class="data">${date}</p>
                    <div class="news-headline">
                      <p>${formattedDescription}</p>
                    </div>
                  </div>
                </div>
              </a>
  `;

  return smallPost;
}

// getPosts().then((posts) => {

// })

async function renderPosts() {
  heroPrincipalDiv.innerHTML = 'aaaaaa';
  const posts = await getPosts();
  console.log(posts);
  console.log(heroPrincipalDiv.innerHTML);
}

renderPosts();
