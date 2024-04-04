import Button from '@/components/ui/Button';
import { useAuth } from '@/context/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom';

// import { Dropdown } from '@mui/base/Dropdown';
// import { Menu } from '@mui/base/Menu';
// import { AnimatedListbox, MenuButton, MenuItem } from '../../ui/Dropdown';

export const Filter: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }
  return (
    <div className='flex justify-between w-full'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Good Morning, {user?.name || "User"}! 👋</h1>
      </div>
      <Button variant='primary' onClick={handleLogout} className='w-fit'>
        Logout
      </Button>
    </div>
  )
}

export default Filter
