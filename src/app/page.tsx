import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { redirect } from 'next/navigation';
import Experience from '@/components/Experience';

export default function Home() {
  // O ZIP aprovado pela cliente é a fonte de verdade da apresentação.
  // Sem o ZIP, preservamos a versão antiga para não quebrar o site.
  if (existsSync(join(process.cwd(), 'public', 'apresentacao', 'index.html'))) {
    redirect('/apresentacao/index.html');
  }
  return <Experience />;
}
