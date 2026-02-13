import './SobreMim.css';

function SobreMim() {
  return (
    <section id="sobre-mim" className="sobre-mim" aria-labelledby="sobre-mim-title">
      <div className="sobre-mim__card">
        <div className="sobre-mim__image-wrapper">
          <img
            src="/images/stenio_formal.jpeg"
            alt="Stenio Veras - Advogado"
            className="sobre-mim__image"
            loading="lazy"
          />
        </div>
        <div className="sobre-mim__content">
          <h2 id="sobre-mim-title" className="sobre-mim__title">
            Sobre mim
          </h2>
          <p className="sobre-mim__subtitle">Advogado - Stenio Veras</p>
          <div className="sobre-mim__separator" />
          <div className="sobre-mim__text">
            <p>
              Advogado com atuação em diversas áreas do Direito, com foco em
              defesa estratégica e atendimento personalizado. Compreendendo as
              necessidades específicas de cada cliente, busco oferecer soluções
              jurídicas eficazes, seja na esfera judicial ou extrajudicial.
            </p>
            <p>
              Com sede em João Pessoa - PB, o escritório atende presencialmente
              na capital paraibana e online para todo o Brasil. A atuação abrange
              Direito Tributário, Previdenciário, Penal, Empresarial e Trabalhista,
              com dedicação exclusiva para garantir a segurança e tranquilidade
              de quem nos procura.
            </p>
            <p>
              Comprometido com a advocacia de alto nível, priorizo a técnica, a
              estratégia e o atendimento humanizado, visando o desfecho mais
              célere e favorável às demandas dos clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreMim;
