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
    status: 'active',
    lastLogin: '2025-09-26T10:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2025-09-25T15:45:00',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

// Define columns with proper typing
const columns: Column<User>[] = [
  {
    header: 'Name',
    accessor: (user: User) => user.name,
    sortable: true,
  },
  {
    header: 'Email',
    accessor: (user: User) => user.email,
    sortable: true,
  },
  {
    header: 'Role',
    accessor: (user: User) => user.role,
    sortable: true,
  },
  {
    header: 'Status',
    accessor: (user: User) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        user.status === 'active' ? 'bg-green-100 text-green-800' :
        user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
      </span>
    ),
  },
  {
    header: 'Last Login',
    accessor: (user: User) => new Date(user.lastLogin).toLocaleString(),
    sortable: true,
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