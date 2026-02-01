import { useErpAdapters } from '../../hooks/useErp'

const adapterLabels: Record<string, string> = {
  sap: 'SAP',
  odoo: 'Odoo',
  sage: 'Sage',
  dynamics: 'Microsoft Dynamics',
  http: 'HTTP / Custom',
}

export function ErpIntegrations() {
  const { data: adapters = [], isLoading, error } = useErpAdapters()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
        <p className="font-medium">Could not load ERP adapters</p>
        <p className="mt-1 text-sm">
          Ensure the backend is running. ERP endpoints: GET /api/erp, POST /api/erp/:system/push, pull, sync.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Connect your ERP to push invoices to the e-invoicing platform or pull/sync data. The backend exposes these adapters.
      </p>
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                System
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Display name
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {adapters.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  No adapters configured. Check backend ErpAdapterRegistry.
                </td>
              </tr>
            ) : (
              adapters.map((name) => (
                <tr key={name} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
                    {name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {adapterLabels[name.toLowerCase()] ?? name}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Configure
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
