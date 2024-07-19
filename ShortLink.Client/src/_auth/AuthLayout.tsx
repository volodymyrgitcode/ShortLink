import { useAuth } from '@/hooks/useAuth';
import { Outlet, Navigate } from 'react-router-dom'

function AuthLayout() {

    const { isAuthenticated } = useAuth();

    return (
        <>
            {
                isAuthenticated ? (
                    <Navigate to="/" />
                ) : (
                    <section className='flex flex-col justify-center items-center w-full h-full'>
                        <Outlet />
                    </section>
                )
            }
        </>
    )
}

export default AuthLayout