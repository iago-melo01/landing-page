import { useState, useEffect, useRef, useCallback } from 'react';
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
  if (window.innerWidth <= 600) return 1.2;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function Areas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(() =>
    typeof window !== 'undefined' ? getCardsPerView() : 3
  );
  const totalCards = AREAS_DATA.length;
  const maxIndex = Math.max(
    0,
    cardsPerView < 2 ? totalCards - 1 : Math.floor(totalCards - cardsPerView)
  );
  const carouselWidthPercent = (totalCards / cardsPerView) * 100;
  const cardWidthPercent = 100 / totalCards;
  const isLastCardWithPeek =
    cardsPerView < 2 && currentIndex === maxIndex && totalCards > 1;
  const translatePercent = isLastCardWithPeek
    ? currentIndex * cardWidthPercent - 0.2 * cardWidthPercent
    : currentIndex * cardWidthPercent;

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(getCardsPerView());
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const currentIndexRef = useRef(currentIndex);
  const maxIndexRef = useRef(maxIndex);
  const directionRef = useRef('forward');
  currentIndexRef.current = currentIndex;
  maxIndexRef.current = maxIndex;

  const inactivityTimerRef = useRef(null);
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      const idx = currentIndexRef.current;
      const max = maxIndexRef.current;
      if (idx >= max) {
        directionRef.current = 'backward';
        handlePrev();
      } else if (idx <= 0) {
        directionRef.current = 'forward';
        handleNext();
      } else {
        if (directionRef.current === 'forward') {
          handleNext();
        } else {
          handlePrev();
        }
      }
      inactivityTimerRef.current = null;
      resetInactivityTimer();
    }, 4000);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach((evt) => document.addEventListener(evt, resetInactivityTimer));
    resetInactivityTimer();
    return () => {
      events.forEach((evt) => document.removeEventListener(evt, resetInactivityTimer));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  const [expandedCards, setExpandedCards] = useState(new Set());

  const toggleExpand = (areaId) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(areaId)) {
        next.delete(areaId);
      } else {
        next.add(areaId);
      }
      return next;
    });
  };

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
                  <p
                    className={`areas__card-description ${expandedCards.has(area.id) ? 'areas__card-description--expanded' : ''}`}
                  >
                    {area.description}
                  </p>
                  <button
                    type="button"
                    className="areas__card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(area.id);
                    }}
                  >
                    {expandedCards.has(area.id) ? 'VER MENOS' : 'SAIBA MAIS'}
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
