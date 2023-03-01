import './App.scss'
import { BrowserRouter } from 'react-router-dom'
import GetRouters from './router'

const App: React.FC = () => {
  return(
      <BrowserRouter>
        <GetRouters/>
      </BrowserRouter>
  )
}
export default App
