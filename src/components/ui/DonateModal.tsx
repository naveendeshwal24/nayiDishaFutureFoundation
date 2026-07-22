import { useDonateModal } from '../../app/contexts/DonateContext'

export function DonateModal() {
  const { isOpen, closeDonateModal } = useDonateModal()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-slate-900">Donation</h2>
          <button
            onClick={closeDonateModal}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - QR Code */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <p className="text-xs font-medium text-slate-700 mb-2 text-center">
              Scan to Donate
            </p>
            <div className="flex justify-center mb-2">
              <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* QR Code placeholder - simple grid pattern */}
              <rect width="200" height="200" fill="white" stroke="black" strokeWidth="2" />
              
              {/* Corner patterns */}
              <rect x="10" y="10" width="50" height="50" fill="black" />
              <rect x="18" y="18" width="34" height="34" fill="white" />
              <rect x="26" y="26" width="18" height="18" fill="black" />
              
              <rect x="140" y="10" width="50" height="50" fill="black" />
              <rect x="148" y="18" width="34" height="34" fill="white" />
              <rect x="156" y="26" width="18" height="18" fill="black" />
              
              <rect x="10" y="140" width="50" height="50" fill="black" />
              <rect x="18" y="148" width="34" height="34" fill="white" />
              <rect x="26" y="156" width="18" height="18" fill="black" />
              
              {/* Random pattern in center */}
              <rect x="70" y="70" width="10" height="10" fill="black" />
              <rect x="90" y="80" width="10" height="10" fill="black" />
              <rect x="80" y="100" width="10" height="10" fill="black" />
              <rect x="100" y="90" width="10" height="10" fill="black" />
              <rect x="110" y="110" width="10" height="10" fill="black" />
              <rect x="70" y="120" width="10" height="10" fill="black" />
              <rect x="120" y="70" width="10" height="10" fill="black" />
              <rect x="85" y="135" width="10" height="10" fill="black" />
              <rect x="125" y="95" width="10" height="10" fill="black" />
            </svg>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Dummy QR
            </p>
          </div>

          {/* Right Columns - Content */}
          <div className="col-span-2 flex flex-col justify-between">
            {/* Consent Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Donation Consent</h3>
              <div className="text-xs text-slate-600 space-y-1">
                <p>✓ Support Nayi Disha's programs and projects</p>
                <p>✓ Tax-deductible donation</p>
                <p>✓ Transparent & responsible use</p>
                <p>✓ Receipt sent via email</p>
              </div>
            </div>

            {/* Amount Info */}
            <div className="p-2 border border-blue-200 bg-blue-50 rounded mb-2">
              <p className="text-xs text-slate-700">
                <span className="font-semibold">Scan the QR</span> using UPI or any payment method
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
