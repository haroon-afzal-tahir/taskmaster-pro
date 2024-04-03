import React, { useEffect, useState } from 'react'
import NewTaskAdder from './NewTaskAdder'
import Button from '@/components/ui/Button';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@mui/material';
import { Task } from '@/models/Task';
import axios from 'axios';

export const TodoList: React.FC = () => {

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
        const res = await axios.get('http://192.168.18.129:5000/task', { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhhcm9vbnRhaGlycjEwMEBnbWFpbC5jb20iLCJuYW1lIjoiSGFyb29uIFRhaGlyIiwidXNlcm5hbWUiOiJoYXJvb250YWhpcnIxMDAiLCJpZCI6IjY2MGRkNjUyZDAxZTBmZTQ5ZjI1ZmQzNyIsImlhdCI6MTcxMjE4Mjg2NiwiZXhwIjoxNzEyMjY5MjY2fQ.VNpiVbLMrwg33QUPsGP01PzUDJj4rFL7kpQeAIYtgHI' } })
        console.log('res: ', res);
        setTasks(res.data);
      } catch (e) {
        console.log('e: ', e);
      }
    }

    getTasks();
  }, [])

  return (
    <div>
      <ol className='flex flex-col gap-2'>
        {tasks.map((task, i) => (
          <li key={i} className='flex items-center gap-4 bg-white rounded px-4 py-2'>
            <input type='checkbox' checked={task.completed} />
            <span className='flex-1'>{task.title}</span>
            <Button onClick={e => openMenu(e, task)} mode='icon' variant='default' className='bg-neutral-200 rounded'>
              <HiOutlineDotsVertical />
            </Button>
          </li>
        ))}
      </ol>

      <NewTaskAdder />

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
