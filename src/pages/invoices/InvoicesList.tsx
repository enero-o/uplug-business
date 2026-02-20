import { useState } from 'react'
import DataTable, { type TableColumn } from 'react-data-table-component'
import { useEinvoiceActions } from '../../hooks/useInvoices'
import type { EInvoiceActionRecord, ActionType } from '../../types/api'

const actionBadge: Record<ActionType, string> = {
  VALIDATE: 'bg-blue-50 text-blue-700 border-blue-200',
  VALIDATE_IRN: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  REPORT: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  DOWNLOAD: 'bg-slate-50 text-slate-700 border-slate-200',
  UPDATE: 'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRM: 'bg-teal-50 text-teal-700 border-teal-200',
  EXCHANGE_SELF_HEALTH: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  EXCHANGE_LOOKUP_IRN: 'bg-violet-50 text-violet-700 border-violet-200',
  EXCHANGE_LOOKUP_TIN: 'bg-purple-50 text-purple-700 border-purple-200',
  EXCHANGE_TRANSMIT: 'bg-rose-50 text-rose-700 border-rose-200',
  EXCHANGE_CONFIRM_RECEIPT: 'bg-pink-50 text-pink-700 border-pink-200',
  EXCHANGE_PULL: 'bg-orange-50 text-orange-700 border-orange-200',
}

const columns: TableColumn<EInvoiceActionRecord>[] = [
  {
    name: 'Action Type',
    selector: (row) => row.actionType,
    sortable: true,
    width: '180px',
    cell: (row) => (
      <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold tracking-tight ${actionBadge[row.actionType]}`}>
        {row.actionType}
      </span>
    ),
  },
  {
    name: 'Reference / IRN',
    selector: (row) => row.reference || row.id.split('-')[0],
    sortable: true,
    grow: 1,
    cell: (row) => (
      <div className="flex flex-col py-2">
        <span className="font-bold text-primary truncate max-w-[200px]">{row.reference || row.id}</span>
        <span className="text-[10px] text-text-light font-medium uppercase tracking-wider">ID: {row.id.split('-')[0]}...</span>
      </div>
    )
  },
  {
    name: 'Date',
    selector: (row) => row.createdAt,
    sortable: true,
    width: '160px',
    cell: (row) => (
      <span className="text-sm font-medium text-text-muted">
        {new Date(row.createdAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    )
  },
  {
    name: 'Status',
    selector: (row) => row.status || 'SUCCESS',
    sortable: true,
    width: '120px',
    cell: (row) => {
      const status = row.status || 'SUCCESS';
      const isError = status.toUpperCase().includes('FAIL') || status.toUpperCase().includes('ERR');
      return (
        <span className={`inline-flex items-center gap-1 text-xs font-bold ${isError ? 'text-red-600' : 'text-emerald-600'}`}>
          <div className={`h-1.5 w-1.5 rounded-full ${isError ? 'bg-red-500' : 'bg-emerald-500'}`} />
          {status}
        </span>
      )
    }
  },
  {
    name: 'Message',
    selector: (row) => row.message || '-',
    grow: 1,
    cell: (row) => <span className="text-xs text-text-light truncate" title={row.message}>{row.message || 'Complete'}</span>
  }
]

export function InvoicesList() {
  const [filter, setFilter] = useState<ActionType | ''>('')
  const { data: actions = [], isLoading, error } = useEinvoiceActions(filter || undefined)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">E-Invoice Actions</h1>
          <p className="text-sm text-text-light font-medium">History of all validation and reporting operations</p>
        </div>
        
        <div className="flex items-center gap-3">
           <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ActionType | '')}
            className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-bold text-primary focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer shadow-subtle min-w-[200px]"
          >
            <option value="">All Action Types</option>
            <option value="VALIDATE">Validate Invoice</option>
            <option value="REPORT">Report to Authority</option>
            <option value="DOWNLOAD">Download PDF</option>
            <option value="EXCHANGE_TRANSMIT">Transmit</option>
          </select>

          <button className="p-2 bg-white border border-border rounded-xl text-primary hover:bg-surface transition-colors shadow-subtle">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-red-700">
          <h3 className="font-bold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Sync Error
          </h3>
          <p className="mt-1 text-sm font-medium opacity-80">Check your API connection or credentials. History will update once restored.</p>
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-premium border border-border overflow-hidden">
          <DataTable
            columns={columns}
            data={actions}
            progressPending={isLoading}
            pagination
            paginationPerPage={10}
            highlightOnHover
            pointerOnHover
            noDataComponent={
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-text-light/30">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-primary">No actions recorded</h3>
                <p className="text-sm text-text-light font-medium mt-1">Start by validating an invoice or syncing from ERP.</p>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}
