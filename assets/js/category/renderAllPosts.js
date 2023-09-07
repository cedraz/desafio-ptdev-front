import filterPosts from '../utils/filterByCategory.js';
import getAttributes from '../utils/getAttributes.js';
import stringCutter from '../utils/stringCutter.js';

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

const categoryAllPosts = document.querySelector('[category-all-posts]');
const categoryName = document.querySelectorAll('.category-name');
categoryName.forEach((name) => {
  name.innerHTML = category;
});

async function renderAllPosts() {
  const filteredPosts = await filterPosts(category);
  if (filteredPosts.length !== 0) {
    filteredPosts.map((post) => {
      const attb = getAttributes(post);
      const description = stringCutter(attb.description, 90);
      const postHTML = `
                  <a href="${attb.postURL}">
                      <div class="news-card">
                          <img
                              src="${attb.imgURL}"
                              alt="${attb.imgName}"
                              class="img-down"
                          />
                          <div class="news-card-text-container">
                              <p class="category green">${attb.category}</p>
                              <h3>${attb.title}</h3>
                              <p class="data green">${attb.date}</p>
                              <p class="news-headline">${description}</p>
                          </div>
                      </div>
                  </a>
              `;

      categoryAllPosts.innerHTML += postHTML;
    });
  } else {
    categoryAllPosts.innerHTML = 'Não há nenhum post para essa categoria.';
  }
}

renderAllPosts();
