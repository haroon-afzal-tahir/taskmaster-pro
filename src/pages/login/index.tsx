import TodoGirl from '@/components/icons/TodoGirl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { APP_HEADLINE, APP_TITLE } from '@/constants/app';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='flex w-full h-screen max-h-screen md:px-0 px-4'>
      <div className='flex-col items-center justify-center w-full bg-primaryLight hidden md:flex'>
        <TodoGirl className='w-96 h-96'/>
        <div className='flex flex-col gap-4 items-center max-w-96'>
          <h1 className='font-bold text-secondary text-2xl text-center'>{APP_TITLE}</h1>
          <p className='text-secondary text-sm text-center'>{APP_HEADLINE}</p>
        </div>
      </div>
      <div className='w-full flex flex-col gap-10 items-center justify-center'>
        <h1 className='font-bold text-xl'>Login</h1>
        <div className='flex flex-col gap-4 items-center justify-center max-w-96 w-full'>
          <Input label='Username or Email' />
          <Input label='Password' type='password' />
          <Link
            to={'/forgot-password'}
            className='text-primary text-sm font-semibold text-end self-end hover:underline transition-all'
          >
            Forgot Password?
          </Link>

          <Button className='hover:bg-secondary/95'>Sign In</Button>

        </div>
        <div className='flex gap-4 w-full items-center max-w-96 mx-auto'>
          <span className='border-b border-gray-300 w-full'></span>
          <span className='text-gray-500 text-xs'>OR</span>
          <span className='border-b border-gray-300 w-full'></span>
        </div>

        <Button className='bg-primary/50 w-full hover:bg-primary/60 max-w-96 mx-auto flex items-center justify-center gap-4 text-secondary font-semibold'>
          <FcGoogle className='text-lg'/>
          Sign In with Google
        </Button>

        <div className='flex gap-1 max-w-96 mx-auto'>
          <span className='text-sm'>Dont have an account?</span>
          <Link to='/register' className='text-primary text-sm font-semibold hover:underline transition-all'>Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
