"use client"

import React, { useState } from 'react'
import Button from '@/components/ui/Button';
import { RiExpandLeftRightFill } from "react-icons/ri";
import { Tag } from '@/models/Tag';

// const tags = [
//   {name: 'Home', icon: null},
//   {name: 'Completed', icon: null},
//   {name: 'Personal', icon: null},
//   {name: 'Work', icon: null},
//   {name: 'Diet', icon: '💪'},
//   {name: 'Reading', icon: '📚'},
//   {name: 'Road Trip', icon: '🚗'},
// ]

interface SidebarProps {
  tags?: Tag[];
  setSelectedTag: React.Dispatch<React.SetStateAction<Tag | undefined>>;
  selectedTag: Tag | undefined;
}

export const Sidebar: React.FC<SidebarProps> = ({ tags, setSelectedTag, selectedTag }) => {
  
  const [isCollapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className={`flex flex-col w-[20%] transition-all duration-500 ${isCollapsed ? '-translate-x-full -mr-[20%]' : ''}`}>
      <div className={`relative ml-2 my-2 px-4 py-8 rounded bg-white flex-1`}>
        <Button
          mode='icon'
          onClick={() => setCollapsed(!isCollapsed)}
          className='absolute -right-4 top-1/2'
        >
          <RiExpandLeftRightFill />
        </Button>
        
        {!false && <>
          <h3 className='text-xl font-semibold text-center text-secondary whitespace-nowrap'>
            Taskmaster Pro
          </h3>
            
          <ol className='flex flex-col gap-2 mt-4'>
            {tags?.map((tag, i) => (
              <li
                key={i}
                onClick={() => setSelectedTag?.(tag)}
                className={`flex gap-4 items-center ${selectedTag === tag ? 'bg-neutral-300' : 'hover:bg-neutral-200'} p-2 rounded cursor-pointer transition-all`}
              >
                <span>
                  {tag.icon ?? <input type='checkbox' checked={selectedTag === tag} />}
                </span>
                <span className='flex-1'>{tag.name}</span>
                <div className='flex items-center px-2 py-1 text-xs rounded-full bg-neutral-200 text-neutral-700'>{tag.count}</div>
              </li>
            ))}
          </ol>
        </>}
      </div>
    </div>
  )
}

export default Sidebar;
