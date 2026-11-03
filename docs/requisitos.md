# ERS 1.0 — Mubi + Crumaí Digital

**Status:** escopo aprovado para implementação inicial e homologação. Fonte: apresentação Mubi + Crumaí — Plano Digital (novembro de 2026).

## Regras de negócio

- RN-01: marcas distintas na mesma proposta.
- RN-02: diagnóstico e prioridades de cada marca independentes.
- RN-03: quatro pilares: Instagram e conteúdo; Google Business Profile; tráfego pago; e-commerce.
- RN-04: jornada estruturada em dias 1–30, 31–60 e 61–90.
- RN-05: diferenciar ações planejadas, exemplos e resultados verificados.
- RN-06: indicadores históricos identificam data e fonte.
- RN-07: não prometer resultados não comprovados.
- RN-08: condições financeiras ao final da jornada.
- RN-09: separar implantação, gestão inicial e continuidade.
- RN-10: separar serviços incluídos e despesas adicionais.
- RN-11: condição comercial conjunta depende de aprovação.
- RN-12: prazos, valores e validade aprovados antes da venda.
- RN-13: CTA não caracteriza contratação concluída.
- RN-14: alterações comerciais revisadas e aprovadas.
- RN-15: navegação e acessibilidade durante toda a página.

## Requisitos funcionais

- RF-01: hero editorial com chamada para explorar.
- RF-02: menu semântico com âncoras.
- RF-03 a RF-04: diagnóstico individual e seletor Mubi/Crumaí.
- RF-05: cards com quatro pilares.
- RF-06: exemplos ilustrativos de conteúdo.
- RF-07: estratégia Google Business Profile por marca.
- RF-08: mock de e-commerce identificado como não operacional.
- RF-09: timeline com três etapas selecionáveis.
- RF-10: responsabilidades diferenciadas.
- RF-11: indicadores propostos; sem inventar performance comercial.
- RF-12 a RF-14: oferta, campos de investimento e condição conjunta não fictícia.
- RF-15: CTA funcional para iniciar negociação por cópia de mensagem.
- RF-16: navegação por âncoras.
- RF-17 a RF-19: botão flutuante Top/Down contextual, acessível por teclado.
- RF-20: VLibras oficial.
- RF-21: não sobrepor Top/Down e VLibras.
- RF-22: skip link, foco, semântica, alt de imagens.
- RF-23: experiência responsiva.
- RF-24: mídia adequada, origem e natureza ilustrativa transparentes.
- RF-25: conteúdo configurável em `src/content/site.ts`.
- RF-26: metadados e OpenGraph sem indexação durante homologação.

## Requisitos não funcionais

- RNF-01: meta WCAG 2.2 AA, auditoria necessária.
- RNF-02: Core Web Vitals LCP <= 2.5s, INP <= 200ms, CLS <= .1 em campo.
- RNF-03: design system editorial consistente.
- RNF-04: sem overflow horizontal em mobile.
- RNF-05: compatibilidade Chrome, Firefox, Safari, Edge.
- RNF-06: HTTPS, cabeçalhos de segurança e ausência de segredos.
- RNF-07: transparência no uso de terceiros, LGPD.
- RNF-08: navegação clara, atalhos previsíveis.
- RNF-09: TypeScript e organização modular.
- RNF-10: testes Playwright com cenários principais.
- RNF-11: serviços externos com falha não bloqueante.
- RNF-12: verificações CI antes de integrar alterações.
- RNF-13: metadados e configuração de indexação.
- RNF-14: respeitar `prefers-reduced-motion`.
- RNF-15: scripts externos carregados sem bloquear renderização.
- RNF-16: documentação e rastreabilidade.

## Aceitação mínima da versão de homologação

1. Conteúdo das oito frentes visível e consistente.
2. Troca de marcas e timeline operantes.
3. Botão Top/Down funcional, inclusive por teclado.
4. Script oficial do VLibras presente, com avaliação manual no ambiente publicado.
5. Valores explicitamente pendentes, sem cifras inventadas.
6. CTA comercial funcional, sem destinatário fictício.
7. Testes de build, tipagem e fluxo crítico aprovados.
8. Testes de acessibilidade, performance e integração externa documentados após a publicação.

## Pendências pré-publicação definitiva

- Valores e condições contratuais.
- Confirmação de responsáveis pela operação.
- Contato WhatsApp comercial oficial.
- Fotografias com direito de uso autorizado.
- Validação técnica de ERP/estoque e prazo da loja-piloto.
- Auditoria real de acessibilidade e tradução do VLibras em diferentes dispositivos.
