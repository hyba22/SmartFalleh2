import React from 'react';
import { UserRole } from '../types/Roles';
import { 
  FiGrid, 
  FiUser, 
  FiFileText, 
  FiHome, 
  FiSettings, 
  FiUsers,
  FiBarChart2,
  FiCalendar,
  FiDollarSign,
  FiClipboard,
  FiMail
} from 'react-icons/fi';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  allowedRoles: UserRole[];
  children?: MenuItem[];
}

const createIcon = (Icon: React.ElementType) => React.createElement(Icon);

// Admin specific menu items
export const adminMenuItems: MenuItem[] = [
  {
    title: 'Administration',
    path: '/admin',
    icon: createIcon(FiSettings),
    allowedRoles: [UserRole.ADMIN],
    children: [
      {
        title: 'Liste des Utilisateurs',
        path: '/userslist',
        icon: createIcon(FiUsers),
        allowedRoles: [UserRole.ADMIN],
      },
      {
        title: 'Ajouter un utilisateur',
        path: '/admin/add-user',
        icon: createIcon(FiBarChart2),
        allowedRoles: [UserRole.ADMIN],
      },
    ],
  },
  {
    title: 'Liste des agglomérations',
    path: '/agglomeration',
    icon: createIcon(FiUsers),
    allowedRoles: [UserRole.ADMIN],
  },
];

// Agriculteur specific menu items
export const agriculteurMenuItems: MenuItem[] = [
  {
    title: 'Mes Cultures',
    path: '/mes-cultures',
    icon: createIcon(FiGrid),
    allowedRoles: [UserRole.AGRICULTEUR],
  },
  {
    title: 'Calendrier',
    path: '/calendrier',
    icon: createIcon(FiCalendar),
    allowedRoles: [UserRole.AGRICULTEUR],
  },
  {
    title: 'Calendrier',
    path: '/calendrier',
    icon: createIcon(FiCalendar),
    allowedRoles: [UserRole.AGRICULTEUR],
  },
  {
    title: 'Paramètres',
    path: '/settings',
    icon: createIcon(FiSettings),
    allowedRoles: [UserRole.AGRICULTEUR],
  },

];

// Responsable specific menu items
export const responsableMenuItems: MenuItem[] = [
  {
    title: 'Rapports',
    path: '/reports',
    icon: createIcon(FiFileText),
    allowedRoles: [UserRole.RESPONSABLE, UserRole.ADMIN],
  },
  {
    title: 'Budgets',
    path: '/budgets',
    icon: createIcon(FiDollarSign),
    allowedRoles: [UserRole.RESPONSABLE, UserRole.ADMIN],
  },
  {
    title: 'Paramètres',
    path: '/settings',
    icon: createIcon(FiSettings),
    allowedRoles: [UserRole.RESPONSABLE],
  },
];

// Jury specific menu items
export const juryMenuItems: MenuItem[] = [
  {
    title: 'Évaluations',
    path: '/evaluations',
    icon: createIcon(FiClipboard),
    allowedRoles: [UserRole.JURY],
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: createIcon(FiMail),
    allowedRoles: [UserRole.JURY],
  },
  {
    title: 'Paramètres',
    path: '/settings',
    icon: createIcon(FiSettings),
    allowedRoles: [UserRole.JURY],
  },
  
];

// Combine all menu items
export const getAllMenuItems = (userRole: UserRole | null): MenuItem[] => {
  if (!userRole) return [];
  
  const combinedMenuItems: MenuItem[] = [];
  
  switch (userRole) {
    case UserRole.ADMIN:
      combinedMenuItems.push(...adminMenuItems, ...responsableMenuItems);
      break;
    case UserRole.AGRICULTEUR:
      combinedMenuItems.push(...agriculteurMenuItems);
      break;
    case UserRole.RESPONSABLE:
      combinedMenuItems.push(...responsableMenuItems);
      break;
    case UserRole.JURY:
      combinedMenuItems.push(...juryMenuItems);
      break;
  }
  
  return combinedMenuItems;
    };

// For backward compatibility
export const menuItems = getAllMenuItems;