import { Header, Hero, Sobre, Areas, WhatsAppButton } from './components';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Areas />
        <PlaceholderSection id="advogados" title="Advogados" />
      </main>
      <WhatsAppButton />
    </>
  );
}

function PlaceholderSection({ id, title }) {
  return (
    <section id={id} className="placeholder-section">
      <h2 className="placeholder-section__title">{title}</h2>
      <p className="placeholder-section__text">Em breve.</p>
    </section>
  );
}

export default App;
