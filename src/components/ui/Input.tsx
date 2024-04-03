import { cn } from '@/utils/tailwind';
import React from 'react'

interface InputProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'placeholder'> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ className, label, type, ...props }) => {
  return (
    <div className='flex items-start flex-col gap-2 w-full'>
      <span className='text-sm font-semibold text-[#707070]'>{label}</span>
      <input type={type || 'text'} className={cn('w-full p-2 border text-sm border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#63CB21] transition-all', className)} {...props} />
    </div>
  )
}

export default Input
