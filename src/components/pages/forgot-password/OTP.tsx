import React, { useState } from 'react'
import { Props } from './pages.types'
import OTPInput from '@/components/ui/OTPInput'
import Button from '@/components/ui/Button'
import toast from "react-hot-toast";
import { AxiosError } from 'axios';
import { API } from '@/config/axios';

export const OTP: React.FC<Props> = ({ setCurrentStep, email }) => {
  const [_otp, setOtp] = useState('');
  
  const handleOTP = (otp: string) => {
    console.log(otp);
    setOtp(otp);
  }

  const handleVerify = async () => {
    try {
      if (!_otp || _otp.length !== 6) return toast.error('Please enter the OTP code sent to your email');
      const { data } = await API.post('/auth/match-otp', { email, otp: _otp });
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
      <div className='flex flex-col items-start w-full gap-4 max-w-96'>
        <h1 className='text-xl font-bold'>Password Reset</h1>
        <p className='text-sm'>We sent a code to <span className='font-semibold'>{email}</span></p>
        <OTPInput length={6} onComplete={handleOTP} />
        <Button onClick={handleVerify} className='hover:bg-secondary/95'>Verify</Button>
        <div className='flex self-center gap-1'>
          <span className='text-sm'>Didn&apos;t receive the code?</span>
          <button className='text-sm font-semibold transition-all text-primary hover:underline'>Resend</button>
        </div>
      </div>
    </>
  )
}
