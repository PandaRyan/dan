import './App.css'
import { ThemedTextField } from './components/ThemedTextField'
import { NavBar } from './components/NavBar'
import './App.css'
import Themedbutton from "./components/Themedbutton"
import { SignUp } from './components/auth/SignUp';
import { SignIn } from './components/auth/SignIn';

function App() {

  return (
    <>
    <NavBar />
    <ThemedTextField name="run">
    </ThemedTextField>
      <Themedbutton title = "click me"/>
    </>
  )
  return <SignIn />;
}

export default App;
