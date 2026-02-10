import { WHATSAPP_LINK } from '../../config/constants';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-label="Apresentação principal">
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">Stenio Veras Advocacia</h1>
        <p className="hero__subtitle">
          Atendimento online para todo Brasil e presencial em João Pessoa - PB
        </p>
        <a
          href={WHATSAPP_LINK}
          className="hero__cta"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
        >
          FALE CONOSCO
        </a>
      </div>
    </section>
  );
}

export default Hero;
