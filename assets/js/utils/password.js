const inputPassword = document.querySelector('#password-input')
const inputLabel = document.querySelectorAll('#lock-icon')

const eyeImg = document.querySelectorAll('#eye')

inputLabel.forEach((label) => {
  label.addEventListener('click', (e) => {
    const img = e.target
    const input = e.currentTarget.parentElement.children[1]
    if (input.type == 'text') {
      input.type = 'password'
    } else {
      input.type = 'text'
    }

    if (img.getAttribute('src') == './assets/img/eye.svg') {
      img.setAttribute('src', './assets/img/eyeLock.svg')
    } else {
      img.setAttribute('src', './assets/img/eye.svg')
    }
  })
})
