import { AppRouter } from './app/router/AppRouter'
import { QueryProvider } from './app/providers/QueryProvider'
import { DonateProvider } from './app/contexts/DonateContext'
import { DonateModal } from './components/ui/DonateModal'
import { ToastContainer } from './components/ui/Toast'

function App() {
  return (
    <QueryProvider>
      <DonateProvider>
        <ToastContainer />
        <DonateModal />
        <AppRouter />
      </DonateProvider>
    </QueryProvider>
  )
}

export default App
