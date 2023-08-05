import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
  const cardBadges = ['amex', 'visa', 'jcb', 'mastercard', 'discover', 'unionpay'];

  return (
    <div className="Footer">
      <div className="card-circuit-badges">
        {cardBadges.map((cardBadge, id) => <CardBadge key={`card-badge-${id}`} cardBadge={cardBadge} />)}
      </div>
      <div className="footer-copyright">
        <div>© 2023 NOT FOR SALE. All rights reserved.</div>
        <ul>
          <li><Link to='/policiesPage/termsAndConditions'>Termini e Condizioni</Link></li>
          <li><Link to='/policiesPage/privacyPolicy'>Privacy Policy</Link></li>
          <li><Link to='/policiesPage/returnsAndRefunds'>Resi e Rimborsi</Link></li>
        </ul>
      </div>
    </div>
  )
}

const CardBadge = ({ cardBadge }) => {
  return (
    <div className="card-circuit-badge">
      <img src={`/img/svg-credit-card-payment-icons/${cardBadge}.svg`} alt="" className="img-res" />
    </div>
  )
}

export default Footer