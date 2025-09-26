import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { Table } from '../layout/Table';
import type { Column } from '../layout/Table';
import React from 'react';

// Define your data type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  avatar?: string;
};

// Sample data
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
   region: 'Region 1',
   agglomeration: 'Agglomeration 1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    region: 'Region 2',
    agglomeration: 'Agglomeration 2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    region: 'Region 2',
    agglomeration: 'Agglomeration 2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
   region: 'Region 2',
   agglomeration: 'Agglomeration 2',
   avatar: 'https://randomuser.me/api/portraits/men/1.jpg',

  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    region: 'Region 2',
    agglomeration: 'Agglomeration 2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

// Define columns with proper typing
const columns: Column<User>[] = [
  {
    header: 'Nom',
    accessor: (user: User) => user.name,
    sortable: true,
  },
  {
    header: 'Prénom',
    accessor: (user: User) => user.name,
    sortable: true,
  },
  {
    header: 'Email',
    accessor: (user: User) => user.email,
    sortable: true,
  },
  {
    header: 'Région',
    accessor: (user: User) => user.region,
    sortable: true,
  },
  {
    header: 'Agglomération',
    accessor: (user: User) => user.agglomeration,
    sortable: true,
  },
  {
    header: 'Role',
    accessor: (user: User) => user.role,
    sortable: true,
  },

  {
    header: 'Actions',
    accessor: (user: User) => (
      <div className="flex gap-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
          <FiEye className="w-4 h-4" />
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full">
          <FiEdit2 className="w-4 h-4" />
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const UserList: React.FC = () => {
  const handleRowClick = (user: User) => {
    // Handle row click
    console.log('Selected user:', user);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <Table
        data={users}
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
        searchable={true}
        searchPlaceholder="Search users..."
      />
    </div>
  );
};

export default UserList;