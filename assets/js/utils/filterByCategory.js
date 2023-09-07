import getPosts from './getPost.js';

export default async function filterPosts(category) {
  const posts = await getPosts();
  const filteredPosts = posts.filter(
    (post) =>
      post.attributes.categoryName.data.attributes.categoryName === category
  );
  return filteredPosts;
}
