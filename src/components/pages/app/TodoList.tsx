import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/Button';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, Menu, MenuItem, Select, Switch, TextField } from '@mui/material';
import { Task } from '@/models/Task';
import { API } from '@/config/axios';
import { Tag } from '@/models/Tag';
import toast from 'react-hot-toast';
import { DateHelper } from '@/utils/date';

interface TodoListProps {
  allTags: Tag[];
  selectedTag?: Tag;
  isUpdated?: boolean;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoList: React.FC<TodoListProps> = ({ allTags, selectedTag, setIsDeleted, isUpdated }) => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [editSelectedTask, setEditSelectedTask] = useState<Task | undefined>(undefined);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, task: Task) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTask(task);
    setEditSelectedTask(task);
  }
  const closeMenu = () => setMenuAnchor(null);

  const [selectedTask, setSelectedTask] = useState<Task>();
  
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const openDeleteModal = () => {setDeleteModal(true); closeMenu();};
  const closeDeleteModal = () => setDeleteModal(false);
  
  const [editModal, setEditModal] = useState<boolean>(false);
  const openEditModal = () => {setEditModal(true); closeMenu()};
  const closeEditModal = () => setEditModal(false);
  const closeEditModalForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditModal(false);
    closeMenu();
  };

  const onTaskDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const { data } = await API.delete(`/task/${selectedTask?._id}`);
      setTasks(tasks.filter(task => task._id !== selectedTask?._id));
      closeDeleteModal();

      toast.success(data.message);
      setIsDeleted(flag => !flag);
      closeMenu();
    } catch (error) { 
      // 
    }
  }

  const onTaskUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await API.patch(`/task/${editSelectedTask?._id}`, {
        title: editSelectedTask?.title,
        tag: editSelectedTask?.tag?._id,
        completed: editSelectedTask?.completed
      });
      setTasks(tasks.map(task => task._id === editSelectedTask?._id ? editSelectedTask : task));

      closeEditModal();

      toast.success(data.message);

      closeMenu();
    } catch (error) {
      // 
    }
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
  }, [selectedTag, isUpdated])

  return (
    <div>
      <ol className='flex flex-col gap-2'>
        {tasks.map((task, i) => (
          <li key={i} className='flex flex-col items-center gap-4 px-4 py-2 bg-white rounded md:flex-row'>
            <span className='flex-1 text-sm truncate'>{task.title}</span>
            <div className='flex items-center justify-between w-full gap-4 md:w-fit'>
              <span className={`px-2 py-1 text-xs rounded-full ${task.completed ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
              {task.tag && (
                <span className='flex items-center px-2 py-1 text-xs rounded-full bg-neutral-200 text-neutral-700'>
                  {task.tag.icon && <span className='mr-1'>{task.tag.icon}</span>}
                  {task.tag.name}
                </span>
              )}
              <span className='text-xs font-medium text-secondary'>{DateHelper.getFormattedDate(new Date(task.dueDate))}</span>
              <Button onClick={e => openMenu(e, task)} mode='icon' variant='default' className='rounded bg-neutral-200'>
                <HiOutlineDotsVertical />
              </Button>
            </div>
          </li>
        ))}
      </ol>


      {/* Dialogs */}
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={closeMenu}
      >
        <MenuItem className='!text-sm' onClick={openEditModal}>Edit</MenuItem>
        <MenuItem className='!text-red-500 !text-sm' onClick={openDeleteModal}>Delete</MenuItem>
        {/* <MenuItem className='' onClick={openCompletedModal}>Mark as Completed</MenuItem> */}
      </Menu>

      <Dialog open={deleteModal} onClose={closeDeleteModal}>
        <DialogTitle>Delete {selectedTask?.title}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedTask?.title} deleted cannot be recovered again. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='default' autoFocus onClick={closeDeleteModal}>Cancel</Button>
          <Button variant='default' onClick={onTaskDelete} className='!text-red-500'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editModal} onClose={closeEditModal} maxWidth={'sm'} fullWidth>
        <DialogTitle>Edit {selectedTask?.title}</DialogTitle>
        <form onSubmit={onTaskUpdate}>
          <DialogContent className='flex flex-col gap-4'>
            {editSelectedTask && (
              <>
                <DialogContentText>
                  Edit the task details below.
                </DialogContentText>
                <TextField
                  required
                  label="Title"
                  value={editSelectedTask.title}
                  onChange={e => setEditSelectedTask({ ...editSelectedTask, title: e.target.value })}
                />
                <FormControl fullWidth>
                  <InputLabel id="edit-task-tag">Tag</InputLabel>
                  <Select
                    required
                    label='Tag'
                    labelId="edit-task-tag"
                    value={editSelectedTask.tag?._id}
                    onChange={(e) => setEditSelectedTask({ ...editSelectedTask, tag: allTags.find(tag => tag._id === e.target.value) })}
                  >
                    {allTags.map((tag, i) => (
                      <MenuItem key={i} value={tag._id}>{tag.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch 
                      checked={editSelectedTask.completed}
                      onChange={e => setEditSelectedTask({ ...editSelectedTask, completed: e.target.checked })}
                    />}
                    label="Completed"
                  />
                </FormGroup>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant='default' type='button' autoFocus onClick={closeEditModalForm}>Cancel</Button>
            <Button variant='default' type='submit' className='!text-red-500'>
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default TodoList
