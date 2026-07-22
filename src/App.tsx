import { AppRouter } from './app/router/AppRouter'
import { QueryProvider } from './app/providers/QueryProvider'
import { DonateProvider } from './app/contexts/DonateContext'
import { DonateModal } from './components/ui/DonateModal'

function App() {
  return (
    <QueryProvider>
      <DonateProvider>
        <DonateModal />
        <AppRouter />
      </DonateProvider>
    </QueryProvider>
  )
}

export default App
