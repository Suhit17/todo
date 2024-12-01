"use client"

import { useState } from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Minimalist Todo</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow"
        />
        <Button onClick={addTodo}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-50 p-2 rounded"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                {todo.text}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

