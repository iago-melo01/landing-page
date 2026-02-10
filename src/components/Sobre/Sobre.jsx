import './Sobre.css';

function Sobre() {
  return (
    <section id="sobre" className="sobre" aria-labelledby="sobre-title">
      <div className="sobre__container">
        <div className="sobre__image-wrapper">
          <img
            src="/images/sobre-foto.png"
            alt="Profissional do escritório Stenio Veras Advocacia"
            className="sobre__image"
            loading="lazy"
            width="500"
            height="400"
          />
        </div>
        <div className="sobre__content">
          <span className="sobre__label">O ESCRITÓRIO</span>
          <h2 id="sobre-title" className="sobre__title">
            Stenio Veras Advocacia
          </h2>
          <p className="sobre__text">
            O Escritório de Advocacia Stenio Veras, com sede em João Pessoa - PB,
            possui atendimento presencial e online para todo Brasil. Compreendendo
            as necessidades e expectativas de cada um que nos procura, conseguimos
            oferecer soluções jurídicas estratégicas e individualizadas, visando
            o desfecho das demandas de modo mais célere, seja na seara judicial
            ou extrajudicial.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sobre;
