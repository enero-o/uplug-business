import { useBusinessProfile } from '../../hooks/useBusiness'

export function Settings() {
  const { data: profile, isLoading, error } = useBusinessProfile()

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-4">
        <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
        <p className="font-medium">Could not load business profile</p>
        <p className="mt-1 text-sm">API: GET /business/profile</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800">Business profile</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-slate-500">Name</dt>
            <dd className="mt-1 text-slate-800">{profile?.name ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">TIN</dt>
            <dd className="mt-1 text-slate-800">{profile?.tin ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd className="mt-1 text-slate-800">{profile?.email ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Phone</dt>
            <dd className="mt-1 text-slate-800">{profile?.phone ?? '—'}</dd>
          </div>
          {(profile?.address || profile?.city) && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-slate-500">Address</dt>
              <dd className="mt-1 text-slate-800">
                {[profile?.address, profile?.city, profile?.state, profile?.country, profile?.postal_code]
                  .filter(Boolean)
                  .join(', ') || '—'}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
