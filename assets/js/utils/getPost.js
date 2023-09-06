const host = 'http://localhost:1337'

export async function getPosts() {
  const url = `${host}/api/posts?populate=deep`

  try {
    const response = await fetch(url)
    const { data } = await response.json()
    return data
  } catch (err) {
    console.log('An error occurred', err)
  }
}
