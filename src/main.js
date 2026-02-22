import './style.css'

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar')

const handleNavbarScroll = () => {
  const currentScroll = window.scrollY

  if (currentScroll > 100) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
    navbar.style.backdropFilter = 'blur(12px)'
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
  } else {
    navbar.style.backgroundColor = 'transparent'
    navbar.style.backdropFilter = 'none'
    navbar.style.boxShadow = 'none'
  }
}

window.addEventListener('scroll', handleNavbarScroll)

// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
    })
  })
}

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const href = this.getAttribute('href')
    if (href === '#') return

    const target = document.querySelector(href)
    if (target) {
      const offset = 80 // navbar height
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  })
})

// ===== Scroll reveal animations =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
    }
  })
}, observerOptions)

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el)
})

// ===== Parallax effect for blobs =====
const blobs = document.querySelectorAll('.blob')

const handleParallax = () => {
  const scrollY = window.scrollY
  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 0.05
    const currentTransform = blob.style.transform || ''
    // Preserve existing transform and add translateY
    blob.style.transform = `translateY(${scrollY * speed}px)`
  })
}

window.addEventListener('scroll', handleParallax, { passive: true })

// ===== Typewriter effect for hero =====
const typewriterElement = document.querySelector('.highlight-animated')

if (typewriterElement) {
  setTimeout(() => {
    typewriterElement.style.backgroundPosition = '0 100%'
  }, 1500)
}

// ===== Draw line animation trigger =====
const drawLines = document.querySelectorAll('.draw-line')

const drawLineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.strokeDashoffset = '0'
    }
  })
}, { threshold: 0.5 })

drawLines.forEach(line => {
  drawLineObserver.observe(line)
})

// ===== Cursor follower effect =====
const createCursorFollower = () => {
  const follower = document.createElement('div')
  follower.className = 'cursor-follower'
  document.body.appendChild(follower)

  let mouseX = 0, mouseY = 0
  let followerX = 0, followerY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.1
    followerY += (mouseY - followerY) * 0.1
    follower.style.left = `${followerX}px`
    follower.style.top = `${followerY}px`
    requestAnimationFrame(animateFollower)
  }

  animateFollower()

  // Scale up on hover of interactive elements
  document.querySelectorAll('a, button, .hover-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)'
      follower.style.background = 'rgba(232, 196, 184, 0.4)'
    })
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)'
      follower.style.background = 'rgba(245, 213, 200, 0.3)'
    })
  })
}

// Only on non-touch devices
if (window.matchMedia('(hover: hover)').matches) {
  createCursorFollower()
}

// ===== Initialize on DOM ready =====
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('loaded')
  }, 100)

  handleNavbarScroll()
})

// ===== Page load animation =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1'
})

// ===== Carousel =====
const initCarousel = () => {
  const track = document.getElementById('carousel-track')
  const dots = document.querySelectorAll('.carousel-dot')
  const prevBtn = document.getElementById('carousel-prev')
  const nextBtn = document.getElementById('carousel-next')
  if (!track || !prevBtn || !nextBtn) return

  const slides = track.querySelectorAll('.carousel-slide')
  const total = slides.length
  let current = 0
  let autoTimer = null

  const goTo = (index) => {
    current = (index + total) % total
    track.style.transform = `translateX(-${current * 100}%)`
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current)
    })
  }

  const startAuto = () => {
    autoTimer = setInterval(() => goTo(current + 1), 4500)
  }

  const stopAuto = () => {
    clearInterval(autoTimer)
  }

  prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto() })
  nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto() })

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAuto()
      goTo(parseInt(dot.dataset.index))
      startAuto()
    })
  })

  // Touch / swipe support
  let startX = 0
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX }, { passive: true })
  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto() }
  }, { passive: true })

  goTo(0)
  startAuto()
}

initCarousel()

console.log('SSEAT Landing Page loaded successfully')
