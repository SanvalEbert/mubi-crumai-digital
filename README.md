# Mubi + Crumaí Digital

Site editorial responsivo para apresentar o Plano Digital Mubi + Crumaí, novembro de 2026.

## Objetivo

Apresentar os diagnósticos, os quatro pilares estratégicos, o plano de 90 dias, a divisão de responsabilidades e a proposta comercial em uma narrativa digital interativa. **Não é uma loja virtual operacional.**

## Stack

Next.js App Router, React, TypeScript, CSS modularizado por seções, Lucide e testes Playwright.

## Executar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Qualidade

```bash
npm run typecheck
npm run build
npm run test:e2e
```

O teste E2E requer a instalação dos navegadores do Playwright: `npx playwright install chromium`.

## Conteúdo e proposta financeira

Altere `src/content/site.ts` para atualizar diagnósticos, cronograma, mensagens e valores. Nenhum preço fictício é utilizado; os campos estão identificados como **A definir**. Os dados de seguidores são do diagnóstico de novembro de 2026, não números atuais.

A página exibe fotografias editoriais ilustrativas via Unsplash, **não fotos oficiais das lojas**. Elas devem ser substituídas por imagens autorizadas antes da publicação comercial definitiva. O mapa é ilustrativo, sem coordenadas reais. A chamada final copia uma mensagem para negociação, pois ainda não há contato comercial confirmado.

## Acessibilidade

O site utiliza HTML semântico, navegação por teclado, skip-link, foco visível, respeito à preferência de movimento reduzido e o script oficial do VLibras 7, carregado no navegador. A disponibilidade e a tradução da ferramenta dependem do serviço externo oficial. O botão Top/Down fica no canto inferior esquerdo para minimizar interferência com o VLibras, normalmente localizado à direita.

## Privacidade

Sem formulários de coleta, cookies de analytics ou autenticação. Scripts de terceiros: VLibras e Google Fonts; imagens Unsplash são carregadas diretamente do provedor. Antes de divulgação pública, revisar privacidade, direitos de imagem e condições comerciais.

## Publicação

Configurar como projeto **Next.js** na Vercel, conectado ao repositório GitHub. A branch principal é `main`. `robots` é `noindex` / `nofollow` enquanto o conteúdo estiver em homologação.

## Documentação

Ver `docs/requisitos.md` para regras de negócio, requisitos, cenários de aceitação e decisões pendentes.
