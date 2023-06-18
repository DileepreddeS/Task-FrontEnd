import { createTask } from '@/app/services/task'
import { Alert, Button, Card, FormLabel, IconButton, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

type Props = { addTask: any; setRefresh: any }

const TaskForm = ({ addTask, setRefresh }: Props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };

    const resetForm = () => {
        setTitle('')
        setDescription('')
    }

    const handleAddTask = () => {
        if (!title && !description) {
            return
        }
        if (title && description) {
            createTask({ title, description })
            handleClick()
            resetForm()
            setRefresh((data: boolean) => !data)
        }
    }

    return (
        <Card variant='outlined' className='max-w-xl space-y-3 p-4'>
            <FormLabel>TASK</FormLabel>
            <TextField fullWidth id="task-title" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField fullWidth multiline rows={4} id="task-description" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button variant='outlined' onClick={handleAddTask}>Create</Button>

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Created Successfully"
            >
                <Alert severity="success">Task added Successfully</Alert>
            </Snackbar>
        </Card>
    )
}

export default TaskForm