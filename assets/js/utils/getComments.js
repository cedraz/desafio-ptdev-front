export default async function getComments() {
  const url = `http://localhost:1337/api/comments?populate=deep`

  try {
    const response = await fetch(url)
    const { data } = await response.json()
    return data
  } catch (err) {
    console.log('An error occurred', err)
  }
}
