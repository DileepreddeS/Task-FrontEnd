"use client"
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, Button, CardActionArea, CardActions, IconButton, Snackbar, TextField } from '@mui/material';
import { MdClose, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { deleteTask, updateTask } from '@/app/services/task';

type Props = {
    title: string
    description: string
    taskId: string
    deleteOneTask: any
    setRefresh: any
}



const TaskCard = ({ title, description, taskId, deleteOneTask, setRefresh }: Props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [tempTitle, setTempTitle] = useState('')
    const [tempDescription, setTempDescription] = useState('')
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    useEffect(() => {
        setTempDescription(description)
        setTempTitle(title)
    }, [description, isEdit, title])



    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };

    return (
        <div>
            <Card sx={{ width: "40vh" }}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {!isEdit ? title : <TextField fullWidth value={isEdit ? tempTitle : title} onChange={(e) => { setTempTitle(e.target.value) }} variant='standard' />}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {!isEdit ? description : <TextField fullWidth variant='standard' value={isEdit ? tempDescription : description} onChange={(e) => { setTempDescription(e.target.value) }} multiline />}
                    </Typography>
                </CardContent>

                <CardActions className='flex justify-between'>
                    {!isEdit && <IconButton>
                        <MdDelete onClick={async () => {
                            setMessage('Task Deleted successfully.')
                            console.log("taskId", taskId);
                            const data = await deleteTask(taskId)
                            console.log('data-delete', data);
                            if (data?.status_code === 200) {
                                deleteOneTask(taskId)
                                setOpen(true)
                                setRefresh((val: boolean) => !val)
                            }
                        }} />
                    </IconButton>}
                    <IconButton onClick={async () => {
                        setMessage('Task Updated successfully')
                        const res = await updateTask(taskId, { title: tempTitle, description: tempDescription })
                        console.log('Java=>', res);
                        if (res?.status_code === 202) {
                            setIsEdit(!isEdit)
                            setRefresh((val: boolean) => !val)
                            setOpen(true)
                        }
                    }}>
                        {!isEdit ? <MdEdit /> : <MdSave />}
                    </IconButton>

                    {isEdit && <IconButton onClick={() => {
                        setIsEdit(!isEdit)
                    }}>
                        <MdClose />
                    </IconButton>}
                </CardActions>
            </Card>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Created Successfully"
            >
                <Alert severity="success">{message}</Alert>
            </Snackbar>
        </div>
    )
}

export default TaskCard