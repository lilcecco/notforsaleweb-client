import { FiCheckCircle } from 'react-icons/fi';

import './OrderConfirmation.css';

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation">
      <div className="order-confirmation-icon">
        <FiCheckCircle className="img-res icon" />
      </div>
      <h4 className="mt-1">Successo!</h4>
      <div className="order-confirmation-div-line mt-1"></div>
      <p className="mt-1">Il tuo ordine è andato a buon fine!<br /> Riceverai un’email di conferma<br /> al più presto</p>
      <p className="mt-3"><b>Grazie per aver acquistato da noi</b></p>
    </div>
  )
}

export default OrderConfirmation