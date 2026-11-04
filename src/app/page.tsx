import { redirect } from 'next/navigation';

// Only the design-v2 branch points its root to the experimental design.
// Production's main branch keeps the approved original presentation.
export default function Home() {
  redirect('/v2/index.html');
}
