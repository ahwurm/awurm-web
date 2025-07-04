'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  section: string
  isExternal?: boolean
}

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems: NavItem[] = [
    { href: '/', label: 'Home', section: 'home', isExternal: true },
    {
      href: '/research',
      label: 'Research',
      section: 'research',
      isExternal: true,
    },
    {
      href: '/projects',
      label: 'Projects',
      section: 'projects',
      isExternal: true,
    },
    {
      href: '/speaking',
      label: 'Speaking',
      section: 'speaking',
      isExternal: true,
    },
    { href: '/about', label: 'About', section: 'about', isExternal: true },
    {
      href: '/contact',
      label: 'Contact',
      section: 'contact',
      isExternal: true,
    },
  ]

  useEffect(() => {
    // Set active section based on current pathname
    const getActiveSectionFromPath = () => {
      if (pathname === '/') return 'home'
      if (pathname.startsWith('/research')) return 'research'
      if (pathname.startsWith('/projects')) return 'projects'
      if (pathname.startsWith('/speaking')) return 'speaking'
      if (pathname.startsWith('/about')) return 'about'
      if (pathname.startsWith('/contact')) return 'contact'
      return 'home'
    }

    setActiveSection(getActiveSectionFromPath())

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Only update active section based on scroll if we're on the home page
      if (pathname === '/') {
        const sections = document.querySelectorAll('.section')
        let current = 'home'

        // Check if we're at the very top for hero section
        if (scrollY < 100) {
          current = 'home'
        } else {
          sections.forEach((section) => {
            const sectionTop = (section as HTMLElement).offsetTop
            const sectionHeight = (section as HTMLElement).clientHeight
            if (scrollY >= sectionTop - 100) {
              current = section.getAttribute('id') || 'home'
            }
          })
        }

        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    const targetSection = document.querySelector(href)
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <nav className="nav container">
        <div className="nav__brand">
          <Link href="/" className="nav__logo">
            A. WURM
          </Link>
        </div>
        <ul className="nav__menu" id="nav-menu">
          {navItems.map((item) => (
            <li key={item.href} className="nav__item">
              {item.isExternal ? (
                <Link
                  href={item.href}
                  className={`nav__link ${activeSection === item.section ? 'active' : ''}`}
                  data-section={item.section}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={`nav__link ${activeSection === item.section ? 'active' : ''}`}
                  data-section={item.section}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
