import { ColumnDef } from "@tanstack/react-table"

interface Todo {
  id: string
  task: string
  is_complete: boolean
}

export const columns = ({
  setEditId,
  setNewTask,
}: {
  setEditId: (id: string) => void
  setNewTask: (task: string) => void
}): ColumnDef<Todo>[] => [
  {
    accessorKey: "task",
    header: "Task",
    enableSorting: true,
    cell: ({ row }) => (
      <span className={row.original.is_complete ? "line-through text-gray-400" : ""}>
        {row.original.task}
      </span>
    ),
  },
  {
    accessorKey: "is_complete",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => (row.original.is_complete ? "✅ Done" : "⏳ Pending"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded"
          onClick={() => {
            setEditId(row.original.id)
            setNewTask(row.original.task)
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={async () => {
            await fetch("/api/todo", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: row.original.id }),
            })
            location.reload()
          }}
        >
          Delete
        </button>
      </div>
    ),
  },
]