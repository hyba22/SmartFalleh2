import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllMenuItems } from '../config/menuItems';
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

interface MenuItemType {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: MenuItemType[];
  allowedRoles?: string[];
}

interface SideBarProps {
  onClose?: () => void;
}

interface MenuItemProps {
  item: MenuItemType;
  isChild?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isChild = false, isOpen = false, onToggle, onClose }) => {
  const hasChildren = item.children && item.children.length > 0;
  // NavLink will handle the active state
  
  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      if (onToggle) onToggle();
    } else if (onClose) {
      onClose();
    }
  };

  // Build the correct path - prepend /dashboard if it's not already there
  const buildPath = (path: string) => {
    if (path === '/') return '/dashboard';
    return path.startsWith('/dashboard') ? path : `/dashboard${path}`;
  };

  return (
    <div className={`${isChild ? 'ml-4' : ''}`}>
      <NavLink
        to={buildPath(item.path)}
        end={!hasChildren}
        onClick={(e) => {
          handleClick(e);
          // Close the sidebar when a menu item is clicked (for mobile)
          if (!hasChildren && onClose) {
            onClose();
          }
        }}
        className={({ isActive }) => 
          `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
            isActive 
              ? 'bg-green-200 text-green-700' 
              : 'text-gray-700 hover:bg-green-100 hover:text-green-600'
          }`
        }
      >
        <span className="mr-3">{item.icon}</span>
        <span className="flex-1">{item.title}</span>
        {hasChildren && (
          <span className="ml-2">
            {isOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </span>
        )}
      </NavLink>
      
      {hasChildren && isOpen && item.children && (
        <div className="mt-1 space-y-1">
          {item.children.map((child, index) => (
            <MenuItem 
              key={index} 
              item={child} 
              isChild 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const { userRole, logout } = useAuth();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = getAllMenuItems(userRole);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [location.pathname, onClose]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (isOpen && sidebar && !sidebar.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  const toggleItem = (path: string) => {
    setOpenItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        id="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-green-600 text-white shadow-lg lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64 h-screen bg-[#F3FFF9] border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800 text-center">SmartFalleh</h1>
          <p className="text-xs text-gray-500 text-center">
            {userRole ? `Connecté en tant que ${userRole}` : 'Non connecté'}
          </p>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-1">
              <MenuItem
                item={item}
                isOpen={openItems[item.path]}
                onToggle={() => toggleItem(item.path)}
              />
            </div>
          ))}
        </nav>

        {/* Logout button at the bottom */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200"
          >
            <span className="mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;