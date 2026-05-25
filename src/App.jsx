import { useEffect, useState } from 'react'
import './App.css'

/* ─── Data ─── */
const SHOWS = [
  { date: 'JUL 04', venue: 'Bogotá Music Hall',      city: 'Bogotá, COL'         },
  { date: 'JUL 19', venue: 'Teatro Metropolitano',   city: 'Medellín, COL'        },
  { date: 'AGO 02', venue: 'El Zócalo Underground',  city: 'Ciudad de México, MX' },
  { date: 'AGO 16', venue: 'La Trastienda Club',     city: 'Buenos Aires, ARG'    },
  { date: 'AGO 30', venue: 'Teatro Caupolicán',      city: 'Santiago, CHL'        },
  { date: 'SEP 13', venue: 'Anfiteatro del Parque',  city: 'Lima, PER'            },
]

const TRACKS = [
  { n: '01', title: 'DEAD SIGNAL',        dur: '3:47' },
  { n: '02', title: 'SISTEMA CAÍDO',      dur: '4:12' },
  { n: '03', title: 'NOISE PARADE',       dur: '2:58' },
  { n: '04', title: 'BROKEN PROTOCOL',    dur: '5:03' },
  { n: '05', title: 'SIGNAL LOST',        dur: '3:31' },
  { n: '06', title: 'INTERFERENCIA',      dur: '4:44' },
  { n: '07', title: 'LAST TRANSMISSION',  dur: '3:19' },
  { n: '08', title: 'RIOT CODE',          dur: '6:02' },
]

const MERCH = [
  { tag: 'NUEVO',  name: 'RIOT TEE',       desc: 'Camiseta 100% algodón · Edición limitada · Serigrafía frontal', price: '$35' },
  { tag: 'ÁLBUM',  name: 'SIGNAL LOST LP', desc: 'Vinyl 180g · Portada satinada · Incluye letra impresa',         price: '$28' },
  { tag: 'ARTE',   name: 'STATIC POSTER',  desc: 'Serigrafía A2 · Numerada y firmada · Edición de 100 copias',   price: '$22' },
]

const TICKER_TEXT = '· STATIC RIOT · SIGNAL LOST 2026 · BLACKOUT RECORDS · DEAD SIGNAL TOUR · NOISE IS OUR RELIGION · NO RULES '

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* Sticky nav */
  useEffect(() => {
    const nav = document.getElementById('nav')
    const onScroll = () => nav?.classList.toggle('stuck', window.scrollY > 55)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site">

      {/* ── NAV ── */}
      <nav id="nav" className="nav">
        <a href="#" className="nav-brand">SR</a>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><a href="#release">MÚSICA</a></li>
          <li><a href="#shows">SHOWS</a></li>
          <li><a href="#merch">MERCH</a></li>
        </ul>
        <a href="#contact" className="nav-cta nav-cta-desktop">CONTACTO</a>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-links">
          {['MÚSICA:#release','SHOWS:#shows','MERCH:#merch','CONTACTO:#contact'].map(item => {
            const [label, href] = item.split(':')
            return (
              <li key={label}>
                <a href={href} onClick={() => setMenuOpen(false)}>{label}</a>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── VIDEO HERO ── */}
      <section id="home" className="vh-section">
        <div className="vh-sticky">

          {/* Video en loop autoplay */}
          <video
            className="vh-video"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Overlays */}
          <div className="vh-scanlines" aria-hidden="true" />
          <div className="vh-overlay"   aria-hidden="true" />
          <div className="vh-vignette"  aria-hidden="true" />

          {/* Hero content */}
          <div className="vh-content">
            <span className="hero-eyebrow">BLACKOUT RECORDS &nbsp;·&nbsp; BOGOTÁ &nbsp;·&nbsp; EST. 2021</span>
            <h1 className="hero-title glitch" data-text="STATIC RIOT">
              STATIC<br />RIOT
            </h1>
            <p className="hero-tagline">— NOISE IS OUR RELIGION —</p>
            <div className="hero-actions">
              <a href="#release" className="btn btn-red">ESCUCHAR AHORA</a>
              <a href="#shows"   className="btn btn-outline">VER FECHAS →</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="vh-scroll" aria-hidden="true">
            <div className="hero-scroll-bar" />
            <span className="hero-scroll-label">SCROLL</span>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {Array(5).fill(TICKER_TEXT).join('')}
        </div>
      </div>

      {/* ── RELEASE ── */}
      <section className="release" id="release">
        <div className="container">
          <span className="s-label reveal">ÚLTIMO LANZAMIENTO</span>

          <div className="release-grid">
            {/* Album artwork (inline SVG) */}
            <div className="art-wrap reveal">
              <img
                className="album-cover"
                src="/album-cover.jpg"
                alt="Portada Signal Lost — Static Riot"
              />

              <span className="art-new-tag" aria-label="Out now">OUT NOW</span>
            </div>

            {/* Info */}
            <div className="release-info">
              <h2 className="release-title reveal">SIGNAL<br />LOST</h2>
              <p className="release-meta reveal">STATIC RIOT &nbsp;·&nbsp; 2026 &nbsp;·&nbsp; BLACKOUT RECORDS</p>

              <ul className="tracklist">
                {TRACKS.map((t, i) => (
                  <li key={t.n} className="track reveal" style={{ '--d': `${i * 0.06}s` }}>
                    <span>{t.n}. &nbsp;{t.title}</span>
                    <span className="track-dur">{t.dur}</span>
                  </li>
                ))}
              </ul>

              <div className="release-cta">
                <a href="#" className="btn btn-red reveal" style={{ '--d': '0.52s' }}>
                  ESCUCHAR EN SPOTIFY →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="manifesto">
        <div className="container">
          <span className="s-label reveal">MANIFESTO · 2026</span>
          <p className="m-line reveal" style={{ '--d': '0.08s' }}>
            NO CUENTA COMO INFIERNO SI TE GUSTA COMO <span className="text-red">QUEMA.</span>
          </p>
        </div>
      </section>

      {/* ── SHOWS ── */}
      <section className="shows" id="shows">
        <div className="container">
          <span className="s-label reveal">DEAD SIGNAL TOUR 2026</span>
          <h2 className="s-title reveal">PRÓXIMAS<br />FECHAS</h2>

          <div className="show-table">
            {SHOWS.map((s, i) => (
              <div key={i} className="show-row reveal" style={{ '--d': `${i * 0.07}s` }}>
                <span className="show-date">{s.date}</span>
                <span className="show-venue">{s.venue}</span>
                <span className="show-city">{s.city}</span>
                <button className="show-ticket" onClick={() => {}}>TICKETS →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MERCH ── */}
      <section className="merch" id="merch">
        <div className="container">
          <span className="s-label reveal">TIENDA OFICIAL</span>
          <h2 className="s-title reveal">MERCH</h2>

          <div className="merch-grid">
            {MERCH.map((item, i) => (
              <div key={i} className="merch-card reveal" style={{ '--d': `${i * 0.1}s` }}>
                <div className="merch-img">
                  <span className="merch-tag">{item.tag}</span>

                  <img
                    className="merch-svg"
                    src={['/merch-tee.jpg', '/merch-vinyl.jpg', '/merch-poster.jpg'][i]}
                    alt={item.name}
                  />
                </div>

                <div className="merch-body">
                  <h3 className="merch-name">{item.name}</h3>
                  <p className="merch-desc">{item.desc}</p>
                  <div className="merch-foot">
                    <span className="merch-price">{item.price}</span>
                    <button className="btn-buy">COMPRAR</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-wrap">
            <span className="s-label reveal">CONTACTO & NEWSLETTER</span>
            <h2 className="contact-title reveal">
              STAY IN<br />THE <span className="text-red">NOISE.</span>
            </h2>
            <p className="contact-desc reveal">
              Suscríbete para recibir noticias, fechas exclusivas y contenido antes que nadie.
              Sin spam. Solo ruido.
            </p>

            <form
              className="contact-form reveal"
              style={{ '--d': '0.12s' }}
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="email"
                className="contact-input"
                placeholder="TU@EMAIL.COM"
                aria-label="Correo electrónico"
              />
              <button type="submit" className="btn btn-red">SUSCRIBIR</button>
            </form>

            <div className="contact-links reveal" style={{ '--d': '0.2s' }}>
              <a href="mailto:info@staticriot.io">info@staticriot.io</a>
              <span>·</span>
              <a href="#">@staticriot</a>
              <span>·</span>
              <span>Bogotá, Colombia</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-brand">STATIC RIOT</span>
          <span className="footer-copy">© 2026 BLACKOUT RECORDS. ALL RIGHTS RESERVED.</span>
          <a
            href="https://portfolio-david-geo.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-dev"
          >
            DEV: DAVID GEO
          </a>
        </div>
      </footer>

    </div>
  )
}
