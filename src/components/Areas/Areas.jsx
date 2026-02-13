import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Areas.css';

const AREAS_DATA = [
  {
    id: 1,
    title: 'Direito Tributário',
    description: 'Assessoria jurídica em matéria tributária: planejamento fiscal, defesa em execuções fiscais, recuperação de créditos, habeas corpus tributário, parcelamentos e consultoria em obrigações tributárias.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
  },
  {
    id: 2,
    title: 'Direito Previdenciário',
    description: 'Atuação em aposentadorias, pensões, benefícios por incapacidade, auxílio-doença, revisões de benefícios, mandados de segurança previdenciários e questões junto ao INSS.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
  },
  {
    id: 3,
    title: 'Direito Penal',
    description: 'Defesa criminal em todas as instâncias. Acompanhamento em delegacia e audiência de custódia. Pedido de liberdade, prisão domiciliar, Habeas Corpus e atuação em inquéritos e processos criminais.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
  },
  {
    id: 4,
    title: 'Direito Empresarial',
    description: 'Assessoria em constituição e regularização de empresas, contratos societários, fusões e aquisições, recuperação judicial e extrajudicial, e demais questões que envolvam o direito empresarial.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  },
  {
    id: 5,
    title: 'Direito Trabalhista',
    description: 'Defesa dos direitos do trabalhador e do empregador em ações trabalhistas, verbas rescisórias, acidentes de trabalho, horas extras, reconhecimento de vínculo e questões previdenciárias.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
  },
];

function getCardsPerView() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function Areas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const totalCards = AREAS_DATA.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);
  const carouselWidthPercent = (totalCards / cardsPerView) * 100;
  const cardWidthPercent = 100 / totalCards;
  const translatePercent = currentIndex * cardWidthPercent;

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(getCardsPerView());
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <section id="areas" className="areas">
      <div className="areas__container">
        <div className="areas__header">
          <div className="areas__header-text">
            <span className="areas__label">ÁREAS DE ATUAÇÃO</span>
            <h2 className="areas__title">Conheça nossa atuação</h2>
          </div>
          <div className="areas__nav">
            <button
              type="button"
              className="areas__nav-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="areas__nav-btn"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Próximo"
            >
              ›
            </button>
          </div>
        </div>

        <div {...swipeHandlers} className="areas__carousel-wrapper">
          <div
            className="areas__carousel"
            style={{
              width: `${carouselWidthPercent}%`,
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {AREAS_DATA.map((area) => (
              <article
                key={area.id}
                className="areas__card"
                style={{ flex: `0 0 ${cardWidthPercent}%` }}
              >
                <div className="areas__card-image-wrapper">
                  <img
                    src={area.image}
                    alt=""
                    className="areas__card-image"
                    loading="lazy"
                  />
                </div>
                <div className="areas__card-content">
                  <h3 className="areas__card-title">{area.title}</h3>
                  <p className="areas__card-description">{area.description}</p>
                  <button type="button" className="areas__card-btn">
                    SAIBA MAIS
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Areas;
