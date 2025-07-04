'use client'

import { useEffect } from 'react'

export default function InteractiveFeatures() {
  useEffect(() => {
    // Initialize all interactive functionality
    initializeResearchFiltering()
    initializeApplicationCounters()
    initializeContactForm()
    initializeMicroInteractions()
    initializeScrollAnimations()

    console.log(
      'A. WURM Portfolio initialized successfully - Built with Next.js, React, TypeScript, and Tailwind CSS'
    )
  }, [])

  // Research Section Filtering
  function initializeResearchFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn')
    const researchCards = document.querySelectorAll('.research__card')
    const expandButtons = document.querySelectorAll('.research__expand-btn')

    // Filter functionality
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter')

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove('active'))
        button.classList.add('active')

        // Filter cards with animation
        researchCards.forEach((card) => {
          const year = card.getAttribute('data-year')
          const shouldShow = filter === 'all' || year === filter

          if (shouldShow) {
            ;(card as HTMLElement).style.display = 'block'
            setTimeout(() => {
              ;(card as HTMLElement).style.opacity = '1'
              ;(card as HTMLElement).style.transform = 'translateY(0)'
            }, 100)
          } else {
            ;(card as HTMLElement).style.opacity = '0'
            ;(card as HTMLElement).style.transform = 'translateY(30px)'
            setTimeout(() => {
              ;(card as HTMLElement).style.display = 'none'
            }, 300)
          }
        })
      })
    })

    // Expandable abstracts
    expandButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest('.research__card')
        const abstract = card?.querySelector('.research__abstract')

        if (abstract?.classList.contains('expanded')) {
          abstract.classList.remove('expanded')
          ;(button as HTMLButtonElement).textContent = 'Read Abstract'
        } else {
          abstract?.classList.add('expanded')
          ;(button as HTMLButtonElement).textContent = 'Hide Abstract'
        }
      })
    })
  }

  // Application Counters Animation
  function initializeApplicationCounters() {
    const counters = document.querySelectorAll('.counter')

    function animateCounter(element: Element, target: number, duration = 2000) {
      const start = 0
      const increment = target / (duration / 16)
      let current = start

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          ;(element as HTMLElement).textContent = target.toLocaleString()
          clearInterval(timer)
        } else {
          ;(element as HTMLElement).textContent =
            Math.floor(current).toLocaleString()
        }
      }, 16)
    }

    // Trigger counters when in view
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = parseInt(counter.getAttribute('data-count') || '0')
          animateCounter(counter, target)
          counterObserver.unobserve(counter)
        }
      })
    })

    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  // Contact Form with Validation
  function initializeContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement
    if (!form) return

    const inputs = form.querySelectorAll('input, textarea')

    // Real-time validation
    inputs.forEach((input) => {
      input.addEventListener('blur', validateField)
      input.addEventListener('input', clearErrors)
    })

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      let isValid = true
      inputs.forEach((input) => {
        if (!validateField({ target: input })) {
          isValid = false
        }
      })

      if (isValid) {
        submitForm(form)
      }
    })

    function validateField(e: any) {
      const field = e.target
      const value = field.value.trim()
      const fieldName = field.getAttribute('name')

      clearErrors(e)

      if (!value) {
        showError(
          field,
          `${fieldName?.charAt(0).toUpperCase() + fieldName?.slice(1)} is required`
        )
        return false
      }

      if (fieldName === 'email' && !isValidEmail(value)) {
        showError(field, 'Please enter a valid email address')
        return false
      }

      if (fieldName === 'message' && value.length < 10) {
        showError(field, 'Message must be at least 10 characters long')
        return false
      }

      showSuccess(field)
      return true
    }

    function clearErrors(e: any) {
      const field = e.target
      const errorMsg = field.parentNode.querySelector('.error-message')
      if (errorMsg) {
        errorMsg.remove()
      }
      field.classList.remove('error', 'success')
    }

    function showError(field: HTMLElement, message: string) {
      field.classList.add('error')
      const errorMsg = document.createElement('div')
      errorMsg.className = 'error-message'
      errorMsg.textContent = message
      errorMsg.style.color = 'var(--color-error, #ef4444)'
      errorMsg.style.fontSize = '0.85rem'
      errorMsg.style.marginTop = '0.5rem'
      field.parentNode?.appendChild(errorMsg)
    }

    function showSuccess(field: HTMLElement) {
      field.classList.add('success')
    }

    function isValidEmail(email: string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    function submitForm(form: HTMLFormElement) {
      const submitBtn = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement
      const originalText = submitBtn.textContent

      submitBtn.textContent = 'Sending...'
      submitBtn.disabled = true

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!'
        submitBtn.style.background = 'var(--color-success, #10b981)'

        setTimeout(() => {
          form.reset()
          submitBtn.textContent = originalText || 'Send Message'
          submitBtn.disabled = false
          submitBtn.style.background = ''

          // Clear all validation states
          inputs.forEach((input) => {
            input.classList.remove('error', 'success')
          })
        }, 3000)
      }, 2000)
    }
  }

  // Micro-interactions and Polish
  function initializeMicroInteractions() {
    // Magnetic cursor effect for buttons
    const buttons = document.querySelectorAll('.btn, .demo-btn')

    buttons.forEach((button) => {
      button.addEventListener('mousemove', (e) => {
        const mouseEvent = e as MouseEvent
        const rect = button.getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left - rect.width / 2
        const y = mouseEvent.clientY - rect.top - rect.height / 2

        ;(button as HTMLElement).style.transform =
          `translate(${x * 0.1}px, ${y * 0.1}px)`
      })

      button.addEventListener('mouseleave', () => {
        ;(button as HTMLElement).style.transform = 'translate(0, 0)'
      })
    })

    // Ripple effect for demo buttons
    const demoButtons = document.querySelectorAll('.demo-btn')
    demoButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        const mouseEvent = e as MouseEvent

        const rect = button.getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left
        const y = mouseEvent.clientY - rect.top

        const ripple = document.createElement('span')
        ripple.className = 'ripple'
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'
        ripple.style.position = 'absolute'
        ripple.style.width = '0'
        ripple.style.height = '0'
        ripple.style.borderRadius = '50%'
        ripple.style.background = 'rgba(255, 255, 255, 0.6)'
        ripple.style.transform = 'translate(-50%, -50%)'
        ripple.style.animation = 'ripple 0.6s ease-out'

        button.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)

        // Show tech stack notification
        showTechStackToast()
      })
    })

    // Tech stack showcase
    function showTechStackToast() {
      const toast = document.createElement('div')
      toast.className = 'tech-toast'
      toast.innerHTML = `
        <div class="toast-content">
          <h4>🚀 Built with Modern Tech Stack</h4>
          <p>Next.js 14 • React 18 • TypeScript • Tailwind CSS</p>
          <p>Sophisticated animations & interactions</p>
        </div>
      `
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: 1rem;
        box-shadow: var(--shadow-elegant);
        z-index: 10000;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      `

      document.body.appendChild(toast)

      setTimeout(() => {
        toast.style.opacity = '1'
        toast.style.transform = 'translateX(0)'
      }, 100)

      setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.transform = 'translateX(100%)'
        setTimeout(() => toast.remove(), 300)
      }, 4000)
    }
  }

  // Scroll-triggered animations
  function initializeScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')

          // Add skill showcase based on section
          if (entry.target.id === 'research') {
            showSkillBadge('Data Filtering & Search • Dynamic UI Updates')
          } else if (entry.target.id === 'applications') {
            showSkillBadge('Animated Counters • Interactive Components')
          } else if (entry.target.id === 'speaking') {
            showSkillBadge('CSS Grid • Timeline Animations')
          } else if (entry.target.id === 'contact') {
            showSkillBadge('Form Validation • Real-time Feedback')
          }
        }
      })
    }, observerOptions)

    // Observe sections for scroll animations
    document.querySelectorAll('.section').forEach((el) => {
      observer.observe(el)
    })

    function showSkillBadge(skill: string) {
      const badge = document.createElement('div')
      badge.className = 'skill-badge'
      badge.textContent = `💡 ${skill}`
      badge.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--color-accent);
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 25px;
        font-weight: 500;
        font-size: 0.9rem;
        box-shadow: var(--shadow-elegant);
        z-index: 10000;
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      `

      document.body.appendChild(badge)

      setTimeout(() => {
        badge.style.opacity = '1'
        badge.style.transform = 'translateY(0)'
      }, 200)

      setTimeout(() => {
        badge.style.opacity = '0'
        badge.style.transform = 'translateY(50px)'
        setTimeout(() => badge.remove(), 400)
      }, 3000)
    }
  }

  return null // This component only handles side effects
}

// Add CSS for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes ripple {
      to {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }
    
    .form-control.error {
      border-color: var(--color-error, #ef4444);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-control.success {
      border-color: var(--color-success, #10b981);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .tech-badge {
      transform: translateY(20px) rotate(5deg);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    .animate-in .tech-badge {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    
    .toast-content h4 {
      margin: 0 0 0.5rem 0;
      color: var(--color-primary);
      font-size: 1rem;
    }
    
    .toast-content p {
      margin: 0.25rem 0;
      font-size: 0.85rem;
      color: var(--color-text-secondary);
    }
    
    .btn--full-width {
      width: 100%;
    }
  `
  document.head.appendChild(style)
}
