export default async function getCategories() {
  const url = `https://desafio-ptdev-back.onrender.com/api/categories?populate=deep`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log('An error occurred', err);
  }
}
