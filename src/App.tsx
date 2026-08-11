import Site from './components/Site'
import { LanguageProvider } from './LanguageProvider'

function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}

export default App
