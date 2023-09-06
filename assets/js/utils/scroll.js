window.addEventListener('scroll', () => {
  const header = document.querySelector('.header')
  if (window.scrollY >= 80) {
    header.classList.add('scroll-header')
  } else {
    header.classList.remove('scroll-header')
  }
})

const sections = document.querySelectorAll('.section')
const navbarList = document.querySelector('.navbar-list').children

const myObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.classList[0] == 'hero') {
        navbarList[0].classList.toggle('highlighted', entry.isIntersecting)
      } else if (entry.target.classList[0] == 'sports') {
        navbarList[1].classList.toggle('highlighted', entry.isIntersecting)
      } else if (entry.target.classList[0] == 'technology') {
        navbarList[2].classList.toggle('highlighted', entry.isIntersecting)
      } else if (entry.target.classList[0] == 'art') {
        navbarList[3].classList.toggle('highlighted', entry.isIntersecting)
      } else if (entry.target.classList[0] == 'other') {
        navbarList[4].classList.toggle('highlighted', entry.isIntersecting)
      }
    })
  },
  {
    threshold: 0.45,
  }
)

sections.forEach((el) => {
  myObserver.observe(el)
})
