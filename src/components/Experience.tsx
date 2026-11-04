'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowUp, ArrowRight, ArrowUpRight, Check, ChevronDown,
  ChevronRight, Instagram, MapPin, ShoppingBag, Megaphone, Menu,
  X, Plus, Minus, MoveRight, CircleCheck, Copy, ExternalLink,
  MousePointer2, Sparkles, Share2, Play, Globe2, TrendingUp
} from 'lucide-react';
import { content } from '@/content/site';

type Brand = 'mubi' | 'crumai';
const sectionIds = ['inicio','visao','marcas','estrategia','conteudo-digital','presenca','ecommerce','jornada','operacao','investimento'];
const sectionNames = ['Início','Visão','Marcas','Estratégia','Conteúdo','Presença','E-commerce','Jornada','Operação','Decisões'];
const photo = {
 hero: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=85',
 mubi: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85',
 crumai: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1100&q=85',
 editorial1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
 editorial2: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
 editorial3: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85',
 ecommerce: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=85'
};
const nav = [
  { label:'As marcas', href:'#marcas' }, { label:'Estratégia', href:'#estrategia' },
  { label:'O plano', href:'#jornada' }, { label:'Decisões', href:'#investimento' }
];

function SectionHeading({ k, title, text, dark = false }: {k: string; title: React.ReactNode; text?:string; dark?:boolean}) {
 return <div className={'section-heading'+(dark?' section-heading--dark':'')}><span className="eyebrow"><span className="eyebrow-line" />{k}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
function IconByIndex({ i }: {i: number}) { const icons=[Instagram,MapPin,Megaphone,ShoppingBag]; const Icon=icons[i]; return <Icon size={23} strokeWidth={1.4} aria-hidden="true"/>; }

export default function Experience() {
 const [brand, setBrand] = useState<Brand>('mubi');
 const [activeStep, setActiveStep] = useState(0);
 const [currentSection, setCurrentSection] = useState(0);
 const [menuOpen, setMenuOpen] = useState(false);
 const [headerScrolled, setHeaderScrolled] = useState(false);
 const [toast, setToast] = useState('');
 const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const selected = content.brands[brand];
 const scrollTarget = (id: string) => {
   document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start' });
   setMenuOpen(false);
 };
 useEffect(() => {
   const handleScroll = () => setHeaderScrolled(window.scrollY>48);
   handleScroll(); window.addEventListener('scroll',handleScroll,{passive:true});
   const elements=sectionIds.map(id=>document.getElementById(id)).filter((x):x is HTMLElement=>!!x);
   const observer=new IntersectionObserver(entries=>{
     const candidates=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
     if(candidates[0]) setCurrentSection(Math.max(0,sectionIds.indexOf(candidates[0].target.id)));
   },{rootMargin:'-18% 0px -56% 0px',threshold:[0,0.12,0.35,0.5]});
   elements.forEach(el=>observer.observe(el));
   return ()=>{window.removeEventListener('scroll',handleScroll);observer.disconnect();};
 },[]);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenuOpen(false)};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[]);
 useEffect(()=>()=>{if(toastTimer.current)clearTimeout(toastTimer.current)},[]);
 const notify=(message:string)=>{setToast(message);if(toastTimer.current)clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),3800);};
 const shareProposal = async () => {
   const url=window.location.href.split('#')[0];
   const data={title:'Mubi + Crumaí — Plano Digital',text:'Conheça a proposta digital para Mubi e Crumaí.',url};
   try {
     if(navigator.share){ await navigator.share(data);return; }
     await navigator.clipboard.writeText(url);notify('Link da proposta copiado.');
   } catch(err){ if((err as Error).name!=='AbortError')notify('Não foi possível compartilhar; copie o endereço do navegador.'); }
 };
 const copyBrief=async()=>{
   const message='Olá! Gostaria de conversar sobre a proposta Mubi + Crumaí: implantação digital, gestão dos primeiros 90 dias e condições comerciais.';
   try {await navigator.clipboard.writeText(message);notify('Mensagem de negociação copiada.');}
   catch {notify('Não foi possível copiar automaticamente.');}
 };
 const handleTopDown=()=>{ if(currentSection<1)scrollTarget('visao'); else scrollTarget('inicio'); };
 return <>
  <header className={'site-header'+(headerScrolled?' is-scrolled':'')}>
    <a className="brand-logo" href="#inicio" aria-label="Mubi e Crumaí — voltar ao início" onClick={e=>{e.preventDefault();scrollTarget('inicio');}}><span>MUBI</span><i aria-hidden="true"/><span>CRUMAÍ</span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(item=><a key={item.href} href={item.href} onClick={e=>{e.preventDefault();scrollTarget(item.href.substring(1));}}>{item.label}</a>)}</nav>
    <div className="header-actions"><span className="header-edition">PLANO DIGITAL · 2026</span><button className="nav-toggle" type="button" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={24}/>:<Menu size={24}/>}</button></div>
  </header>
  {menuOpen&&<div className="mobile-menu" role="navigation" aria-label="Menu móvel">{nav.map((item,i)=><a key={item.href} href={item.href} onClick={e=>{e.preventDefault();scrollTarget(item.href.slice(1));}}><span>0{i+1}</span>{item.label}<ArrowUpRight size={20}/></a>)}<button onClick={()=>{setMenuOpen(false);void shareProposal();}} type="button"><Share2 size={17}/> Compartilhar proposta</button></div>}
  <main id="conteudo">
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-kicker"><span className="kicker-dot" /> {content.hero.eyebrow}</div>
        <h1 id="hero-title">Duas lojas.<br/><em>Novas</em><br/>possibilidades<span className="hero-period">.</span></h1>
        <p>{content.hero.description}</p>
        <button className="cta-primary" type="button" onClick={()=>scrollTarget('visao')}>Conhecer a proposta <ArrowUpRight size={18}/></button>
        <div className="hero-bottom"><span>TRÁFEGO PAGO & MARKETING DIGITAL</span><span>01 / 10</span></div>
      </div>
      <div className="hero-visual" role="img" aria-label="Fotografia editorial de moda usada como referência visual ilustrativa" style={{backgroundImage:'linear-gradient(145deg,#a9b6a0,#d8d8c7)'}}>
        <div className="hero-photo-top">UMA NOVA PERSPECTIVA<br/>PARA CADA MARCA</div>
        <div className="hero-photo-mark">M <span>+</span> C</div>
        <div className="hero-photo-bottom"><span>CURADORIA. PRESENÇA. CONEXÃO.</span><ArrowUpRight size={24} strokeWidth={1.2}/></div>
      </div>
      <button className="hero-scroll" type="button" onClick={()=>scrollTarget('visao')} aria-label="Rolar para a próxima seção"><ArrowDown size={18}/><span>DESLIZE PARA EXPLORAR</span></button>
    </section>

    <section className="intro section-pad" id="visao">
      <div className="container">
        <div className="intro-top"><span className="eyebrow"><span className="eyebrow-line"/> A VISÃO</span><span className="tiny-mark">M + C / 2026</span></div>
        <div className="intro-grid"><div><h2>O que vamos organizar <em>juntas.</em></h2></div><div className="intro-desc"><p>Instagram e conteúdo, presença local, tráfego pago e sites: quatro frentes para aproximar as lojas de novas clientes.</p><p>Vamos organizar a presença digital sem perder a essência do atendimento.</p><a href="#estrategia" onClick={e=>{e.preventDefault();scrollTarget('estrategia');}} className="text-link">O que vamos construir <ArrowUpRight size={18}/></a></div></div>
        <div className="intro-metrics"><div><strong>02</strong><span>MARCAS, UM PLANO INTEGRADO</span></div><div><strong>04</strong><span>FRENTES DE ATUAÇÃO</span></div><div><strong>90<span className="metric-suffix">dias</span></strong><span>JORNADA DE IMPLEMENTAÇÃO</span></div></div>
      </div>
    </section>

    <section className="brands section-pad" id="marcas">
      <div className="container">
        <SectionHeading k="01 / PONTO DE PARTIDA" title={<>Cada loja tem seu<br/><em>próprio momento.</em></>} text="Os diagnósticos e prints dos perfis servem como ponto de partida para nossa conversa." />
        <div className="brand-toggle" role="group" aria-label="Selecionar marca"><button type="button" className={brand==='mubi'?'selected':''} aria-pressed={brand==='mubi'} onClick={()=>setBrand('mubi')}>01 / MUBI <ArrowUpRight size={18}/></button><button type="button" className={brand==='crumai'?'selected':''} aria-pressed={brand==='crumai'} onClick={()=>setBrand('crumai')}>02 / CRUMAÍ <ArrowUpRight size={18}/></button></div>
        <div className="brand-showcase" key={brand}>
          <div className={'brand-photograph '+(brand==='crumai'?'brand-photograph--crumai':'')} role="img" aria-label="Painel de identificação da marca; prints originais reservados para incorporação" style={{backgroundImage:'linear-gradient(135deg,#deded3,#c1cbbb)'}}><span className="image-caption">DIAGNÓSTICO DO PERFIL</span><span className="brand-overlay-name">{selected.nameUpper}</span></div>
          <div className="brand-details"><span className="tag-outline">{selected.badge}</span><span className="small-muted">{selected.category}</span><h3>{selected.headline}</h3><p>{selected.description}</p><div className="brand-followers"><strong>{selected.followers}</strong><span>SEGUIDORES NO DIAGNÓSTICO · NOV/2026</span></div><div className="brand-two-cols"><div><h4><Check size={16}/> PONTOS FORTES</h4><ul>{selected.strengths.map(x=><li key={x}>{x}</li>)}</ul></div><div><h4><ArrowUpRight size={16}/> OPORTUNIDADES</h4><ul>{selected.opportunities.map(x=><li key={x}>{x}</li>)}</ul></div></div><a className="handle-link" href={brand==='mubi'?'https://www.instagram.com/mubimultimarcas/':'https://www.instagram.com/crumaioficial/'} target="_blank" rel="noopener noreferrer">{selected.handle} ↗</a></div>
        </div>
        <p className="fineprint">Fonte dos diagnósticos e seguidores: apresentação “Mubi + Crumaí — Plano Digital”, novembro de 2026. Valores históricos, não uma atualização em tempo real.</p>
      </div>
    </section>

    <section className="strategy section-pad" id="estrategia">
      <div className="container"><div className="strategy-intro"><SectionHeading k="02 / A ESTRATÉGIA" dark title={<>O que vamos<br/><em>organizar juntas.</em></>} text="Cada frente tem seu papel. Juntas, constroem uma jornada mais completa: descobrir, conectar, atender e vender."/><span className="strategy-aside">DA VISIBILIDADE<br/>AO RELACIONAMENTO<br/>E À CONVERSÃO</span></div>
        <div className="pillar-grid">{content.pillars.map((p,i)=><article key={p.id} className="pillar-card"><div className="pillar-top"><span>{p.id} / 04</span><IconByIndex i={i}/></div><div><span className="pillar-caption">{p.caption}</span><h3>{p.name}</h3><p>{p.description}</p></div><div className="pillar-bottom">{p.tags}<ArrowUpRight size={18}/></div></article>)}</div>
        <div className="strategy-banner"><Sparkles size={19}/><span>Presença relevante. Conteúdo com propósito. Tecnologia a serviço do relacionamento.</span><ArrowRight size={24}/></div>
      </div>
    </section>

    <section className="editorial section-pad" id="conteudo-digital">
      <div className="container"><div className="editorial-head"><SectionHeading k="03 / CONTEÚDO" title={<>Conteúdo que mostra<br/><em>a roupa em movimento.</em></>} text="A proposta de comunicação começa com a vida real: gente, textura, caimento, detalhes e histórias."/><p>Reels, Stories e destaques úteis, adaptando as ideias ao jeito de cada loja.</p></div>
        <div className="editorial-gallery"><article className="editorial-feature" style={{backgroundImage:'linear-gradient(145deg,#879c86,#e4e2d5)'}}><span>01 / REELS</span><div><strong>Uma peça.<br/>Três ocasiões.</strong><p>Versatilidade para a vida real.</p></div></article><article className="editorial-small" style={{backgroundImage:'linear-gradient(145deg,#b6b9a6,#e8e0d5)'}}><span>02 / PROVADOR REAL</span><div><strong>Caimento.<br/>Movimento.</strong></div></article><article className="editorial-small editorial-small--beige" style={{backgroundImage:'linear-gradient(145deg,#b5b1a2,#e5e5da)'}}><span>03 / CURADORIA</span><div><strong>Escolhas<br/>da equipe.</strong></div></article></div>
        <div className="editorial-bottom"><span className="eyebrow"><span className="eyebrow-line"/> IDEIAS PARA COMEÇAR</span><div className="editorial-chips"><span>REELS</span><span>STORIES</span><span>PROVADORES</span><span>DETALHES DE TECIDO</span><span>NOVIDADES</span><span>ENQUETES</span></div></div>
        <p className="fineprint">Visuais de apoio em cores neutras; utilizar fotografias autorizadas das lojas na produção dos conteúdos.</p>
      </div>
    </section>

    <section className="presence section-pad" id="presenca">
      <div className="container presence-grid"><div><SectionHeading k="04 / PRESENÇA LOCAL" title={<>Ser encontrada.<br/><em>Ser escolhida.</em></>} text="A jornada de compra pode começar com uma pesquisa no Google. Estar bem posicionada e apresentar informações úteis faz parte da experiência."/><div className="presence-actions"><div><span>01 / MUBI</span><h3>Otimizar o que já existe.</h3><p>Atualizar fotos, categorias e informações; acompanhar avaliações e aprimorar a vitrine local.</p></div><div><span>02 / CRUMAÍ</span><h3>Estruturar para ser descoberta.</h3><p>Organizar a presença no Google, com fachada, localização, fotos e informações essenciais.</p></div></div></div><div className="map-visual" aria-label="Ilustração conceitual de localização das duas lojas em Salvador; não representa mapa geográfico real" role="img"><div className="map-street map-street-one"/><div className="map-street map-street-two"/><div className="map-street map-street-three"/><div className="map-street map-street-four"/><div className="map-park"/><div className="map-pin map-pin--one"><MapPin size={19} fill="currentColor"/><span>MUBI</span></div><div className="map-pin map-pin--two"><MapPin size={19} fill="currentColor"/><span>CRUMAÍ</span></div><span className="map-maplabel">SALVADOR · BA</span><span className="map-disclaimer">VISUALIZAÇÃO ILUSTRATIVA</span></div></div>
    </section>

    <section className="commerce section-pad" id="ecommerce"><div className="container commerce-grid"><div className="commerce-copy"><SectionHeading k="05 / E-COMMERCE" dark title={<>Sua loja<br/><em>24 horas por dia.</em></>} text="Uma loja virtual bem construída expande a experiência da loja física sem perder o cuidado com atendimento, estoque e pós-venda."/><div className="commerce-checklist">{['Catálogo com fotos organizadas','Pagamentos, frete e atendimento','Integração operacional com estoque','Validação da jornada antes de escalar'].map((x,i)=><div key={x}><span>0{i+1}</span><span>{x}</span><CircleCheck size={18}/></div>)}</div><div className="pilot-note"><span>ESTRATÉGIA DE LANÇAMENTO</span><strong>Prazo: até 6 semanas · Inclui: integração com ERP</strong><p>Organizamos catálogo, fotos, estoque, frete e atendimento para cada operação. O detalhamento e as condições constam da proposta de parceria.</p></div></div><div className="commerce-preview" aria-label="Exemplo conceitual da interface de uma loja virtual, sem compras reais"><div className="ecom-window"><div className="ecom-window-header"><span>EXPERIÊNCIA DE E-COMMERCE</span><div><i/><i/><i/></div></div><div className="ecom-store-header"><span>MUBI <span className="lightweight">STUDIO</span></span><ShoppingBag size={20}/></div><div className="ecom-hero" style={{backgroundImage:'linear-gradient(145deg,#a5b49c,#e9e5d8)'}}><div><span>COLEÇÃO / 2026</span><strong>O essencial<br/>é sentir.</strong></div></div><div className="ecom-products"><div><div className="ecom-thumb" style={{backgroundImage:'linear-gradient(145deg,#b8c4ac,#e9e5d8)'}}/><span>Peças para viver</span></div><div><div className="ecom-thumb" style={{backgroundImage:'linear-gradient(145deg,#c4baaa,#f1e7d8)'}}/><span>Novas escolhas</span></div></div><div className="ecom-footer">CONCEITO VISUAL · NÃO É UMA LOJA OPERACIONAL <ArrowUpRight size={15}/></div></div></div></div></section>

    <section className="journey section-pad" id="jornada"><div className="container"><div className="journey-head"><SectionHeading k="06 / IMPLEMENTAÇÃO" title={<>Uma jornada.<br/><em>Noventa dias.</em></>} text="Uma execução organizada em etapas. Cada avanço prepara o próximo."/><div className="journey-counter"><strong>90</strong><span>DIAS PARA ESTRUTURAR<br/>UMA NOVA OPERAÇÃO</span></div></div><div className="timeline-tabs" role="tablist" aria-label="Etapas do cronograma">{content.timeline.map((s,i)=><button key={s.period} type="button" role="tab" id={`tab-${i}`} aria-controls={`panel-${i}`} aria-selected={activeStep===i} className={activeStep===i?'active':''} onClick={()=>setActiveStep(i)}><span className="timeline-dot"/><span className="timeline-range">DIAS {s.period}</span><strong>{i===0?'Preparação':i===1?'Ativação':'Otimização'}</strong><ArrowUpRight size={18}/></button>)}</div><div className="timeline-panel" id={`panel-${activeStep}`} role="tabpanel" aria-labelledby={`tab-${activeStep}`}><div><span className="stage-label">ETAPA 0{activeStep+1} / 03</span><h3>{content.timeline[activeStep].title}</h3><p>{content.timeline[activeStep].detail}</p></div><ul>{content.timeline[activeStep].tasks.map((task,i)=><li key={task}><span>0{i+1}</span>{task}<Check size={17}/></li>)}</ul></div><p className="fineprint">O sequenciamento poderá ser ajustado conforme disponibilidade da equipe, estoque e validações operacionais.</p></div></section>

    <section className="operations section-pad" id="operacao"><div className="container"><SectionHeading k="07 / A OPERAÇÃO" title={<>Uma parceria com<br/><em>papéis bem definidos.</em></>} text="Organização e transparência para que a estratégia se transforme em uma rotina possível."/><div className="operations-grid"><article><div className="operations-card-top"><span>01</span><ArrowUpRight size={22}/></div><span className="eyebrow">ESTRATÉGIA & GESTÃO</span><h3>Quem conduz o digital</h3><p>Planejamento e acompanhamento das ações.</p><ul>{['Direção estratégica de conteúdo e criativos','Gestão de mídia paga','Otimização do Google Business Profile','Implantação e gestão técnica do e-commerce'].map(x=><li key={x}><Check size={16}/>{x}</li>)}</ul></article><article><div className="operations-card-top"><span>02</span><ArrowUpRight size={22}/></div><span className="eyebrow">LOJAS & OPERAÇÃO</span><h3>Quem vive a marca</h3><p>Produtos, histórias e processos do dia a dia.</p><ul>{['Participação nas gravações e demonstrações','Rotina de publicações conforme alinhamento','Confirmação de preços e disponibilidade','Atendimento e preparação dos pedidos'].map(x=><li key={x}><Check size={16}/>{x}</li>)}</ul></article></div><p className="fineprint">Divisão preliminar apresentada no material original. O escopo final de cada parte deverá ser formalizado na contratação.</p></div></section>

    <section className="offer section-pad" id="investimento"><div className="container offer-inner"><div className="offer-heading"><span className="offer-pill">NOSSA CONVERSA · MUBI + CRUMAÍ</span><h2>Decisões desta<br/><em>conversa.</em></h2><p>O que faz sentido para começarmos juntas?</p></div><div className="offer-pricing"><span className="eyebrow">O QUE VAMOS COMBINAR?</span>{['O que faz mais sentido começar agora?','Quem fica responsável por cada tarefa imediata?','Quanto podemos investir em anúncios inicialmente?','Qual a data do nosso primeiro teste de conteúdo?'].map((question,i)=><label className="price-row" key={question}><input type="checkbox" style={{width:20,height:20,accentColor:'#8b9c7f',marginRight:18}}/><span style={{fontSize:16,lineHeight:1.5}}>{question}</span></label>)}<div className="offer-important"><span>PRÓXIMOS MATERIAIS</span><p>Validar o plano Google da Mubi e da Crumaí e definir escopo e proposta financeira.</p></div><p className="offer-footnote">Vamos em frente? O sucesso é um processo contínuo.</p></div></div></section>
  </main>
  <footer className="site-footer"><div className="container"><div className="footer-top"><div><div className="brand-logo footer-logo"><span>MUBI</span><i/><span>CRUMAÍ</span></div><p>Uma nova experiência digital começa com uma boa conversa.</p></div><button type="button" onClick={()=>void shareProposal()} className="footer-share"><Share2 size={17}/> Compartilhar proposta</button></div><div className="footer-bottom"><span>PLANO DIGITAL / NOVEMBRO 2026</span><span>PROPOSTA PARA AVALIAÇÃO · NÃO CONSTITUI CONTRATAÇÃO</span><span>FEITO PARA CONECTAR</span></div></div></footer>
  <button className="top-down" type="button" onClick={handleTopDown} aria-label={currentSection<1?'Ir para a próxima seção':'Voltar ao topo'} title={currentSection<1?'Próxima seção':'Voltar ao topo'}>{currentSection<1?<ArrowDown size={21}/>:<ArrowUp size={21}/>}<span>{currentSection<1?'DESCER':'SUBIR'}</span></button>
  {toast&&<div className="toast" role="status" aria-live="polite"><CircleCheck size={18}/>{toast}</div>}
 </>;
}
