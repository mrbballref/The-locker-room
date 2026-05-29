const metrics = [
  { label: 'Games', value: '—', description: 'Scheduled and archived games' },
  { label: 'Videos', value: '—', description: 'Uploaded film assets' },
  { label: 'Clips', value: '—', description: 'Teaching and evaluation clips' },
  { label: 'Downloads', value: '—', description: 'Offline film jobs' }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400">The Locker Room</p>
          <h1 className="mt-3 text-4xl font-bold">Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Review game film, manage evaluation workflows, monitor offline downloads, and organize study playlists from one command center.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-amber-300">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-400">{metric.description}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Film workflow</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              <li>1. Upload game film and register video assets.</li>
              <li>2. Create clips and bookmarks for teaching points.</li>
              <li>3. Add clips to playlists for officials, coaches, and observers.</li>
              <li>4. Sync downloads for offline mobile review.</li>
            </ol>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Evaluation workflow</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              <li>1. Connect game assignments to officials.</li>
              <li>2. Review film with clips and notes.</li>
              <li>3. Submit evaluations and scores.</li>
              <li>4. Track audit logs for administrative activity.</li>
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
}
