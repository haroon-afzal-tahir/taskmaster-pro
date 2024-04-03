import React from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Props } from './pages.types'


const ForgotPassword: React.FC<Props> = ({ setCurrentStep }) => {
  const handleResetPassword = () => {
    console.log('Reset Password')
    setCurrentStep(currentStep => currentStep + 1);
  }
  return (
    <>
      <div className='flex flex-col gap-2 items-start w-full max-w-96'>
        <h1 className='font-bold text-xl'>Forgot Password</h1>
        <span className='text-sm'>No worries, we&apos;ll send you reset instructions</span>
      </div>
      <div className='flex flex-col gap-4 items-center justify-center max-w-96 w-full'>
        <Input label='Email' type='email' />
        <Button onClick={handleResetPassword} className='hover:bg-secondary/95'>Reset Password</Button>
      </div>
    </>
  )
}

export default ForgotPassword
