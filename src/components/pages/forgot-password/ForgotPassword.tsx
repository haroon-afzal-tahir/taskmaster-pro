import React from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Props } from './pages.types'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { API } from '@/config/axios'


const ForgotPassword: React.FC<Props> = ({ setCurrentStep, email, setEmail }) => {
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.isTrusted) return;
    try {
      const { data } = await API.post('/auth/forgot-password', { email });
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
      <div className='flex flex-col items-start w-full gap-2 max-w-96'>
        <h1 className='text-xl font-bold'>Forgot Password</h1>
        <span className='text-sm'>No worries, we&apos;ll send you reset instructions</span>
      </div>
      <form onSubmit={handleResetPassword} className='flex flex-col items-center justify-center w-full gap-4 max-w-96'>
        <Input label='Email' type='email' required value={email} onChange={(e) => setEmail?.(e.target.value)} />
        <Button type='submit' className='hover:bg-secondary/95'>Reset Password</Button>
      </form>
    </>
  )
}

export default ForgotPassword
