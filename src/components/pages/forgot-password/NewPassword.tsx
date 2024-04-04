import React, { useState } from 'react'
import { Props } from './pages.types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { API } from '@/config/axios'

const NewPassword: React.FC<Props> = ({ setCurrentStep, email }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.isTrusted) return;
    try {
      if (password !== confirmPassword) return toast.error('Passwords do not match');
      if (password.length < 8) return toast.error('Password must be at least 8 characters');
      
      const { data } = await API.patch('/auth/update-password', { email, password });
      toast.success(data.message);
      setCurrentStep(currentStep => currentStep + 1);
    } catch (error) {
      if ((error as AxiosError)?.response) {
        const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data.message || 'An error occurred. Please try again later.'
        toast.error(errorMessage)
      } else {
        toast.error('An error occurred. Please try again later.')
      }
    }
  }
  
  return (
    <>
      <form onSubmit={handleUpdatePassword} className='flex flex-col items-start w-full gap-4 max-w-96'>
        <h1 className='text-xl font-bold'>Set new password</h1>
        <p className='text-sm'>Must be at least 8 characters</p>

        <Input required label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input required label='Confirm password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <Button type='submit' className='hover:bg-secondary/95'>Reset password</Button>
      </form>
    </>
  )
}

export default NewPassword
