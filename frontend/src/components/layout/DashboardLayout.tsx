import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../sidebar/SideBar';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar when route changes
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    // Toggle body scroll when sidebar is open/closed
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSidebarOpen]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            
            {/* Sidebar */}
            <div 
                className={`fixed inset-y-0 left-0 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:relative z-50 transition-transform duration-300 ease-in-out w-64 flex-shrink-0 bg-white shadow-xl h-full`}
                style={{
                    boxShadow: isSidebarOpen ? '4px 0 10px rgba(0, 0, 0, 0.1)' : 'none',
                    willChange: 'transform',
                    overflowY: 'auto'
                }}
            >
                <SideBar onClose={() => setIsSidebarOpen(false)} />
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden w-full ">
                {/* Mobile menu button - positioned absolutely for mobile */}
               
                
                {/* Page content */}
                <main className="flex-1 overflow-y-auto focus:outline-none lg:pt-0">
                    <div className="py-4">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};


export default DashboardLayout;
