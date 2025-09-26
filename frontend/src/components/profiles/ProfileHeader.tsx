import { FiSearch, FiMenu, FiBell } from 'react-icons/fi';

const Profile = () => {
    const toggleSidebar = () => {
        const isOpen = document.documentElement.classList.toggle('sidebar-open');
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };
    
    return (
        <div className="w-full">
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-19">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex-1 max-w-2xl mx-auto">
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={toggleSidebar}
                                    className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                                    aria-label="Toggle sidebar"
                                    aria-expanded={document.documentElement.classList.contains('sidebar-open')}
                                >
                                    <FiMenu className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full px-4 py-2 pl-10 rounded-[50px] border border-[#4DAC70] focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    />
                                    <FiSearch className="absolute left-3 top-3 text-[#4DAC70]" />
                                </div>
                                <div className="ml-4">
                                    <div className="relative">
                                        <FiBell className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                                            3
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4">
                    {/* main content will go here */}
                </main>
            </div>
        </div>
    );
};

export default Profile;
