import './App.css'
import { NavBar } from './components/NavBar'
import { NewsPage } from './routes/news/News'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App;