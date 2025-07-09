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

const RegisterCard = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle className="text-bold text-2xl text-center">
            Create a new account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details below to register your account
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-medium">Full Name</Label>
          <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" />
        </CardContent>

        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-medium">Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        </CardContent>

        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="password" className="font-medium">Password</Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
        </CardContent>

        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="confirm-password" className="font-medium">Confirm Password</Label>
          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" />
        </CardContent>

        <CardContent>
          <Button className="w-full mb-2" onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <GoogleLoginButton />
        </CardContent>

        <CardContent className="text-right">
          Already have an account?{' '}
          <Button variant="link" asChild className="px-0 py-0">
            <Link to="/login">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterCard;
