import './App.css'
import { NavBar } from './components/NavBar'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;
