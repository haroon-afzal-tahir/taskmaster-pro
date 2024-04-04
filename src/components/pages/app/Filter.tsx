import Button from '@/components/ui/Button';
import { useAuth } from '@/context/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Filter: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }
  return (
    <div className='flex flex-col justify-between w-full gap-4 md:flex-row'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Hi, {user?.name || "User"}! 👋</h1>
      </div>
      <Button variant='primary' onClick={handleLogout} className='w-fit'>
        Logout
      </Button>
    </div>
  )
}

export default Filter
