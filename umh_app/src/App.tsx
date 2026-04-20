import { NavBar } from './components/NavBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function App() {
  const location = useLocation();
  const navigate = useNavigate();

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