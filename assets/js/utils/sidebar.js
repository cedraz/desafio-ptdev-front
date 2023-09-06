const sidebarButton = document.querySelector('.navbar-responsive-icon')
const sidebar = document.querySelector('.navbar-login-container')
const sidebarCloseButton = document.querySelector('.sidebar-close-icon')

sidebarButton.addEventListener('click', (e) => {
  sidebar.classList.toggle('close')
})

sidebarCloseButton.addEventListener('click', (e) => {
  sidebar.classList.toggle('close')
})
