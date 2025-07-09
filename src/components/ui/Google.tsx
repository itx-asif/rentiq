import { useAuth } from '@/context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';


export const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const { setUser } = useAuth();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const googleRes = await fetch(
                    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
                );
                const googleUser = await googleRes.json();
                console.log(googleUser)
                const backendRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/google-login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: googleUser.name,
                        email: googleUser.email,
                        googleId: googleUser.sub,
                        image: googleUser.picture,
                    }),
                });

                const result = await backendRes.json();
                if (!result.success) {
                    toast.error("Login Failed")
                } else {
                    setUser(result.user)
                    localStorage.setItem('token', result.token);
                    toast.success(result.message)
                    navigate('/dashboard');

                }

            } catch (error: any) {
                console.error('Google login error:', error.message);
            }
        },

        onError: (err) => {
            console.error('Google Login Failed:', err);
        },
    });

    return (
        <Button onClick={() => login()} className="w-full mb-2" variant="destructive">
            Continue with Google
        </Button>
    );
};
