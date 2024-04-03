import Filter from '@/components/pages/app/Filter'
import Sidebar from '@/components/pages/app/Sidebar'
import TodoList from '@/components/pages/app/TodoList'

const MainAppPage = () => {
  return (
    <main className='flex w-full h-screen'>
      <Sidebar />
      <div className='flex flex-[8] flex-col gap-10 w-full h-full mx-[10%] py-10'>
        <Filter />
        <TodoList />
      </div>
    </main>
  )
}

export default MainAppPage;
