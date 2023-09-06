import filterPosts from '../utils/filterByCategory.js';
import getAttributes from '../utils/getAttributes.js';
import stringCutter from '../utils/stringCutter.js';
import getCategories from '../utils/getCategories.js';

const main = document.querySelector('[main-container]');

function largeNews(
  postURL,
  imgURL,
  category,
  title,
  description,
  date,
  authorName
) {
  const formattedDescription = stringCutter(description, 200);
  const formattedTitle = stringCutter(title, 86);
  const largeNewsPost = `
      <a href="${postURL}">
      <div class="large-news">
        <div class="category-img-wrapper">
            <img src="${imgURL}" alt="#"
            class="img-medium"/>
        </div>
        <div class="hero-infos-sport">
          <p class="category">${category}</p>
          <h2>${formattedTitle}</h2>
          <div class="hero-author-infos">
            <p class="sport-author">${authorName}</p>
            <img
              src="./assets/img/bolinha-verde.svg"
              alt="ball"
            />
            <p class="sport-data">${date}</p>
          </div>
          <p class="news-description">${formattedDescription}</p>
        </div>
      </div>
    </a>
  `;
  return largeNewsPost;
}

function smallNews(postUrl, postImgUrl, imgDescripiton, category, title) {
  const formattedTitle = stringCutter(title, 86);

  const smallNewsPost = `
      <a href="${postUrl}">
        <div class="small-news-sport small-news">
          <img
            src="${postImgUrl}"
            alt="${imgDescripiton}"
            class="img-small"
          />
          <div>
            <p class="category">${category}</p>
            <h3>${formattedTitle}</h3>
          </div>
        </div>
      </a>
  `;
  return smallNewsPost;
}

async function renderCategorySection(categories) {
  try {
    if (categories) {
      categories.map((category) => {
        const categoryPostsDiv = `
          <section id="${category.attributes.categoryName}" class="section" >
            <div class="container">
              <div class="section-top-sport">
                <h1>${category.attributes.categoryName}</h1>
                <a href="./category.html?category=${category.attributes.categoryName}" class="more-btn-sport btn">Ver mais</a>
              </div>
              <div class="section-news-container">
                <div class="large-news-container" category-posts-large></div>
                <div class="small-news-container" category-posts-small></div>
              </div>
            </div>
          </section>
          <div class="line"></div>
        `;

        main.innerHTML += categoryPostsDiv;
      });
    } else {
      main.innerHTML = 'Não há categorias registradas';
    }
  } catch (error) {
    main.innerHTML = 'Erro ao carregas as categorias';
  }
}

async function renderCategoryPosts(categories) {
  try {
    categories.map(async (category) => {
      const filteredPosts = await filterPosts(category.attributes.categoryName);
      let categorySection = document.querySelector(
        `#${category.attributes.categoryName}`
      );
      const largeNewsContainer = categorySection.querySelector(
        '[category-posts-large]'
      );
      const smallNewsContainer = categorySection.querySelector(
        '[category-posts-small]'
      );

      if (filteredPosts) {
        filteredPosts
          .slice(-3)
          .reverse()
          .map((post) => {
            const attb = getAttributes(post);
            const largePost = largeNews(
              attb.postURL,
              attb.imgURL,
              attb.category,
              attb.title,
              attb.description,
              attb.date,
              attb.authorName
            );
            largeNewsContainer.innerHTML += largePost;
          });
        filteredPosts
          .slice(0, -3)
          .reverse()
          .map((post) => {
            const attb = getAttributes(post);
            const smallPost = smallNews(
              attb.postURL,
              attb.imgURL,
              attb.imgName,
              attb.category,
              attb.title
            );
            smallNewsContainer.innerHTML += smallPost;
          });
      } else {
        main.innerHTML = 'Não há posts registrados para essa categoria';
      }
    });
  } catch (error) {
    main.innerHTML = 'Erro ao carregas as notícias';
  }
}

async function renderAll() {
  const categories = await getCategories();
  renderCategorySection(categories);
  renderCategoryPosts(categories);
}

renderAll();
