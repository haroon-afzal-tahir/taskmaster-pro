import React from 'react'
import { Props } from './pages.types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const NewPassword: React.FC<Props> = ({ setCurrentStep, password, confirmPassword }) => {
  return (
    <>
      <div className='flex flex-col gap-4 items-start max-w-96 w-full'>
        <h1 className='text-xl font-bold'>Set new password</h1>
        <p className='text-sm'>Must be at least 8 characters</p>

        <Input label='Password' type='password' value={password} onChange={() => {}} />
        <Input label='Confirm password' type='password' value={confirmPassword} onChange={() => {}} />

        <Button onClick={() => setCurrentStep(4)} className='hover:bg-secondary/95'>Reset password</Button>
      </div>
    </>
  )
}

export default NewPassword
