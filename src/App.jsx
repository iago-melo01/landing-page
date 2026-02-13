import { Header, Hero, Sobre, Areas, SobreMim, WhatsAppButton } from './components';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Areas />
        <SobreMim />
      </main>
      <WhatsAppButton />
    </>
  );
}

export default App;
