"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import Button from '@/components/ui/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { Tag } from '@/models/Tag';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<unknown, string> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewTaskAdder = () => {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = React.useState<string>('');
  const [dueDate, setDueDate] = React.useState<Date | null>(null);
  const [selectedTagId, setSelectedTagId] = React.useState<string>('');
  const [allTags, setAllTags] = React.useState<Tag[]>([]);

  const onTaskAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://192.168.18.129:5000/task', {
        title, dueDate, tag: selectedTagId
      }, { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhhcm9vbnRhaGlycjEwMEBnbWFpbC5jb20iLCJuYW1lIjoiSGFyb29uIFRhaGlyIiwidXNlcm5hbWUiOiJoYXJvb250YWhpcnIxMDAiLCJpZCI6IjY2MGRkNjUyZDAxZTBmZTQ5ZjI1ZmQzNyIsImlhdCI6MTcxMjE4Mjg2NiwiZXhwIjoxNzEyMjY5MjY2fQ.VNpiVbLMrwg33QUPsGP01PzUDJj4rFL7kpQeAIYtgHI' } })
      console.log('res: ', res);
      onClose();
    } catch (e) {
      console.log('e: ', e);
    }
  }

  const onClose = () => {
    setDueDate(null);
    setTitle('');
    setSelectedTagId('');
    setOpen(false);
  }

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get('http://192.168.18.129:5000/tag', { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhhcm9vbnRhaGlycjEwMEBnbWFpbC5jb20iLCJuYW1lIjoiSGFyb29uIFRhaGlyIiwidXNlcm5hbWUiOiJoYXJvb250YWhpcnIxMDAiLCJpZCI6IjY2MGRkNjUyZDAxZTBmZTQ5ZjI1ZmQzNyIsImlhdCI6MTcxMjE4Mjg2NiwiZXhwIjoxNzEyMjY5MjY2fQ.VNpiVbLMrwg33QUPsGP01PzUDJj4rFL7kpQeAIYtgHI' } })
        console.log('res: ', res);
        setAllTags(res.data);
      } catch (e) {
        console.log('e: ', e);
      }
    }

    getTags();
  }, [])

  return (<>
    <Button
      className='fixed bottom-10 left-1/2 w-auto rounded-full flex gap-2 items-center px-4 py-2'
      onClick={() => setOpen(true)}
    >
      <IoIosAdd size={16} />
      <span>Create New Task</span>
    </Button>

    <Dialog
      maxWidth='sm'
      fullWidth
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <DialogTitle>Create New Task</DialogTitle>
      <form onSubmit={onTaskAdd}>
        <DialogContent className='flex flex-col gap-4'>
          <TextField
            required
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="add-task-tag">Tag</InputLabel>
            <Select
              required
              label='Tag'
              labelId="add-task-tag"
              value={selectedTagId}
              onChange={(e) => setSelectedTagId(e.target.value)}
            >
              {allTags.map((tag) => (
                <MenuItem value={tag._id}>{tag.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <DateTimePicker
            value={dueDate}
            onChange={date => setDueDate(date)}
            label="Due Date"
          />
        </DialogContent>

        <DialogActions>
          <Button type='button' onClick={onClose}>Close</Button>
          <Button type='submit'>Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  </>);
}

export default NewTaskAdder;
