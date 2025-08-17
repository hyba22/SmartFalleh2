import SideBar from "../sidebar/SideBar";
import { FiSearch, FiBell } from 'react-icons/fi';

const Profile = () => {
    return (
        <div className="flex h-screen ">
            <SideBar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-19">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex-1 max-w-2xl mx-auto">
                            <div className="relative ml-14">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 pl-10 rounded-[50px] border border-[#4DAC70] focus:outline-none focus:ring-1 focus:ring-blue-400"
                                />
                                <FiSearch className="absolute left-3 top-3 text-[#4DAC70]" />
                            </div>
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
                </header>
                <main className="flex-1 overflow-y-auto p-4">
                    {/* Your main content will go here */}
                </main>
            </div>
        </div>
    );
};        

export default Profile;
