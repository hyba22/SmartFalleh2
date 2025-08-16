import { useState } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            await authService.login({ email, password });
            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess();
            } else {
                // Default redirection if no callback provided
                navigate('/profile');
            }
        } catch (error: any) {
            setError(error.message || 'Email ou mot de passe incorrect');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                <div className="w-full">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse e-mail"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md text-center">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 bg-[#007F3F] text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
            </form>
        </div>
    );
};

export default Login;