import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState('');

  function handleAddTask(newTaskTitle: string) {
    const editTask = tasks.find(item => item.title === newTaskTitle)

    if (editTask) {
      Alert.alert(
        'Task já cadastrada!',
        'Você não pode cadastrar uma task com o mesmo nome.'
      )
      return
    }

    const taskData = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(tasks => [...tasks, taskData])
    setTask(task)
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskDone = updatedTasks.find(item => item.id === id)
    if (taskDone === undefined) {
      return
    }

    taskDone.done = !taskDone.done

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item!', 
      'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        style: 'cancel',
        onPress: () => updatedTasks()
      }
    ])

    function updatedTasks() {
      const item = tasks.filter(item => item.id !== id)
      setTasks(item)      
    }
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})