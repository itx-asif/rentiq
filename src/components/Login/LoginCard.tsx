import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLoginButton } from '../ui/Google';

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle className="text-bold text-2xl text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-medium">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>

        <CardContent className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="font-medium">Password</Label>
            <Link to="/forget-password" className="text-sm hover:underline hover:text-primary">Forgot?</Link>
          </div>
          <Input
            type="password"
            name="password"
            required={true}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>

        <CardContent>
          <Button className="w-full mb-2" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <GoogleLoginButton />
        </CardContent>

        <CardContent className="text-right">
          Don't have an account?{' '}
          <Button variant="link" asChild className="px-0 py-0">
            <Link to="/register">Sign up</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginCard;
