import { useState, useEffect, useRef } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  const headerRef = useRef(null)
  const [hauteurHeader, setHauteurHeader] = useState(0)

  useEffect(() => {
    const mettreAJourHauteur = () => {
      if (headerRef.current) {
        setHauteurHeader(headerRef.current.offsetHeight)
      }
    }
    mettreAJourHauteur()
    window.addEventListener('resize', mettreAJourHauteur)
    return () => window.removeEventListener('resize', mettreAJourHauteur)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-rafet-blanc">
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-40">
        <Header />
      </div>
      <main className="flex-1" style={{ paddingTop: `${hauteurHeader}px` }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}