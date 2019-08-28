// DOM SELECTORS
const hamburgerBtn = document.querySelector('.hamburger')
const siteNav = document.querySelector('.site-nav')

const navLinks = document.querySelectorAll('.site-nav__link')
const highlight = document.createElement('span')

//Nav slide in
hamburgerBtn.addEventListener('click', function () {
    this.classList.toggle('is-active')
    this.classList.contains('is-active') ? siteNav.classList.add('show') : siteNav.classList.remove('show')
  })

//highlight follow nav links
highlight.classList.add('highlight')
siteNav.append(highlight)

function showHighlightLink() {
    const linkCoords = this.getBoundingClientRect()
    highlight.style.opacity = '1'
    highlight.style.top = `${linkCoords.top - linkCoords.height / 4.5}px`
    highlight.style.left = `${linkCoords.left + linkCoords.width / 2}px`

}

function hideHighlightLink() {
    highlight.style.opacity = '0'
}

navLinks.forEach(link => link.addEventListener('mouseenter', showHighlightLink))
navLinks.forEach(link => link.addEventListener('mouseleave', hideHighlightLink))


