import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const todos = await prisma.todo.findMany()
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newTodo = await prisma.todo.create({
      data: { task: body.task },
    })
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const updated = await prisma.todo.update({
      where: { id: body.id },
      data: {
        is_complete: body.is_complete,
        task: body.task, // allow task editing
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}


export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    await prisma.todo.delete({
      where: { id: body.id },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}
