import './App.css'
import { NavBar } from './components/NavBar'
import { NewsPage } from './components/news/News'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <NewsPage />
      </main>
    </>
  )
}

export default App;