import { useState, useMemo } from 'react'
import DataTable, { type TableColumn } from 'react-data-table-component'
import { useInvoices } from '../../hooks/useInvoices'
import type { Invoice, InvoiceStatus } from '../../types'

const statusBadge: Record<InvoiceStatus, string> = {
  draft: 'bg-amber-100 text-amber-800',
  sent: 'bg-blue-100 text-blue-800',
  delivered: 'bg-slate-100 text-slate-800',
  paid: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
}

const columns: TableColumn<Invoice>[] = [
  {
    name: 'Invoice #',
    selector: (row: Invoice) => row.invoice_number,
    sortable: true,
    width: '120px',
  },
  {
    name: 'Issue date',
    selector: (row: Invoice) => row.issue_date,
    sortable: true,
    width: '110px',
  },
  {
    name: 'Due date',
    selector: (row: Invoice) => row.due_date,
    sortable: true,
    width: '110px',
  },
  {
    name: 'Customer',
    selector: (row: Invoice) => row.customer_name,
    sortable: true,
    grow: 1,
  },
  {
    name: 'Currency',
    selector: (row: Invoice) => row.document_currency_code,
    width: '80px',
  },
  {
    name: 'Amount',
    selector: (row: Invoice) => row.payable_amount,
    sortable: true,
    width: '120px',
    cell: (row: Invoice) =>
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: row.document_currency_code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(row.payable_amount),
  },
  {
    name: 'Status',
    selector: (row: Invoice) => row.status,
    sortable: true,
    width: '100px',
    cell: (row: Invoice) => (
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
          statusBadge[row.status] ?? 'bg-slate-100 text-slate-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
]

export function InvoicesList() {
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | ''>('')
  const [search, setSearch] = useState('')
  const filters = useMemo(
    () => ({
      ...(statusFilter && { status: statusFilter }),
      ...(search && { search }),
      limit: 50,
      offset: 0,
    }),
    [statusFilter, search]
  )
  const { data: invoices = [], isLoading, error } = useInvoices(filters)

  const filteredData = useMemo(() => {
    if (!search) return invoices
    const q = search.toLowerCase()
    return invoices.filter(
      (inv) =>
        inv.invoice_number.toLowerCase().includes(q) ||
        inv.customer_name.toLowerCase().includes(q)
    )
  }, [invoices, search])

  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
        <p className="font-medium">Could not load invoices</p>
        <p className="mt-1 text-sm">Check backend connection. List will show when API responds.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search by number or customer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter((e.target.value || '') as InvoiceStatus | '')}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredData}
          progressPending={isLoading}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50]}
          dense
          noDataComponent={
            <div className="py-12 text-center text-slate-500">
              No invoices found. Create one from the portal or sync from ERP.
            </div>
          }
        />
      </div>
    </div>
  )
}
