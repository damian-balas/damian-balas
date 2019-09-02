// DOM SELECTORS
const hamburgerBtn = document.querySelector('.hamburger')
const siteNav = document.querySelector('.site-nav')
const navLinks = document.querySelectorAll('.site-nav__link')
const highlight = document.createElement('span')
const aboutMe = document.querySelector('.about-me')
const aboutMeText = document.querySelector('.about-me__text')
const contact = document.querySelector('.contact')
const contactText = document.querySelector('.contact__text')
const contactForm = document.querySelector('.contact__form')
const portfolio = document.querySelector('.portfolio')
const projects = document.querySelectorAll('.project')
const skillsSection = document.querySelector('.skills')
const skills = document.querySelectorAll('.skill')

// throttle
function throttle (fn, wait) {
  let time = Date.now()
  return function () {
    if ((time + wait - Date.now()) < 0) {
      fn()
      time = Date.now()
    }
  }
}

// Hamburger line color change
function changeHamburgerLineColor () {
  const HAMBURGER_BOTTOM = 64
  const aboutMeHeight = aboutMe.clientHeight
  const aboutMeDistanceToTopMinusHamburger = aboutMe.getBoundingClientRect().top - HAMBURGER_BOTTOM
  const aboutMeOffsetTop = aboutMe.offsetTop

  const contactDistanceToTopMinusHamburger = contact.getBoundingClientRect().top - HAMBURGER_BOTTOM
  const contactOffsetTop = contact.offsetTop
  const hasClass = hamburgerBtn.classList.contains('blackline')

  if (aboutMeDistanceToTopMinusHamburger <= 0 && scrollY < aboutMeOffsetTop + aboutMeHeight && !hasClass) {
    hamburgerBtn.classList.add('blackline')
  }
  if (aboutMeDistanceToTopMinusHamburger > 0 && hasClass) {
    hamburgerBtn.classList.remove('blackline')
  }
  if (contactDistanceToTopMinusHamburger <= 0 && scrollY > contactOffsetTop - HAMBURGER_BOTTOM && hasClass) {
    hamburgerBtn.classList.remove('blackline')
  }
  if (contactDistanceToTopMinusHamburger > 0 && scrollY > aboutMeOffsetTop + aboutMeHeight && !hasClass) {
    hamburgerBtn.classList.add('blackline')
  }
}

function mobilePortfolio () {
  const windowHeight = window.innerHeight
  const portfolioDistanceToTop = portfolio.getBoundingClientRect().top
  if (window.innerWidth <= 786) {
    if (portfolioDistanceToTop + windowHeight * 0.4 < windowHeight) {
      projects.forEach((project, index) => setTimeout(() => {
        project.classList.add('show-text')
      }, 300 * index))
    }
  }
  if (window.innerWidth > 786 || portfolioDistanceToTop + windowHeight * 0.4 > windowHeight) {
    projects.forEach((project, index) => setTimeout(() => {
      project.classList.remove('show-text')
    }, 300 * index))
  }
}

function animateItems () {
  const windowHeight = window.innerHeight
  const aboutMeTextDistanceToTop = aboutMeText.getBoundingClientRect().top
  const skillsSectionDistanceToTop = skillsSection.getBoundingClientRect().top
  const contactTextDistanceToTop = contactText.getBoundingClientRect().top

  // if aboutMeText is x% in viewport
  const aboutMeTextVisible = aboutMeTextDistanceToTop + windowHeight * 0.3 < windowHeight
  const skillsSectionVisible = skillsSectionDistanceToTop + windowHeight * 0.5 < windowHeight
  const contactTextVisible = contactTextDistanceToTop + windowHeight * 0.4 < windowHeight

  // if visible add class
  if (aboutMeTextVisible && !aboutMeText.classList.contains('fade-in')) {
    aboutMeText.classList.add('fade-in')
  }
  if (skillsSectionVisible && !skills[0].classList.contains('fade-in')) {
    skills.forEach((skill, index) => setTimeout(() => {
      skill.classList.add('fade-in')
    }, 200 * (index + 1)))
  }
  if (contactTextVisible && !contactText.classList.contains('slide-left')) {
    contactText.classList.add('slide-left')
    contactForm.classList.add('slide-right')
  }
}

function callScrollFunctions () {
  mobilePortfolio()
  changeHamburgerLineColor()
  animateItems()
}

window.addEventListener('scroll', throttle(callScrollFunctions, 50))

// Nav slide in
hamburgerBtn.addEventListener('click', function () {
  this.classList.toggle('is-active')
  this.classList.contains('is-active') ? siteNav.classList.add('show') : siteNav.classList.remove('show')
})

// highlight follow nav links
highlight.classList.add('highlight')
siteNav.append(highlight)

function showHighlightLink () {
  const linkCoords = this.getBoundingClientRect()
  highlight.style.opacity = '1'
  highlight.style.top = '-1rem'
  highlight.style.left = `${linkCoords.left + linkCoords.width / 2}px`
}

function hideHighlightLink () {
  highlight.style.opacity = '0'
}

navLinks.forEach(link => link.addEventListener('mouseenter', showHighlightLink))
navLinks.forEach(link => link.addEventListener('mouseleave', hideHighlightLink))
