import { Link as ScrollLink } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import Login from '../connection/Login';
import Signup from '../connection/Signup';
import SignupModal from '../ui/SignupModal';

const Navbar = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const token = authService.getToken();
            const user = authService.getCurrentUser();
            setIsAuthenticated(!!token && !!user);
            setUser(user || null);
        } catch (error) {
            console.error('Error checking auth state:', error);
            setIsAuthenticated(false);
            setUser(null);
            // Clean up any invalid auth data
            authService.logout();
        }
    }, [isLoginModalOpen, isSignupModalOpen]);

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

    const handleSuccessfulLogin = () => {
        setIsLoginModalOpen(false);
        navigate('/profile');
    };

    const handleSuccessfulSignup = () => {
        setIsSignupModalOpen(false);
        navigate('/profile');
    };

    return (
        <div className="fixed z-50 w-[100%] h-[100px] ">
            <div className="w-[90%] h-[100px] mx-auto mt-4 bg-white shadow-md rounded-[110px] px-8">
            <div className="h-full flex items-center justify-between">
                <NavLink to="/" className="text-2xl font-bold ml-20 cursor-pointer">Logo</NavLink>
                <div className="flex items-center space-x-8">
                    <nav className="flex space-x-6">
                        <ScrollLink 
                            to="home" 
                            smooth={true}
                            spy={true}
                            duration={500}
                            offset={-100}
                            className="cursor-pointer transition-colors text-gray-600 hover:text-[#679330] hover:font-medium"
                            activeClass="text-[#679330] font-medium"
                        >
                            Accueil
                        </ScrollLink>
                        <ScrollLink 
                            to="about" 
                            smooth={true}
                            spy={true}
                            duration={500}
                            offset={-100}
                            className="cursor-pointer transition-colors text-gray-600 hover:text-[#679330] hover:font-medium"
                            activeClass="text-[#679330] font-medium"
                        >
                            A propos
                        </ScrollLink>
                        <ScrollLink 
                            to="contact" 
                            smooth={true}
                            spy={true}
                            duration={500}
                            offset={-100}
                            className="cursor-pointer transition-colors text-gray-600 hover:text-[#679330] hover:font-medium"
                            activeClass="text-[#679330] font-medium"
                        >
                            Contact
                        </ScrollLink>
                    </nav>
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Bonjour, {user?.prenom || 'Utilisateur'}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-500 w-[150px] h-[50px] text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => setIsSignupModalOpen(true)}
                                className="bg-[#679330] w-[150px] h-[50px] text-white px-4 py-2 rounded-full hover:bg-[#5a7f29] transition-colors">
                                S'inscrire
                            </button>
                            <button 
                                onClick={() => setIsLoginModalOpen(true)}
                                className="bg-[#C19A6B] w-[150px] h-[50px] text-white px-4 py-2 rounded-full hover:bg-[#5a7f29] transition-colors"
                            >
                                Se connecter
                            </button>
                        </>
                    )}
                </div>
            </div>
            <Modal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)}
                title="Connexion"
            >
                <Login onSuccess={handleSuccessfulLogin} />
            </Modal>
            <SignupModal 
                isOpen={isSignupModalOpen} 
                onClose={() => setIsSignupModalOpen(false)}
                title="Inscription"
            >
                <Signup onSuccess={handleSuccessfulSignup} />
            </SignupModal>
                </div>
        </div>
    );
};

export default Navbar;
