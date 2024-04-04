import Filter from '@/components/pages/app/Filter'
import Sidebar from '@/components/pages/app/Sidebar'
import TodoList from '@/components/pages/app/TodoList'
import { API } from '@/config/axios'
import { Tag } from '@/models/Tag'
import { useEffect, useState } from 'react'

const MainAppPage = () => {
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await API.get<Tag[]>('/tag')
        setAllTags(data);
      } catch (e) {
        // console.log('e: ', e);
      }
    }
    const getAllTasks = async () => {}
    
    Promise.all([getTags(), getAllTasks()]);
  }, []);

  return (
    <main className='flex w-full h-screen'>
      <Sidebar tags={allTags} />
      <div className='flex flex-[8] flex-col gap-10 w-full h-full mx-[10%] py-10'>
        <Filter />
        <TodoList allTags={allTags} />
      </div>
    </main>
  )
}

export default MainAppPage;
