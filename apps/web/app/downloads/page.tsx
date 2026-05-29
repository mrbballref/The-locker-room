const statuses = [
  { label: 'Queued', description: 'Film waiting to download for offline review.' },
  { label: 'Downloading', description: 'Active mobile sync jobs in progress.' },
  { label: 'Completed', description: 'Video assets available on device.' },
  { label: 'Failed', description: 'Jobs that need retry or review.' }
];

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-8">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Offline Review</p>
          <h1 className="mt-3 text-4xl font-bold">Downloads</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Monitor queued, active, completed, and failed film download jobs for mobile offline access.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {statuses.map((status) => (
            <article key={status.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-lg font-semibold">{status.label}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{status.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">Download jobs</h2>
          <p className="mt-2 text-sm text-slate-400">Connect this page to the downloads API for live job status.</p>
          <div className="mt-6 rounded-xl border border-slate-800 p-4 text-sm text-slate-300">
            Offline queue, storage, tracker, and sync managers are available in the mobile app package.
          </div>
        </section>
      </section>
    </main>
  );
}
