"use client"
import { DateHelper } from '@/utils/date';
import React, { useState } from 'react'
import Button from '@/components/ui/Button';
import { IoIosArrowDown } from "react-icons/io";

// import { Dropdown } from '@mui/base/Dropdown';
// import { Menu } from '@mui/base/Menu';
// import { AnimatedListbox, MenuButton, MenuItem } from '../../ui/Dropdown';

export const Filter: React.FC = () => {
  const [filter,] = useState<{ label: string; value: Date }[]>([
    { label: 'Today', value: new Date(), },
    { label: 'Yesterday', value: new Date(new Date().setDate(new Date().getDate() - 1)), },
    { label: 'Last 7 days', value: new Date(new Date().setDate(new Date().getDate() - 7)), },
    { label: 'Last 30 days', value: new Date(new Date().setDate(new Date().getDate() - 30)), },
    { label: 'This month', value: new Date(new Date().getFullYear(), new Date().getMonth(), 1), },
    { label: 'Last month', value: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), },
  ]);

  const [selectedFilter,] = useState<{ label: string; value: Date }>(filter[0]);

  // const createHandleMenuClick = (prop: { label: string; value: Date }) => () => {
  //   console.log(prop);
  // };

  return (
    <div className='flex w-full justify-between'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold'>Good Morning, User! 👋</h1>
        <span className='text-secondary text-sm'>{selectedFilter.label}, {DateHelper.getFormattedDate(selectedFilter.value)}</span>
      </div>

      <Button variant='default' className='w-fit flex items-center gap-2 text-secondary'>
        <div className='bg-[#F5F5F5] rounded p-2'>
          <IoIosArrowDown className='text-black' />
        </div>
        {selectedFilter.label}
      </Button>
    </div>
  )
}

export default Filter
