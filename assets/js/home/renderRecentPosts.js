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

async function renderPosts() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 6);

  if (recentPosts.length === 0) {
    heroPrincipalDiv.innerHTML = 'Não há nenhum post.';
    return;
  }

  if (recentPosts.slice(0, 1)) {
    const firstPostAttributes = getAttributes(recentPosts.slice(0, 1)[0]);
    const firstPost = largePost(
      firstPostAttributes.postURL,
      firstPostAttributes.imgURL,
      firstPostAttributes.imgName,
      firstPostAttributes.category,
      firstPostAttributes.title,
      firstPostAttributes.authorName,
      firstPostAttributes.date,
      firstPostAttributes.description
    );
    heroPrincipalDiv.innerHTML += firstPost;
  }

  if (recentPosts.slice(1, 2).length > 0) {
    const secondPostAttributes = getAttributes(recentPosts.slice(1, 2)[0]);
    const secondPost = smallPost(
      secondPostAttributes.postURL,
      secondPostAttributes.imgURL,
      secondPostAttributes.imgName,
      secondPostAttributes.category,
      secondPostAttributes.title,
      secondPostAttributes.date,
      secondPostAttributes.description
    );
    heroPrincipalDiv.innerHTML += secondPost;
  }

  if (recentPosts.slice(2, 6).length > 0) {
    recentPosts.slice(2, 6).map((post) => {
      const thirdPostAttributes = getAttributes(post);
      const thirdPost = smallPost(
        thirdPostAttributes.postURL,
        thirdPostAttributes.imgURL,
        thirdPostAttributes.imgName,
        thirdPostAttributes.category,
        thirdPostAttributes.title,
        thirdPostAttributes.date,
        thirdPostAttributes.description
      );
      heroNewsContainer.innerHTML += thirdPost;
    });
  }
}

renderPosts();
