import { FiLayers, FiBook, FiCrosshair } from 'react-icons/fi';

import './About.css';

const About = () => {
  return (
    <div className='About'>
      <div className="about-hero">
        <div className="about-hero-bg">
          <img src="/img/about-hero-bg.jpg" alt="" className="img-res" />
        </div>
        <h1>About us</h1>
      </div>
      <section className="about-intro">
        <h3>🇮🇹 TOP LEADER 🇮🇹</h3>
        <p className='mt-1'>Siamo un’azienda italiana che offre i migliori prodotti tech e digitali sul mercato. Grazie alla nostra affiliazione con fornitori di terze parti siamo in grado di offrire prezzi competitivi, senza compromettere la qualità dei prodotti da noi distribuiti.</p>
      </section>
      <div className="about-div-line"></div>
      <section>
        <div className="about-section">
          <div className="about-section-icon">
            <FiLayers className="img-res icon" />
          </div>
          <div className="about-section-textarea">
            <h5>Per ogni esigenza</h5>
            <p className="mt-1">Lo spettro dei prodotti da noi offerto è tanto ampio da poter soddisfare le esigenze di ogni cliente</p>
          </div>
        </div>
        <div className="about-section" style={{ backgroundColor: 'var(--color-1)', color: 'var(--color-2)' }}>
          <div className="about-section-textarea">
            <h5>Entrare nel mondo del business</h5>
            <p className="mt-1">Attraverso le guide che puoi trovare in vendita puoi iniziare a guadagnare, inserendoti nel mondo del business online. Le guide contengono informazioni acquisite da noi in moltissimi anni di esperienza</p>
          </div>
          <div className="about-section-icon">
            <FiBook className="img-res icon" style={{ color: 'var(--color-2)' }} />
          </div>
        </div>
        <div className="about-section">
          <div className="about-section-icon">
            <FiCrosshair className="img-res icon" />
          </div>
          <div className="about-section-textarea">
            <h5>Un solo obiettivo</h5>
            <p className="mt-1">Il nostro obiettivo è formare il maggior numero di ragazzi possibile nel mondo del business online e nell’utilizzo di skills specifiche</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About