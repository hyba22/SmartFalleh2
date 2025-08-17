import { Link as ScrollLink } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import Login from '../connection/Login';
import Signup from '../connection/Signup';
import SignupModal from '../ui/SignupModal';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <div className="fixed z-50 w-full">
            {/* Main Navbar */}
            <div className="w-[90%] max-w-7xl h-[80px] md:h-[100px] mx-auto mt-4 bg-white shadow-md rounded-[110px] px-4 sm:px-8 transition-all duration-300">
                <div className="h-full flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="text-xl md:text-2xl font-bold ml-2 md:ml-10 lg:ml-20 cursor-pointer">
                        Logo
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                        <nav className="flex space-x-4 xl:space-x-6">
                            <ScrollLink 
                                to="home" 
                                smooth={true}
                                spy={true}
                                duration={500}
                                offset={-100}
                                className="px-2 py-1 text-sm md:text-base cursor-pointer transition-colors text-gray-600 hover:text-[#679330] hover:font-medium"
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
                                className="px-2 py-1 text-sm md:text-base cursor-pointer transition-colors text-gray-600 hover:text-[#679330] hover:font-medium"
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
                                className="px-2 py-1 text-sm md:text-base cursor-pointer transition-colors text-gray-600 hover:text-[#679330] hover:font-medium"
                                activeClass="text-[#679330] font-medium"
                            >
                                Contact
                            </ScrollLink>
                        </nav>
                        
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <span className="text-sm md:text-base text-gray-700 whitespace-nowrap">
                                    Bonjour, {user?.prenom || 'Utilisateur'}
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-500 w-[120px] md:w-[150px] h-[40px] md:h-[50px] text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors text-sm md:text-base"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <button 
                                    onClick={() => setIsSignupModalOpen(true)}
                                    className="bg-[#007F3F] w-[100px] md:w-[130px] h-[40px] md:h-[50px] text-white px-2 md:px-4 py-2 rounded-full hover:bg-[#5a7f29] transition-colors text-sm md:text-base whitespace-nowrap"
                                >
                                    S'inscrire
                                </button>
                                <button 
                                    onClick={() => setIsLoginModalOpen(true)}
                                    className="bg-[#C19A6B] w-[120px] md:w-[150px] h-[40px] md:h-[50px] text-white px-2 md:px-4 py-2 rounded-full hover:bg-[#5a7f29] transition-colors text-sm md:text-base whitespace-nowrap"
                                >
                                    Se connecter
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:text-[#679330] focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <FiX className="h-6 w-6" />
                            ) : (
                                <FiMenu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden w-[90%] max-w-7xl mx-auto mt-2 bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300">
                    <nav className="flex flex-col space-y-2 p-4">
                        <ScrollLink 
                            to="home" 
                            smooth={true}
                            spy={true}
                            duration={500}
                            offset={-100}
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            activeClass="bg-gray-100 text-[#679330] font-medium"
                        >
                            Accueil
                        </ScrollLink>
                        <ScrollLink 
                            to="about" 
                            smooth={true}
                            spy={true}
                            duration={500}
                            offset={-100}
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            activeClass="bg-gray-100 text-[#679330] font-medium"
                        >
                            A propos
                        </ScrollLink>
                        <ScrollLink 
                            to="contact" 
                            smooth={true}
                            spy={true}
                            duration={500}
                            offset={-100}
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            activeClass="bg-gray-100 text-[#679330] font-medium"
                        >
                            Contact
                        </ScrollLink>
                        
                        {isAuthenticated ? (
                            <div className="pt-2 border-t border-gray-100">
                                <div className="px-4 py-2 text-gray-700">
                                    Bonjour, {user?.prenom || 'Utilisateur'}
                                </div>
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <div className="pt-2 border-t border-gray-100 space-y-2">
                                <button 
                                    onClick={() => {
                                        setIsSignupModalOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-center px-4 py-3 bg-[#007F3F] text-white rounded-lg hover:bg-[#5a7f29] transition-colors"
                                >
                                    S'inscrire
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsLoginModalOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-center px-4 py-3 bg-[#C19A6B] text-white rounded-lg hover:bg-[#5a7f29] transition-colors"
                                >
                                    Se connecter
                                </button>
                            </div>
                        )}
                    </nav>
                </div>
            )}
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
    );
};

export default Navbar;
