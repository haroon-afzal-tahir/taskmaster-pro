import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import TodoCompletedTasks from '@/components/icons/TodoCompletedTasks'
import { APP_HEADLINE, APP_TITLE } from '@/constants/app'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className='flex w-full h-screen px-4 md:px-0'>
      <div className='flex flex-col items-center justify-center w-full gap-4'>
        <h1 className='text-xl font-bold'>Register</h1>
        <div className='flex flex-col items-center justify-center w-full gap-4 max-w-96'>
          <Input label='Name' />
          <Input label='Username' />
          <Input label='Email' type='email' />
          <Input label='Password' type='password' />
          <Input label='Confirm Password' type='password' />

          <Button className='hover:bg-secondary/95'>Sign Up</Button>
        </div>
        <div className='flex items-center w-full gap-4 mx-auto max-w-96'>
          <span className='w-full border-b border-gray-300'></span>
          <span className='text-xs text-gray-500'>OR</span>
          <span className='w-full border-b border-gray-300'></span>
        </div>

        <Button className='flex items-center justify-center w-full gap-4 mx-auto font-semibold bg-primary/50 hover:bg-primary/60 text-secondary max-w-96'>
          <FcGoogle className='text-lg'/>
          Sign Up with Google
        </Button>

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
