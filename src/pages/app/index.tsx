import Filter from '@/components/pages/app/Filter'
import NewTaskAdder from '@/components/pages/app/NewTaskAdder'
import Sidebar from '@/components/pages/app/Sidebar'
import TodoList from '@/components/pages/app/TodoList'
import { API } from '@/config/axios'
import { Tag } from '@/models/Tag'
import { useEffect, useState } from 'react'

const MainAppPage = () => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [isCreatedOrDeleted, setIsCreatedOrDeleted] = useState<boolean>(false);


  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await API.get<Tag[]>('/tag')
        setAllTags(data);
      } catch (e) {
        // console.log('e: ', e);
      }
    }
    
    getTags();
  }, [isCreatedOrDeleted]);

  return (
    <main className='flex w-full h-screen'>
      <Sidebar tags={allTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <div className='flex md:flex-[8] flex-col gap-10 w-full h-full md:mx-[10%] mx-[5%] py-10'>
        <Filter />
        <TodoList allTags={allTags} selectedTag={selectedTag} setIsDeleted={setIsCreatedOrDeleted} isUpdated={isCreatedOrDeleted} />
      </div>
      <NewTaskAdder allTags={allTags} setIsCreated={setIsCreatedOrDeleted} />
    </main>
  )
}

export default MainAppPage;
