import CompleteProcess from '@/components/pages/forgot-password/CompleteProcess';
import ForgotPassword from '@/components/pages/forgot-password/ForgotPassword';
import NewPassword from '@/components/pages/forgot-password/NewPassword';
import { OTP } from '@/components/pages/forgot-password/OTP';
import ForgotPasswordIcon from '@/components/icons/ForgotPassword';
import { APP_HEADLINE, APP_TITLE } from '@/constants/app';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <ForgotPassword setCurrentStep={setCurrentStep} />
      case 2:
        return <OTP setCurrentStep={setCurrentStep} />
      case 3:
        return <NewPassword setCurrentStep={setCurrentStep} />
      case 4:
        return <CompleteProcess setCurrentStep={setCurrentStep} />
      default:
        return <ForgotPassword setCurrentStep={setCurrentStep} />
    }
  }

  useEffect(() => {
    console.log('Current Step:', currentStep);
  }, [currentStep]);


  return (
    <div className='flex w-full h-screen max-h-screen md:px-0 px-4'>
      <div className='flex-col items-center justify-center w-full bg-primaryLight hidden md:flex'>
        <ForgotPasswordIcon className='w-96 h-96'/>
        <div className='flex flex-col gap-4 items-center max-w-96'>
          <h1 className='font-bold text-secondary text-2xl text-center'>{APP_TITLE}</h1>
          <p className='text-secondary text-sm text-center'>{APP_HEADLINE}</p>
        </div>
      </div>
      <div className='w-full flex flex-col gap-10 items-center justify-center'>
          {renderComponent()}
          <Link to='/login' className='text-primary text-sm font-semibold hover:underline transition-all'>Back to Login</Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
