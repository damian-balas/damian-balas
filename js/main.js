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
const preloader = document.querySelector('.preloader')
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

// scroll function
function scrollIt (destination, duration = 200, easing = 'linear', callback) {
  const easings = {
    linear (t) {
      return t
    },
    easeInQuad (t) {
      return t * t
    },
    easeOutQuad (t) {
      return t * (2 - t)
    }
  }

  const start = window.pageYOffset
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - 120
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll)
    if (callback) {
      callback()
    }
    return
  }

  function scroll () {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime()
    const time = Math.min(1, ((now - startTime) / duration))
    const timeFunction = easings[easing](time)
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback()
      }
      return
    }

    requestAnimationFrame(scroll)
  }

  scroll()
}
const scrollLinks = document.querySelectorAll('a[href^="#"]')

scrollLinks.forEach(scrollLink => scrollLink.addEventListener('click', (e) => {
  e.preventDefault()
  scrollIt(
    document.querySelector(scrollLink.getAttribute('href')),
    900,
    'easeOutQuad'
  )
}))

// hide preloader
setTimeout(() => {
  preloader.style.display = 'none'
}, 5500)

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
      skill.classList.remove('fade-out')
      skill.classList.add('fade-in')
    }, 85 * (index)))
  }
  if (!skillsSectionVisible || skillsSection.getBoundingClientRect().bottom <= 0) {
    skills.forEach(skill => setTimeout(() => {
      skill.classList.remove('fade-in')
      skill.classList.add('fade-out')
    }, 0))
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

callScrollFunctions()

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
