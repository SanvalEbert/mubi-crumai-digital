import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { redirect } from 'next/navigation';
import Experience from '@/components/Experience';

export default function Home() {
  // Independent design preview; main branch and production remain unchanged.
  const v2 = join(process.cwd(),'public','v2','index.html');
  if (existsSync(v2)) redirect('/v2/index.html');
  if (existsSync(join(process.cwd(),'public','apresentacao','index.html'))) {
    redirect('/apresentacao/index.html');
  }
  return <Experience />;
}
