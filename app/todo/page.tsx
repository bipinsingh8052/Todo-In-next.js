"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { columns } from "../components/ui/columns"
import { DataTable } from "../components/ui/DataTable"

interface Todo {
  id: string
  task: string
  is_complete: boolean
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTask, setNewTask] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await axios.get("/api/todo")
    setTodos(res.data)
  }

  const handleSubmit = async () => {
    if (!newTask.trim()) return
    if (editId) {
      await axios.patch("/api/todo", {
        id: editId,
        task: newTask,
        is_complete: false,
      })
      setEditId(null)
    } else {
      await axios.post("/api/todo", { task: newTask })
    }
    setNewTask("")
    fetchTodos()
  }

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List (with DataTable)</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex gap-2 mb-4"
      >
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter task"
        />
        <button
          type="submit"
          className={`${
            editId ? "bg-yellow-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* 🔍 Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="mb-4 p-2 border rounded w-full"
      />

    <div className="rounded-md border bg-black text-white">
  <DataTable columns={columns({ setEditId, setNewTask })} data={filteredTodos} />
</div>

    </main>
  )
}
