import React from 'react'
import { Props } from './pages.types'
import OTPInput from '@/components/ui/OTPInput'
import Button from '@/components/ui/Button'

export const OTP: React.FC<Props> = ({ setCurrentStep, email = "noono14252@gmail.com" }) => {
  const handleOTP = (otp: string) => {
    console.log(otp);
  }
  
  return (
    <>
      <div className='flex flex-col gap-4 items-start max-w-96 w-full'>
        <h1 className='text-xl font-bold'>Password Reset</h1>
        <p className='text-sm'>We sent a code to <span className='font-semibold'>{email}</span></p>
        <OTPInput length={6} onComplete={handleOTP} />
        <Button onClick={() => setCurrentStep(3)} className='hover:bg-secondary/95'>Verify</Button>
        <div className='flex gap-1 self-center'>
          <span className='text-sm'>Didn&apos;t receive the code?</span>
          <button className='text-primary text-sm font-semibold hover:underline transition-all'>Resend</button>
        </div>
      </div>
    </>
  )
}
