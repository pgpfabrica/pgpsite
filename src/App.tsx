import { useMemo, useState } from 'react';

type Item = { title: string; text: string };

export default function App() {
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const quiz = [
    {
      question: 'Qual tipo de negócio você possui?',
      options: ['Clínica ou consultório', 'Loja ou comércio', 'Empresa de serviços', 'Restaurante / delivery', 'Outro tipo de empresa'],
    },
    {
      question: 'Qual maior problema hoje na empresa?',
      options: ['Processos manuais', 'Falta de organização de clientes', 'Atendimento lento', 'Falta de controle financeiro', 'Quero automatizar tudo'],
    },
    {
      question: 'Quantas pessoas trabalham na empresa?',
      options: ['1 a 5', '5 a 20', '20 a 50', 'Mais de 50'],
    },
    {
      question: 'Qual sua urgência para resolver isso?',
      options: ['Preciso para ontem', 'Quero resolver este mês', 'Estou pesquisando opções', 'Ainda estou entendendo o que preciso'],
    },
  ];

  const services: Item[] = [
    { title: 'Sistemas Web', text: 'Plataformas acessadas pelo navegador para gestão, operação, vendas, atendimento e processos internos da empresa.' },
    { title: 'Aplicativos Mobile', text: 'Aplicativos para Android e iPhone com foco em praticidade, experiência do usuário e operação em tempo real.' },
    { title: 'Sites Profissionais', text: 'Sites institucionais, comerciais e páginas de vendas que fortalecem sua presença digital e geram mais credibilidade.' },
    { title: 'CRM - Gestão de Clientes', text: 'Sistema para organizar clientes, contatos, follow-ups, histórico de atendimento e oportunidades de negócio.' },
    { title: 'ERP - Gestão Empresarial', text: 'Solução para integrar financeiro, vendas, estoque, cadastros, relatórios e rotinas administrativas em um só lugar.' },
    { title: 'Chatbots com IA', text: 'Assistentes inteligentes para atendimento, captação, suporte e automação de interações com clientes.' },
    { title: 'Automação de Processos', text: 'Automação de tarefas repetitivas para reduzir erros, ganhar velocidade e aumentar a produtividade da operação.' },
    { title: 'Integração de APIs', text: 'Conexão entre sistemas, plataformas, gateways, CRMs, ERPs, apps e serviços externos para centralizar dados e fluxos.' },
  ];

  const reasons: Item[] = [
    { title: 'Desenvolvimento Personalizado', text: 'Criamos soluções sob medida de acordo com a realidade do negócio, sem limitar sua operação a sistemas engessados.' },
    { title: 'Tecnologia Moderna', text: 'Utilizamos stacks atualizadas, seguras e preparadas para performance, manutenção e crescimento sustentável.' },
    { title: 'Integração com IA', text: 'Aplicamos inteligência artificial para automatizar decisões, acelerar atendimentos e gerar mais eficiência operacional.' },
    { title: 'Sistemas Escaláveis', text: 'Projetamos arquiteturas prontas para suportar mais usuários, mais dados e novas funcionalidades com segurança.' },
    { title: 'Automação Empresarial', text: 'Estruturamos fluxos automáticos que eliminam tarefas manuais e melhoram o controle dos processos da empresa.' },
    { title: 'Suporte Especializado', text: 'Oferecemos acompanhamento técnico e visão estratégica para manter sua solução evoluindo com estabilidade.' },
  ];

  const results = ['Mais produtividade', 'Redução de custos', 'Automação de processos', 'Melhor gestão', 'Crescimento digital'];

  const nextAnswer = (value: string) => {
    const updated = [...answers];
    updated[quizStep] = value;
    setAnswers(updated);
    setQuizStep((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setAnswers([]);
    setQuizStep(0);
  };

  const diagnosis = useMemo(() => {
    const [business, pain, size, urgency] = answers;
    const recommended: string[] = [];
    const priorities: string[] = [];
    let level = 'Médio';
    let profile = 'Perfil em análise';

    if (pain === 'Processos manuais' || pain === 'Quero automatizar tudo') {
      recommended.push('Automação de Processos', 'Sistema Web de Gestão');
      priorities.push('reduzir tarefas manuais', 'ganhar velocidade operacional');
    }
    if (pain === 'Falta de organização de clientes' || pain === 'Atendimento lento') {
      recommended.push('CRM - Gestão de Clientes', 'Chatbot com IA', 'Integração com WhatsApp');
      priorities.push('melhorar atendimento', 'organizar contatos e oportunidades');
    }
    if (pain === 'Falta de controle financeiro') {
      recommended.push('ERP - Gestão Empresarial', 'Dashboard de indicadores');
      priorities.push('ter controle financeiro e operacional');
    }
    if (business === 'Clínica ou consultório') recommended.push('Sistema de agendamento', 'Prontuário / gestão interna');
    if (business === 'Loja ou comércio') recommended.push('ERP com estoque', 'Sistema de vendas', 'Integração de pagamentos');
    if (business === 'Restaurante / delivery') recommended.push('Sistema de pedidos', 'Integração com delivery', 'Automação de atendimento');
    if (size === '20 a 50' || size === 'Mais de 50') {
      recommended.push('Arquitetura escalável', 'Integração de APIs');
      priorities.push('escalar com segurança');
    }

    if (urgency === 'Preciso para ontem') {
      level = 'Muito alto';
      profile = 'Cliente urgente';
    } else if (urgency === 'Quero resolver este mês') {
      level = 'Alto';
      profile = 'Cliente pronto para investir';
    } else if (urgency === 'Estou pesquisando opções') {
      level = 'Médio';
      profile = 'Cliente em expansão';
    } else if (urgency) {
      level = 'Inicial';
      profile = 'Cliente em descoberta';
    }

    const uniqueRecommended = Array.from(new Set(recommended)).slice(0, 5);
    const uniquePriorities = Array.from(new Set(priorities)).slice(0, 3);
    const whatsappText = encodeURIComponent(
      `Olá, fiz o diagnóstico no site da PGP Fábrica de Software.\n\nTipo de negócio: ${business}\nProblema principal: ${pain}\nTamanho da empresa: ${size}\nUrgência: ${urgency}\nPerfil identificado: ${profile}\nNível de prioridade: ${level}\n\nSoluções sugeridas: ${uniqueRecommended.join(', ')}\n\nQuero receber um direcionamento comercial e entender a melhor proposta para minha empresa.`
    );

    return { business, pain, level, profile, uniqueRecommended, uniquePriorities, whatsappText };
  }, [answers]);

  return (
    <div className="page">
      <header className="hero">
        <div className="container hero-grid">
          <div>
            <div className="brand-pill">PGP Fábrica de Software</div>
            <h1>Desenvolvimento de Sistemas, Aplicativos e IA para empresas.</h1>
            <p className="hero-text">
              Criamos soluções digitais sob medida para empresas que querem automatizar processos, escalar operação e transformar tecnologia em resultado.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="https://wa.me/5583993798149?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20PGP%20F%C3%A1brica%20de%20Software%20e%20quero%20solicitar%20um%20or%C3%A7amento%20para%20minha%20empresa." target="_blank" rel="noreferrer">Solicitar orçamento</a>
              <a className="btn btn-secondary" href="https://www.instagram.com/pgpsoftware" target="_blank" rel="noreferrer">Ver Instagram</a>
            </div>
            <div className="muted">CEO • Paulo Assis Gomes Paiva</div>
          </div>
          <div className="panel">
            <div className="card-grid compact">
              {services.slice(0, 6).map((item) => (
                <div key={item.title} className="mini-card">{item.title}</div>
              ))}
            </div>
            <div className="feature-box">
              <div className="section-tag">Tecnologia que vende</div>
              <h3>Soluções para presença digital, gestão e automação.</h3>
              <p>Sites profissionais, sistemas web, apps mobile, CRM, ERP, APIs, chatbots e inteligência artificial.</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="container section">
          <div className="diagnosis-box">
            <div className="row-between gap-wrap">
              <div>
                <div className="section-tag">Diagnóstico inteligente</div>
                <h2>Descubra qual estrutura digital sua empresa precisa</h2>
                <p>Este diagnóstico analisa o perfil do seu negócio, o gargalo principal e a urgência para sugerir a solução ideal.</p>
              </div>
              <div className="step-badge">Etapa {Math.min(quizStep + 1, quiz.length)} de {quiz.length}</div>
            </div>

            <div className="progress"><div className="progress-bar" style={{ width: `${(Math.min(quizStep, quiz.length) / quiz.length) * 100}%` }} /></div>

            {quizStep < quiz.length ? (
              <div className="quiz-area">
                <h3>{quiz[quizStep].question}</h3>
                <div className="card-grid two">
                  {quiz[quizStep].options.map((opt) => (
                    <button key={opt} className="option-btn" onClick={() => nextAnswer(opt)}>{opt}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="diagnosis-result">
                <div className="result-main">
                  <div className="badges">
                    <span className="badge badge-primary">Prioridade {diagnosis.level}</span>
                    <span className="badge">{diagnosis.profile}</span>
                    <span className="badge">Diagnóstico estratégico</span>
                  </div>
                  <h3>Sua empresa tem perfil forte para investimento em tecnologia</h3>
                  <p>Com base nas suas respostas, o ideal é atacar primeiro os pontos que mais impactam operação, atendimento e escala.</p>
                  <div className="card-grid two info-grid">
                    <div className="info-card"><small>Tipo de negócio</small><strong>{diagnosis.business}</strong></div>
                    <div className="info-card"><small>Gargalo principal</small><strong>{diagnosis.pain}</strong></div>
                  </div>
                  <div>
                    <div className="section-tag">Soluções recomendadas</div>
                    <div className="chips">
                      {diagnosis.uniqueRecommended.map((item) => <span key={item} className="chip">{item}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="section-tag">Prioridades do projeto</div>
                    <ul className="priority-list">
                      {(diagnosis.uniquePriorities.length ? diagnosis.uniquePriorities : ['estruturar uma solução sob medida para o seu momento atual']).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="result-side">
                  <div className="section-tag">Próximo passo</div>
                  <h4>Receba um direcionamento comercial no WhatsApp</h4>
                  <p>Suas respostas já vão prontas, o que acelera o atendimento e aumenta a chance de falar sobre uma solução certa para sua empresa.</p>
                  <div className="info-card">
                    <small>CTA direto</small>
                    <p>Se sua empresa precisa resolver isso rápido, este é o melhor momento para solicitar uma proposta e entender a solução ideal para o seu cenário.</p>
                  </div>
                  <a className="btn btn-primary full" href={`https://wa.me/5583993798149?text=${diagnosis.whatsappText}`} target="_blank" rel="noreferrer">Enviar diagnóstico no WhatsApp</a>
                  <button className="btn btn-secondary full" onClick={restartQuiz}>Refazer diagnóstico</button>
                  <p className="muted small">Diagnóstico inteligente baseado nas respostas informadas. A recomendação final pode ser refinada em uma conversa rápida com a PGP.</p>
                </div>
              </div>
            )}
          </div>

          <div className="intro-block">
            <div className="section-tag">Quem somos</div>
            <h2>Tecnologia sob medida para acelerar negócios.</h2>
            <p>
              A PGP Fábrica de Software é uma empresa especializada no desenvolvimento de soluções digitais de alto impacto. Nossa missão é transformar ideias em realidade através de sistemas personalizados, aplicativos modernos e automações inteligentes, ajudando empresas a otimizar processos e alcançar o próximo nível de crescimento digital.
            </p>
          </div>
        </section>

        <section className="section alt-bg">
          <div className="container">
            <div>
              <div className="section-tag">Ecossistema de tecnologia</div>
              <h2>Serviços que estruturam o digital da sua empresa.</h2>
            </div>
            <div className="card-grid four top-gap">
              {services.map((item) => <AccordionCard key={item.title} item={item} />)}
            </div>
          </div>
        </section>

        <section className="container section">
          <div>
            <div className="section-tag">Por que escolher a PGP?</div>
            <h2>Estratégia, execução e escala no mesmo projeto.</h2>
          </div>
          <div className="card-grid three top-gap">
            {reasons.map((item) => <AccordionCard key={item.title} item={item} />)}
          </div>
        </section>

        <section className="section alt-bg">
          <div className="container two-col">
            <div>
              <div className="section-tag">Resultados</div>
              <h2>Transformamos tecnologia em resultados reais.</h2>
              <div className="card-grid two top-gap">
                {results.map((item) => <div key={item} className="result-card">{item}</div>)}
              </div>
            </div>
            <div className="performance-box">
              <div className="info-card dark">
                <div className="section-tag">Foco em performance</div>
                <p>Otimizamos tempo da equipe, reduzimos retrabalho, automatizamos operações e entregamos base tecnológica pronta para crescimento contínuo.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container section">
          <div className="contact-box">
            <div>
              <div className="section-tag">Contato</div>
              <h2>Vamos iniciar sua jornada?</h2>
              <p>Fale com a PGP Fábrica de Software para desenvolver seu sistema, aplicativo, automação ou solução com IA.</p>
            </div>

            <div className="card-grid four top-gap">
              <div className="info-card dark"><small>CEO</small><strong>Paulo Assis Gomes Paiva</strong></div>
              <div className="info-card dark"><small>Telefones</small><strong>83 99322-8913 / 83 99379-8149</strong></div>
              <div className="info-card dark"><small>Email</small><strong>pgpassis@gmail.com</strong></div>
              <div className="info-card dark"><small>Instagram</small><strong>@pgpsoftware</strong></div>
            </div>

            <div className="actions top-gap">
              <a className="btn btn-primary" href="https://wa.me/5583993798149?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20PGP%20F%C3%A1brica%20de%20Software%20e%20quero%20falar%20sobre%20uma%20solu%C3%A7%C3%A3o%20para%20minha%20empresa." target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
              <a className="btn btn-secondary" href="mailto:pgpassis@gmail.com" target="_blank" rel="noreferrer">Enviar e-mail</a>
            </div>
            <div className="muted top-gap">CNPJ: 34.896.863/0001-00</div>
          </div>
        </section>
      </main>

      <a className="floating-whatsapp" href="https://wa.me/5583993798149?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20PGP%20F%C3%A1brica%20de%20Software%20e%20quero%20entender%20qual%20a%20melhor%20solu%C3%A7%C3%A3o%20para%20minha%20empresa." target="_blank" rel="noreferrer">WhatsApp</a>
    </div>
  );
}

function AccordionCard({ item }: { item: Item }) {
  return (
    <details className="accordion-card">
      <summary>
        <span>{item.title}</span>
        <span className="plus">+</span>
      </summary>
      <p>{item.text}</p>
    </details>
  );
}
