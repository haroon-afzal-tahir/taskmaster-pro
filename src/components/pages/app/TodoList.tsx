import React, { useEffect, useState } from 'react'
import NewTaskAdder from './NewTaskAdder'
import Button from '@/components/ui/Button';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@mui/material';
import { Task } from '@/models/Task';
import { API } from '@/config/axios';
import { Tag } from '@/models/Tag';

interface TodoListProps {
  allTags: Tag[];
  selectedTag?: Tag;
}

export const TodoList: React.FC<TodoListProps> = ({ allTags, selectedTag }) => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, task: Task) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTask(task);
  }
  const closeMenu = () => setMenuAnchor(null);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);
  
  // const [editModal, setEditModal] = useState<boolean>(false);
  // const openEditModal = () => setEditModal(true);
  // const closeEditModal = () => setEditModal(false);

  const onTaskDelete = () => {
    // del
    selectedTask
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const url = selectedTag ? `/task?tagId=${selectedTag._id}` : '/task';
        const res = await API.get(url)
        setTasks(res.data);
      } catch (e) {
        // console.log('e: ', e);
      }
    }

    getTasks();
  }, [selectedTag])

  return (
    <div>
      <ol className='flex flex-col gap-2'>
        {tasks.map((task, i) => (
          <li key={i} className='flex items-center gap-4 px-4 py-2 bg-white rounded'>
            <input type='checkbox' checked={task.completed} />
            <span className='flex-1'>{task.title}</span>
            <Button onClick={e => openMenu(e, task)} mode='icon' variant='default' className='rounded bg-neutral-200'>
              <HiOutlineDotsVertical />
            </Button>
          </li>
        ))}
      </ol>

      <NewTaskAdder allTags={allTags} />

      {/* Dialogs */}
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={closeMenu}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem className='!text-red-500' onClick={openDeleteModal}>Delete</MenuItem>
      </Menu>

      <Dialog open={deleteModal} onClose={closeDeleteModal}>
        <DialogTitle>Delete Task?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Any Task deleted cannot be recovered again. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='default' autoFocus onClick={closeDeleteModal}>Cancel</Button>
          <Button variant='default' onClick={onTaskDelete} className='!text-red-500'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default TodoList
