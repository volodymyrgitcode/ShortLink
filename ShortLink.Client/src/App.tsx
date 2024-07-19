import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import LoginForm from './_auth/forms/LoginForm';
import RegisterForm from './_auth/forms/RegisterForm';
import ErrorPage from './_root/pages/ErrorPage';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider'
import { AuthResponse } from './types/auth.ts'


function App() {

  const store = createStore<AuthResponse>({
    authName: '_auth',
    authType: 'localstorage',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:'
  })

  return (
    <>
      <main className='flex flex-col h-screen'>
        <AuthProvider store={store} >
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>

            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/error" state={{ errorMessage: "Page not found" }} />} />
          </Routes>
        </AuthProvider>

        <Toaster />
      </main>
    </>
  )
}

export default App
