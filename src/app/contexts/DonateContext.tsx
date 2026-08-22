import { createContext, useContext, useState } from 'react'

interface DonateContextType {
  isOpen: boolean
  openDonateModal: () => void
  closeDonateModal: () => void
}

const DonateContext = createContext<DonateContextType | undefined>(undefined)

export function DonateProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openDonateModal = () => setIsOpen(true)
  const closeDonateModal = () => setIsOpen(false)

  return (
    <DonateContext.Provider value={{ isOpen, openDonateModal, closeDonateModal }}>
      {children}
    </DonateContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDonateModal() {
  const context = useContext(DonateContext)
  if (!context) {
    throw new Error('useDonateModal must be used within DonateProvider')
  }
  return context
}
