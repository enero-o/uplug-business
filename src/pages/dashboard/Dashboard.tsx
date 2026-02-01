import { Link } from 'react-router-dom'
import { useDashboardStats } from '../../hooks/useInvoices'
import { useBusinessProfile } from '../../hooks/useBusiness'

const statCards = [
  { key: 'total_invoices', label: 'Total invoices', color: 'bg-slate-50 border-slate-200' },
  { key: 'draft_invoices', label: 'Draft', color: 'bg-amber-50 border-amber-200' },
  { key: 'sent_invoices', label: 'Sent', color: 'bg-blue-50 border-blue-200' },
  { key: 'paid_invoices', label: 'Paid', color: 'bg-emerald-50 border-emerald-200' },
  { key: 'cancelled_invoices', label: 'Cancelled', color: 'bg-red-50 border-red-200' },
  { key: 'total_revenue', label: 'Total revenue', color: 'bg-slate-50 border-slate-200', format: 'currency' },
  { key: 'pending_amount', label: 'Pending amount', color: 'bg-amber-50 border-amber-200', format: 'currency' },
  { key: 'overdue_invoices', label: 'Overdue', color: 'bg-red-50 border-red-200' },
]

function formatValue(
  value: number,
  format?: string,
  currency = 'NGN'
): string {
  if (format === 'currency') {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  return String(value)
}

export function Dashboard() {
  const { data: stats, isLoading, error } = useDashboardStats()
  const { data: profile } = useBusinessProfile()

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
        <p className="font-medium">Could not load dashboard</p>
        <p className="mt-1 text-sm">
          Ensure the backend is running and the API base path matches (e.g. /api). Stats will appear once connected.
        </p>
      </div>
    )
  }

  const s = stats ?? {
    total_invoices: 0,
    draft_invoices: 0,
    sent_invoices: 0,
    paid_invoices: 0,
    cancelled_invoices: 0,
    total_revenue: 0,
    pending_amount: 0,
    overdue_invoices: 0,
    currency: 'NGN',
  }

  return (
    <div className="space-y-6">
      {profile && (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-medium text-slate-500">Business</h2>
          <p className="mt-1 font-semibold text-slate-800">{profile.name ?? '—'}</p>
          {profile.tin && (
            <p className="text-sm text-slate-600">TIN: {profile.tin}</p>
          )}
        </div>
      )}

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(({ key, label, color, format }) => (
            <div
              key={key}
              className={`rounded-lg border p-4 ${color}`}
            >
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="mt-1 text-xl font-semibold text-slate-800">
                {formatValue(
                  Number((s as unknown as Record<string, number | string>)[key]) || 0,
                  format,
                  s.currency
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Quick actions
        </h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            to="/invoices"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            View invoices
          </Link>
          <Link
            to="/erp"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ERP integrations
          </Link>
        </div>
      </div>
    </div>
  )
}
