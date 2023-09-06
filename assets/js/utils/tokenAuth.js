export default function verifyToken() {
  const data = localStorage.getItem('data');
  if (data) {
    const { token } = JSON.parse(data);
    const now = new Date().getTime();
    if (now - token.createdAt >= 1000 * 60 * 60) {
      localStorage.removeItem('data');
      window.location.href = '/front/login.html';
    }
  } else {
    window.location.href = '/front/login.html';
  }
}
