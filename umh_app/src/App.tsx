import './App.css'
import { ThemedTextField } from './components/ThemedTextField'
import { NavBar } from './components/NavBar'
import './App.css'
import Themedbutton from "./components/Themedbutton"

function App() {

  return (
    <>
    <NavBar />
    <ThemedTextField name="run">
    </ThemedTextField>
      <Themedbutton title = "click me"/>
    </>
  )
}

export default App
