import Link from 'next/link';

const productPillars = [
  'Secure basketball film library',
  'Offline downloads for approved users',
  'Role-based review and evaluation workflows',
  'RTBO-branded video analysis experience'
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#ff6a00]">
          Raising The Bar Officiating
        </p>
        <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
          The Locker Room
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          A production-ready foundation for secure basketball game film, review workflows,
          offline access, and officiating development.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/login" className="rounded-full bg-[#ff6a00] px-6 py-3 font-bold text-white">
            Sign in
          </Link>
          <Link href="/film-library" className="rounded-full border border-zinc-700 px-6 py-3 font-bold text-white">
            View film library
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {productPillars.map((pillar) => (
            <article key={pillar} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm font-semibold text-zinc-200">{pillar}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
