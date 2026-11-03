'use client';
import Script from 'next/script';
/** Documentação oficial do VLibras Widget 7: o próprio script inicializa o widget.
 * Se o serviço externo falhar, a navegação e o conteúdo continuam disponíveis. */
export default function VLibras() {
  return <Script id="vlibras-official" src="https://vlibras.gov.br/app/vlibras-plugin.js" strategy="lazyOnload" />;
}
