"use client"
import TaskCard from '@/components/TaskCard'
import { useEffect, useState } from 'react'
import { getAllTasks } from './services/task'
import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
import TaskForm from '@/components/TaskForm'

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([])
  const [refesh, setRefresh] = useState(true)
  const fetchTasks = async () => {
    const data = await getAllTasks()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [refesh])

  useEffect(() => {
    fetchTasks()
  }, [])

  const deleteOneTask = (id: string) => {
    setTasks(tasks.filter(task => task.task_id !== id))
  }

  const addTask = (newTask: any) => {
    setTasks([...tasks, newTask])
  }

  return (
    <main className='m-4'>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={6} className='mt-2'>

        <Grid item xs={12} className='flex justify-center'>
          <TaskForm addTask={addTask} setRefresh={setRefresh} />
        </Grid>

        {tasks?.slice().reverse().map((task: any, index: number) =>
          <Grid item key={index} xs={12} sm={6} md={4} className='flex justify-center items-center'>
            <TaskCard title={task.title} description={task.description} taskId={task.task_id} deleteOneTask={deleteOneTask} setRefresh={setRefresh}/>
          </Grid>
        )}
      </Grid>
    </main>
  )
}
