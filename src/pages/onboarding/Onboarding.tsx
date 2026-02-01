import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboard, useVerifyTIN } from '../../hooks/useBusiness'
import { useAuthStore } from '../../store/authStore'
import type { OnboardingPayload } from '../../types'

const steps = [
  { id: 1, title: 'Business details', fields: ['business_name', 'tin', 'email', 'phone'] },
  { id: 2, title: 'Address', fields: ['address', 'city', 'state', 'country', 'postal_code'] },
  { id: 3, title: 'Confirm' },
]

const defaultValues: OnboardingPayload = {
  business_name: '',
  tin: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: 'NG',
  postal_code: '',
}

export function Onboarding() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<OnboardingPayload>(defaultValues)
  const [tinStatus, setTinStatus] = useState<{ valid?: boolean; name?: string } | null>(null)
  const navigate = useNavigate()
  const setOnboarded = useAuthStore((s) => s.setOnboarded)
  const onboard = useOnboard()
  const verifyTIN = useVerifyTIN()

  const update = (key: keyof OnboardingPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key === 'tin') setTinStatus(null)
  }

  const handleVerifyTIN = async () => {
    if (!form.tin.trim()) return
    try {
      const res = await verifyTIN.mutateAsync(form.tin)
      setTinStatus(res as { valid?: boolean; name?: string })
    } catch {
      setTinStatus({ valid: false })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }
    try {
      await onboard.mutateAsync(form)
      setOnboarded(true)
      navigate('/', { replace: true })
    } catch (err) {
      // show error in UI
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-8 py-6">
          <h1 className="text-xl font-semibold text-slate-800">Business onboarding</h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete your business profile to use e-invoicing.
          </p>
          <div className="mt-4 flex gap-2">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`h-1 flex-1 rounded-full ${
                  s.id <= step ? 'bg-slate-700' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Business name *
                </label>
                <input
                  type="text"
                  value={form.business_name}
                  onChange={(e) => update('business_name', e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  placeholder="Acme Ltd"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tax Identification Number (TIN) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.tin}
                    onChange={(e) => update('tin', e.target.value)}
                    required
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                    placeholder="12345678-0001"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyTIN}
                    disabled={verifyTIN.isPending || !form.tin.trim()}
                    className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 disabled:opacity-50"
                  >
                    {verifyTIN.isPending ? 'Verifying…' : 'Verify'}
                  </button>
                </div>
                {tinStatus && (
                  <p
                    className={`mt-1 text-sm ${
                      tinStatus.valid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {tinStatus.valid ? `Valid${tinStatus.name ? ` – ${tinStatus.name}` : ''}` : 'Invalid TIN'}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  placeholder="billing@company.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
                <input
                  type="tel"
                  value={form.phone ?? ''}
                  onChange={(e) => update('phone', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  placeholder="+234..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
                <input
                  type="text"
                  value={form.address ?? ''}
                  onChange={(e) => update('address', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  placeholder="Street, building"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">City</label>
                  <input
                    type="text"
                    value={form.city ?? ''}
                    onChange={(e) => update('city', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                    placeholder="Lagos"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">State</label>
                  <input
                    type="text"
                    value={form.state ?? ''}
                    onChange={(e) => update('state', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                    placeholder="Lagos"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Country</label>
                  <input
                    type="text"
                    value={form.country ?? ''}
                    onChange={(e) => update('country', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                    placeholder="NG"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Postal code
                  </label>
                  <input
                    type="text"
                    value={form.postal_code ?? ''}
                    onChange={(e) => update('postal_code', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                    placeholder="100001"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Business name</dt>
                  <dd className="font-medium text-slate-800">{form.business_name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">TIN</dt>
                  <dd className="font-medium text-slate-800">{form.tin}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Email</dt>
                  <dd className="font-medium text-slate-800">{form.email}</dd>
                </div>
                {form.phone && (
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Phone</dt>
                    <dd className="font-medium text-slate-800">{form.phone}</dd>
                  </div>
                )}
                {(form.address || form.city) && (
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Address</dt>
                    <dd className="font-medium text-slate-800 text-right">
                      {[form.address, form.city, form.state, form.country, form.postal_code]
                        .filter(Boolean)
                        .join(', ')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={onboard.isPending}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {step < 3 ? 'Next' : onboard.isPending ? 'Saving…' : 'Complete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
