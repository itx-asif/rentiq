import LoginCard from '@/components/Login/LoginCard'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
    </div>
  )
}

export default LoginPage