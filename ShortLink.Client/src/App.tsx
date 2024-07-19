import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from "@/components/ui/toaster"
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import LoginForm from './_auth/forms/LoginForm';
import RegisterForm from './_auth/forms/RegisterForm';


function App() {
  return (
    <>
      <main className='flex flex-col h-screen'>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
        </Routes>

        <Toaster />
      </main>
    </>
  )
}

export default App
