'use client'

import { useState, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, Check } from 'lucide-react'

interface Todo {
  id: number
  text: string
  isEditing: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [editText, setEditText] = useState('')

  const addTodo = useCallback(() => {
    if (newTodo.trim() !== '') {
      setTodos(prevTodos => [...prevTodos, { id: Date.now(), text: newTodo, isEditing: false }])
      setNewTodo('')
    }
  }, [newTodo])

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }, [])

  const startEditing = useCallback((id: number, text: string) => {
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === id ? { ...todo, isEditing: true } : todo
    ))
    setEditText(text)
  }, [])

  const saveEdit = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === id ? { ...todo, text: editText, isEditing: false } : todo
    ))
    setEditText('')
  }, [editText])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="flex mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            className="mr-2"
          />
          <Button onClick={addTodo}>Add Todo</Button>
        </div>

        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center bg-card p-2 rounded">
              {todo.isEditing ? (
                <>
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="mr-2 flex-grow"
                  />
                  <Button onClick={() => saveEdit(todo.id)} size="icon">
                    <Check className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-grow">{todo.text}</span>
                  <Button onClick={() => startEditing(todo.id, todo.text)} size="icon" variant="ghost" className="mr-2">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => deleteTodo(todo.id)} size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-muted text-muted-foreground p-4 text-center">
        <p>&copy; 2023 Todo List App. All rights reserved.</p>
      </footer>
    </div>
  )
}

