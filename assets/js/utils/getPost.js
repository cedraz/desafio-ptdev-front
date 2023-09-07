export default async function getPosts() {
  const url = `https://desafio-ptdev-back.onrender.com/api/posts?pagination[pageSize]=200&sort[0]=id:desc&populate=deep`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log('An error occurred', err);
  }
}
