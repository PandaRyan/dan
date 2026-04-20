import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './components/context/AuthContext.tsx'
import { SignIn } from './routes/auth/SignIn.tsx'
import { Onboarding, SignUp } from './routes/auth/SignUp.tsx'
import { NewsPage } from './routes/news/News.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/signup/onboarding',
        element: <Onboarding />
      },
      {
        path: '/news',
        element: <NewsPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
