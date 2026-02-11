import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Areas.css';

const AREAS_DATA = [
  {
    id: 1,
    title: 'Imóveis',
    description: 'Orientação e apoio jurídico em negociação e elaboração de contratos e demais instrumentos que envolvam imóveis, seja na compra e venda, locação, usucapião e regularização fundiária.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
  },
  {
    id: 2,
    title: 'Inventários e Sucessões',
    description: 'Assessoria jurídica em procedimentos litigiosos ou consensuais, tanto na seara judicial quanto extrajudicial, envolvendo transferência de bens e direitos em inventários e partilhas.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  },
  {
    id: 3,
    title: 'Criminal',
    description: 'Atendimento especializado para entender o seu problema e auxiliar. Acompanhamento em delegacia e audiência de custódia. Pedido de liberdade, prisão domiciliar e Habeas Corpus.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
  },
  {
    id: 4,
    title: 'Família',
    description: 'Atuação em divórcio, separação, guarda de menores, pensão alimentícia, partilha de bens e demais questões que envolvam o direito de família.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
  },
  {
    id: 5,
    title: 'Trabalhista',
    description: 'Defesa dos direitos do trabalhador e do empregador em ações trabalhistas, verbas rescisórias, acidentes de trabalho e questões previdenciárias.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
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
