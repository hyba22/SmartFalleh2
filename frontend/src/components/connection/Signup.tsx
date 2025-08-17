import { useState } from 'react';
import { authService } from '../../services/authService';
import type { SignupData } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
    onSuccess?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSuccess }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('agriculteur');
    const [error, setError] = useState('');
    const [nbrVaches, setNbrVaches] = useState('');
    const [adresse, setAdresse] = useState('');
    const [region, setRegion] = useState('');
    const [surfaceFerme, setSurfaceFerme] = useState('');


    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nom || !email || !password) {
            setError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            const userData: SignupData = {
                email,
                password,
                nom,
                prenom,
                role: role as any, // Cast to any to match the enum type
                telephone,
                adresse,
                region,
                surfaceFerme,
                nbrVaches: nbrVaches ? parseInt(nbrVaches) : undefined,
            };

            await authService.signup(userData);
            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess();
            } else {
                // Default redirection if no callback provided
                navigate('/dashboard');
            }
        } catch (error: any) {
            setError(error.message || 'Une erreur est survenue lors de l\'inscription');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full">
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Prénom"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <input
                    type='string '
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder='Téléphone'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
                    required
                    />
                </div>
                <div className="w-full">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse e-mail"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <input
                        type="number"
                        value={nbrVaches}
                        onChange={(e) => setNbrVaches(e.target.value)}
                        placeholder="Nombre de vaches"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        placeholder="Adresse"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="Region"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <input
                        type="number"
                        value={surfaceFerme}
                        onChange={(e) => setSurfaceFerme(e.target.value)}
                        placeholder="Surface de ferme (hectares)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        required
                    />
                </div>
                <div className="w-full">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
                        required
                    >
                        <option value="agriculteur">Agriculteur</option>
                    </select>
                </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full md:w-64 mx-auto block px-8 py-3 bg-[#007F3F] text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Inscription en cours...' : "S'inscrire"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;