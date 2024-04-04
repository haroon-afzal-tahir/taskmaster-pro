import TodoGirl from '@/components/icons/TodoGirl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { API } from '@/config/axios';
import { APP_HEADLINE, APP_TITLE } from '@/constants/app';
import { CookieHelper } from '@/utils/cookie';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { AxiosError } from 'axios';

interface InputField {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [input, setInput] = useState<InputField>({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!input.email || !input.password) return alert('Please fill in all fields');
      const { data } = await API.post('/auth/login', input);
      CookieHelper.setCookie('token', data.token, 1);

      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      if ((error as AxiosError).response) {
        const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data.message || 'An error occurred. Please try again later.';
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }
  
  return (
    <div className='flex w-full h-screen max-h-screen px-4 md:px-0'>
      <div className='flex-col items-center justify-center hidden w-full bg-primaryLight md:flex'>
        <TodoGirl className='w-96 h-96'/>
        <div className='flex flex-col items-center gap-4 max-w-96'>
          <h1 className='text-2xl font-bold text-center text-secondary'>{APP_TITLE}</h1>
          <p className='text-sm text-center text-secondary'>{APP_HEADLINE}</p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full gap-10'>
        <h1 className='text-xl font-bold'>Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center w-full gap-4 max-w-96'>
          <Input label='Email' type='email' required value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} />
          <Input label='Password' type='password' required value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} />
          <Link
            to={'/forgot-password'}
            className='self-end text-sm font-semibold transition-all text-primary text-end hover:underline'
          >
            Forgot Password?
          </Link>

          <Button type='submit' className='hover:bg-secondary/95'>Sign In</Button>
        </form>
        <div className='flex gap-1 mx-auto max-w-96'>
          <span className='text-sm'>Dont have an account?</span>
          <Link to='/register' className='text-sm font-semibold transition-all text-primary hover:underline'>Create an account</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
