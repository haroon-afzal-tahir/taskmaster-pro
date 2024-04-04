import CompleteProcess from '@/components/pages/forgot-password/CompleteProcess';
import ForgotPassword from '@/components/pages/forgot-password/ForgotPassword';
import NewPassword from '@/components/pages/forgot-password/NewPassword';
import { OTP } from '@/components/pages/forgot-password/OTP';
import ForgotPasswordIcon from '@/components/icons/ForgotPassword';
import { APP_HEADLINE, APP_TITLE } from '@/constants/app';
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');

  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <ForgotPassword setCurrentStep={setCurrentStep} email={email} setEmail={setEmail} />
      case 2:
        return <OTP setCurrentStep={setCurrentStep} email={email} />
      case 3:
        return <NewPassword setCurrentStep={setCurrentStep} email={email} />
      case 4:
        return <CompleteProcess setCurrentStep={setCurrentStep} email={email} />
      default:
        return <ForgotPassword setCurrentStep={setCurrentStep} />
    }
  }

  return (
    <div className='flex w-full h-screen max-h-screen px-4 md:px-0'>
      <div className='flex-col items-center justify-center hidden w-full bg-primaryLight md:flex'>
        <ForgotPasswordIcon className='w-96 h-96'/>
        <div className='flex flex-col items-center gap-4 max-w-96'>
          <h1 className='text-2xl font-bold text-center text-secondary'>{APP_TITLE}</h1>
          <p className='text-sm text-center text-secondary'>{APP_HEADLINE}</p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full gap-10'>
          {renderComponent()}
          <Link to='/login' className='text-sm font-semibold transition-all text-primary hover:underline'>Back to Login</Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
