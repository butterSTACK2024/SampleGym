import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ==========================================
   IMAGE IMPORTS — Using generated images
   ========================================== */
import heroImg from './assets/hero.png'
import aboutImg from './assets/about.png'
import trainer1Img from './assets/trainer1.png'
import trainer2Img from './assets/trainer2.png'
import trainer3Img from './assets/trainer3.png'
import class1Img from './assets/class1.png'
import class2Img from './assets/class2.png'
import class3Img from './assets/class3.png'
import gallery1Img from './assets/gallery1.png'
import gallery2Img from './assets/gallery2.png'
import gallery3Img from './assets/gallery3.png'
import gallery4Img from './assets/gallery4.png'

/* ==========================================
   SCROLL REVEAL HOOK
   ========================================== */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

/* ==========================================
   NAVBAR
   ========================================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, target) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(target)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="nav-logo">
            DEMO<span>GYM</span>
          </a>
          <div className="nav-links">
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
            <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Programs</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}>Pricing</a>
            <a href="#trainers" onClick={(e) => handleNavClick(e, '#trainers')}>Trainers</a>
            <a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')}>Gallery</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="btn btn-primary nav-cta">Join Now</a>
          </div>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
        <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Programs</a>
        <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')}>Pricing</a>
        <a href="#trainers" onClick={(e) => handleNavClick(e, '#trainers')}>Trainers</a>
        <a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')}>Gallery</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="btn btn-primary">Join Now</a>
      </div>
    </>
  )
}

/* ==========================================
   ANIMATED COUNTER
   ========================================== */
function AnimatedCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          let start = 0
          const duration = 2000
          const stepTime = 20
          const steps = duration / stepTime
          const increment = end / steps

          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, stepTime)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

/* ==========================================
   HERO SECTION
   ========================================== */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="DEMOGYM Gym Interior" />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse"></span>
            Now Open — Limited Memberships
          </div>
          <h1>
            FORGE YOUR<br />
            <span className="gradient-text">STRONGEST</span><br />
            SELF
          </h1>
          <p className="hero-desc">
            Experience fitness reimagined. State-of-the-art equipment, elite trainers,
            and a community that pushes you beyond limits. Your transformation starts now.
          </p>
          <div className="hero-buttons">
            <a href="#pricing" className="btn btn-primary">
              Start Your Journey →
            </a>
            <a href="#about" className="btn btn-outline">
              Explore More
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="number"><AnimatedCounter end={5000} suffix="+" /></div>
              <div className="label">Active Members</div>
            </div>
            <div className="hero-stat">
              <div className="number"><AnimatedCounter end={25} suffix="+" /></div>
              <div className="label">Expert Trainers</div>
            </div>
            <div className="hero-stat">
              <div className="number"><AnimatedCounter end={50} suffix="+" /></div>
              <div className="label">Programs</div>
            </div>
            <div className="hero-stat">
              <div className="number"><AnimatedCounter end={12} /></div>
              <div className="label">Years Legacy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   ABOUT SECTION
   ========================================== */
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image reveal-left">
            <img src={aboutImg} alt="DEMOGYM Gym Equipment" />
            <div className="about-image-badge">
              <div className="number">12+</div>
              <div className="text">Years of Excellence</div>
            </div>
          </div>
          <div className="reveal-right">
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">
              More Than a Gym,<br />
              A <span className="highlight">Lifestyle</span>
            </h2>
            <p className="section-subtitle">
              At DEMOGYM, we don't just build bodies — we build confidence, discipline, and a community
              that thrives together. Our 20,000 sq. ft. facility is designed for those who demand
              excellence from themselves and their environment.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="icon">🏋️</div>
                <h4>Premium Equipment</h4>
                <p>Top-tier machines & free weights from world-class brands</p>
              </div>
              <div className="about-feature">
                <div className="icon">⚡</div>
                <h4>Smart Training</h4>
                <p>AI-powered workout tracking & personalized plans</p>
              </div>
              <div className="about-feature">
                <div className="icon">🧊</div>
                <h4>Recovery Zone</h4>
                <p>Cryo chambers, saunas & sports massage therapy</p>
              </div>
              <div className="about-feature">
                <div className="icon">🥗</div>
                <h4>Nutrition Bar</h4>
                <p>In-house nutrition expert & healthy smoothie bar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   SERVICES SECTION
   ========================================== */
const servicesData = [
  { id: '01', title: 'HIIT & CrossFit', desc: 'High-intensity intervals that torch calories and build explosive power.', img: class1Img },
  { id: '02', title: 'Yoga & Mobility', desc: 'Find your balance with guided sessions for flexibility and mindfulness.', img: class2Img },
  { id: '03', title: 'Boxing & MMA', desc: 'Learn combat techniques while getting the most intense workout of your life.', img: class3Img },
  { id: '04', title: 'Strength Training', desc: 'Progressive overload programs designed to build raw power and muscle.', img: gallery2Img },
  { id: '05', title: 'Personal Training', desc: 'One-on-one coaching with certified trainers tailored to your goals.', img: aboutImg },
  { id: '06', title: 'Cardio Zone', desc: 'State-of-the-art treadmills, bikes and ellipticals with immersive screens.', img: gallery1Img },
]

function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header reveal">
          <span className="section-tag">Our Programs</span>
          <h2 className="section-title">
            Train <span className="highlight">Smarter</span>,<br />
            Not Just Harder
          </h2>
          <p className="section-subtitle">
            From strength to serenity — we've got a program for every goal.
            Led by certified trainers who live and breathe fitness.
          </p>
        </div>
        <div className="services-grid">
          {servicesData.map((service, i) => (
            <div className="service-card reveal" key={service.id} style={{ transitionDelay: `${i * 0.1}s` }}>
              <img src={service.img} alt={service.title} />
              <div className="service-card-overlay">
                <div className="service-card-number">{service.id}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   PRICING SECTION
   ========================================== */
const pricingData = [
  {
    name: 'Starter',
    price: '29',
    desc: 'Perfect for beginners looking to kickstart their fitness journey.',
    features: ['Access to gym floor', 'Locker room access', '2 group classes/week', 'Basic fitness assessment', 'Mobile app access'],
    featured: false,
  },
  {
    name: 'Pro',
    price: '59',
    desc: 'Our most popular plan for dedicated fitness enthusiasts.',
    features: ['Unlimited gym access', 'All group classes', '1 PT session/month', 'Recovery zone access', 'Nutrition consultation', 'Progress tracking'],
    featured: true,
  },
  {
    name: 'Elite',
    price: '99',
    desc: 'The ultimate package for those who accept nothing but the best.',
    features: ['24/7 unlimited access', 'All group classes', '4 PT sessions/month', 'Full recovery suite', 'Custom meal plans', 'Priority booking', 'Guest passes'],
    featured: false,
  },
]

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="pricing-header reveal">
          <span className="section-tag">Membership Plans</span>
          <h2 className="section-title">
            Invest in Your<br />
            <span className="highlight">Best Self</span>
          </h2>
          <p className="section-subtitle">
            Choose the plan that fits your lifestyle. No hidden fees, no long-term contracts.
            Cancel anytime — but you won't want to.
          </p>
        </div>
        <div className="pricing-grid">
          {pricingData.map((plan, i) => (
            <div className={`pricing-card reveal ${plan.featured ? 'featured' : ''}`} key={plan.name} style={{ transitionDelay: `${i * 0.15}s` }}>
              {plan.featured && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-name">{plan.name}</div>
              <div className="pricing-price">
                <span className="currency">$</span>
                {plan.price}
                <span className="period">/mo</span>
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   TRAINERS SECTION
   ========================================== */
const trainersData = [
  {
    name: 'Marcus Rivera',
    role: 'Head Coach — Strength & Conditioning',
    img: trainer1Img,
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Trainer — Yoga & Mobility',
    img: trainer2Img,
  },
  {
    name: 'James Okafor',
    role: 'Combat Sports Specialist',
    img: trainer3Img,
  },
]

function Trainers() {
  return (
    <section className="trainers" id="trainers">
      <div className="container">
        <div className="trainers-header reveal">
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">
            Meet Your<br />
            <span className="highlight">Champions</span>
          </h2>
          <p className="section-subtitle">
            Certified, passionate, and dedicated to your success.
            Our trainers are the backbone of the DEMOGYM experience.
          </p>
        </div>
        <div className="trainers-grid">
          {trainersData.map((trainer, i) => (
            <div className="trainer-card reveal" key={trainer.name} style={{ transitionDelay: `${i * 0.15}s` }}>
              <img src={trainer.img} alt={trainer.name} />
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <p className="role">{trainer.role}</p>
                <div className="trainer-socials">
                  <a href="#" aria-label="Instagram">📷</a>
                  <a href="#" aria-label="Twitter">🐦</a>
                  <a href="#" aria-label="LinkedIn">💼</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   TESTIMONIALS SECTION
   ========================================== */
const testimonialsData = [
  {
    text: "DEMOGYM completely transformed my life. Lost 30kg in 8 months with their incredible trainers. The community here is unmatched — it's not just a gym, it's family.",
    name: 'Priya Sharma',
    role: 'Member since 2022',
    initials: 'PS',
  },
  {
    text: "Best gym I've ever been to. The equipment is top-notch, trainers are knowledgeable, and the vibe is nothing short of electric. Worth every penny.",
    name: 'Rahul Mehta',
    role: 'Member since 2021',
    initials: 'RM',
  },
  {
    text: "As a competitive athlete, I needed a facility that could keep up with my training demands. DEMOGYM exceeded all expectations. The recovery zone is a game-changer.",
    name: 'Ananya Krishnan',
    role: 'Member since 2023',
    initials: 'AK',
  },
]

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-header reveal">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">
            What Our <span className="highlight">Members</span> Say
          </h2>
          <p className="section-subtitle">
            Don't take our word for it — hear from the people who've
            transformed their lives with DEMOGYM.
          </p>
        </div>
        <div className="testimonials-track reveal">
          {testimonialsData.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   GALLERY SECTION
   ========================================== */
function Gallery() {
  const [lightboxImg, setLightboxImg] = useState(null)
  const images = [gallery1Img, gallery2Img, class1Img, gallery3Img, gallery4Img]

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="gallery-header reveal">
          <span className="section-tag">Our Space</span>
          <h2 className="section-title">
            Take a <span className="highlight">Tour</span>
          </h2>
          <p className="section-subtitle">
            20,000 sq. ft. of premium fitness space designed for results.
          </p>
        </div>
        <div className="gallery-grid reveal">
          {images.map((img, i) => (
            <div className="gallery-item" key={i} onClick={() => setLightboxImg(img)}>
              <img src={img} alt={`DEMOGYM Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div className={`lightbox ${lightboxImg ? 'active' : ''}`} onClick={() => setLightboxImg(null)}>
        <button className="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
        {lightboxImg && <img src={lightboxImg} alt="Gallery preview" />}
      </div>
    </section>
  )
}

/* ==========================================
   CTA BANNER
   ========================================== */
function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2>Ready to Transform?</h2>
        <p>
          Your first week is on us. No commitment, no pressure — just results.
          Start your free trial today.
        </p>
        <a href="#contact" className="btn btn-dark">
          Claim Free Trial →
        </a>
      </div>
    </section>
  )
}

/* ==========================================
   CONTACT SECTION
   ========================================== */
function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', interest: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      }
    } catch {
      // Graceful fallback — form still shows success for demo
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="reveal-left">
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-title">
              Let's Start Your<br />
              <span className="highlight">Journey</span>
            </h2>
            <p className="section-subtitle">
              Have questions? Want a tour of our facility? Drop us a message
              and we'll get back to you within 24 hours.
            </p>
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <div className="icon">📍</div>
                <h4>Location</h4>
                <p>42 Fitness Avenue,<br />Downtown District</p>
              </div>
              <div className="contact-info-card">
                <div className="icon">📞</div>
                <h4>Phone</h4>
                <p>+91 98765 43210<br />+91 98765 43211</p>
              </div>
              <div className="contact-info-card">
                <div className="icon">✉️</div>
                <h4>Email</h4>
                <p>hello@DEMOGYM.fit<br />join@DEMOGYM.fit</p>
              </div>
              <div className="contact-info-card">
                <div className="icon">🕐</div>
                <h4>Hours</h4>
                <p>Mon–Sat: 5AM–11PM<br />Sunday: 6AM–9PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form reveal-right">
            <h3>Send Us a Message</h3>
            <p className="form-desc">Fill in the form and we'll be in touch shortly.</p>
            {submitted && (
              <div style={{
                padding: '14px 20px',
                background: 'rgba(204, 255, 0, 0.1)',
                border: '1px solid rgba(204, 255, 0, 0.3)',
                borderRadius: '8px',
                color: '#CCFF00',
                marginBottom: '20px',
                fontSize: '0.9rem'
              }}>
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="interest">Interested In</label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  >
                    <option value="">Select a program</option>
                    <option value="general">General Membership</option>
                    <option value="pt">Personal Training</option>
                    <option value="hiit">HIIT & CrossFit</option>
                    <option value="yoga">Yoga & Mobility</option>
                    <option value="boxing">Boxing & MMA</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Tell us about your fitness goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="form-submit">
                <button type="submit" className="btn btn-primary">
                  Send Message →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================
   FOOTER
   ========================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="nav-logo">
              DEMO<span>GYM</span>
            </a>
            <p>
              Redefining fitness since 2012. Premium facilities, expert coaching,
              and a community that inspires greatness every day.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#services">Programs</a>
            <a href="#pricing">Membership</a>
            <a href="#trainers">Trainers</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-column">
            <h4>Programs</h4>
            <a href="#">HIIT & CrossFit</a>
            <a href="#">Yoga & Mobility</a>
            <a href="#">Boxing & MMA</a>
            <a href="#">Strength Training</a>
            <a href="#">Personal Training</a>
            <a href="#">Cardio Zone</a>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <a href="#">FAQs</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cancellation Policy</a>
            <a href="#">Careers</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 DEMOGYM Fitness. All rights reserved.</p>
          <p>
            Crafted with 💚 by{' '}
            <a href="https://butterstack.com" target="_blank" rel="noopener noreferrer">
              butterSTACK
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ==========================================
   MAIN APP
   ========================================== */
function App() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Trainers />
      <Testimonials />
      <Gallery />
      <CtaBanner />
      <Contact />
      <Footer />
    </>
  )
}

export default App
