export default async function getCategories() {
  const url = `http://localhost:1337/api/categories?populate=deep`

  try {
    const response = await fetch(url)
    const { data } = await response.json()
    return data
  } catch (err) {
    console.log('An error occurred', err)
  }
}
