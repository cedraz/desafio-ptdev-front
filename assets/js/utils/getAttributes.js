import changeDate from '../utils/changeDateFormat.js'

export default function getAttributes(post) {
  const postURL = `http://localhost:5500/front/news.html?id=${post.id}`
  const imgURL = post.attributes.Image.data.attributes.url
  const imgName = post.attributes.Image.data.attributes.name
  const authorImg =
    post.attributes.authors.data[0].attributes.authorImage.data.attributes.url
  const category = post.attributes.categoryName.data.attributes.categoryName
  const title = post.attributes.Title
  const authorName = post.attributes.authors.data[0].attributes.Name
  const date = post.attributes.createdAt
  const description = post.attributes.Content
  const formatedDate = changeDate(date)

  return {
    postURL: postURL,
    imgURL: imgURL,
    imgName: imgName,
    category: category,
    title: title,
    authorName: authorName,
    authorImg: authorImg,
    date: formatedDate,
    description: description,
  }
}
