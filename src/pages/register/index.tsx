import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import TodoCompletedTasks from '@/components/icons/TodoCompletedTasks'
import { APP_HEADLINE, APP_TITLE } from '@/constants/app'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { API } from '@/config/axios'
import { CookieHelper } from '@/utils/cookie'
import toast from "react-hot-toast"
import { AxiosError } from 'axios'

interface InputField {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [input, setInput] = useState<InputField>({ name: '', username: '', email: '', password: '', confirmPassword: '' })
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!input.name || !input.username || !input.email || !input.password || !input.confirmPassword) return alert('Please fill in all fields');
      if (input.password !== input.confirmPassword) return alert('Passwords do not match');
      if (input.password.length < 8) return alert('Password must be at least 8 characters');

      const { data } = await API.post('/auth/register', input);
      CookieHelper.setCookie('token', data.token, 1);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      if ((error as AxiosError).response) {
        const errorMessage = (error as AxiosError<{ message: string }>).response?.data?.message || 'An error occurred. Please try again later.';
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }

  const handleInputUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='flex w-full h-screen px-4 md:px-0'>
      <div className='flex flex-col items-center justify-center w-full gap-4'>
        <h1 className='text-xl font-bold'>Register</h1>
        <form onSubmit={handleRegister} className='flex flex-col items-center justify-center w-full gap-4 max-w-96'>
          <Input id='name' name='name' label='Name' required value={input.name} onChange={handleInputUpdate}/>
          <Input id='username' name='username' label='Username' required value={input.username} onChange={handleInputUpdate} />
          <Input id='email' name='email' label='Email' type='email' required value={input.email} onChange={handleInputUpdate} />
          <Input id='password' name='password' label='Password' required type='password' value={input.password} onChange={handleInputUpdate} />
          <Input id='confirmPassword' name='confirmPassword' required label='Confirm Password' type='password' value={input.confirmPassword} onChange={handleInputUpdate} />

          <Button type='submit' className='hover:bg-secondary/95'>Sign Up</Button>
        </form>

        <div className='flex gap-1 mx-auto max-w-96'>
          <span className='text-sm'>Already have an account?</span>
          <Link to='/login' className='text-sm font-semibold transition-all text-primary hover:underline'>Login</Link>
        </div>
      </div>
      <div className='flex-col items-center justify-center hidden w-full bg-primaryLight md:flex'>
        <TodoCompletedTasks className='w-96 h-96'/>
        <div className='flex flex-col items-center gap-4 max-w-96'>
          <h1 className='text-2xl font-bold text-center text-secondary'>{APP_TITLE}</h1>
          <p className='text-sm text-center text-secondary'>{APP_HEADLINE}</p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
