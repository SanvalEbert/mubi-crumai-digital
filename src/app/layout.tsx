import type { Metadata, Viewport } from 'next';
import './globals.css';
import VLibras from '@/components/VLibras';

export const metadata: Metadata = {
  title: 'Mubi + Crumaí | Uma nova experiência digital',
  description: 'Proposta digital Mubi + Crumaí. Estratégia, conteúdo, presença local, tráfego pago e e-commerce em um plano de 90 dias.',
  applicationName: 'Mubi + Crumaí Digital',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Mubi + Crumaí — Novas possibilidades',
    description: 'Duas marcas. Uma estratégia digital com identidade, experiência e propósito.',
    type: 'website', locale: 'pt_BR'
  }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f4f0e9' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><a href="#conteudo" className="skip-link">Ir para o conteúdo principal</a>{children}<VLibras /></body></html>;
}
