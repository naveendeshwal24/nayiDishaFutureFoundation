import { useState } from 'react'
import { useDonateModal } from '../../app/contexts/DonateContext'

const UPI_ID = 'ndff-2026@ybl'
const UPI_PAYEE_NAME = 'Nai Disha Future Foundation'
const UPI_LINK = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&cu=INR`
const QR_CODE_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(UPI_LINK)}`

export function DonateModal() {
  const { isOpen, closeDonateModal } = useDonateModal()
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable; ignore silently
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Donation</h2>
          <button
            onClick={closeDonateModal}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Left Column - QR Code */}
          <div className="sm:col-span-1 flex flex-col items-center justify-center">
            <p className="text-xs font-medium text-slate-700 mb-2 text-center">
              Scan to Donate
            </p>
            <div className="flex justify-center mb-2">
              <img
                src={QR_CODE_SRC}
                alt={`UPI QR code for ${UPI_ID}`}
                width={140}
                height={140}
                className="w-28 h-28 sm:w-[140px] sm:h-[140px] border border-slate-200 rounded"
              />
            </div>
            <p className="text-xs text-slate-500 text-center mb-1">
              UPI ID
            </p>
            <button
              type="button"
              onClick={handleCopyUpiId}
              className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded px-2 py-1 transition"
              title="Click to copy UPI ID"
            >
              {copied ? 'Copied!' : UPI_ID}
            </button>
          </div>

          {/* Right Columns - Content */}
          <div className="sm:col-span-2 flex flex-col justify-between gap-3">
            {/* Consent Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Donation Consent</h3>
              <div className="text-xs text-slate-600 space-y-1">
                <p>✓ Support Nai Disha Future Foundation's programs and projects</p>
                <p>✓ Transparent & responsible use</p>
                <p>✓ Receipt sent via email</p>
              </div>
            </div>

            {/* Amount Info */}
            <div className="p-2 border border-blue-200 bg-blue-50 rounded">
              <p className="text-xs text-slate-700">
                <span className="font-semibold">Scan the QR</span> or pay to UPI ID{' '}
                <span className="font-semibold">{UPI_ID}</span> using any UPI app
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-2">
              <button
                onClick={closeDonateModal}
                className="flex-1 px-3 py-2 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={closeDonateModal}
                className="flex-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
