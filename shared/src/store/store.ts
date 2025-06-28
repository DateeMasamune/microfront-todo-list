import { create } from "zustand";
import { todoStatus } from "../constants";

export interface ITodos {
    id: number,
    title: string
    status: keyof typeof todoStatus
}

type State = {
    todos: ITodos[]
    todoTitle: string
    allTodos: ITodos[]
}

type Action = {
    addTodo: () => void
    deleteTodo: (id: number) => void
    changeTodo: (id: number, updateTodo: ITodos) => void
    setTodoTitle: (title: string) => void
    clearTodoTitle: () => void
    getTodo: (id: number) => ITodos
    filteredTodosStatus: (statusTodo: string) => void
    filterdTodosName: (name: string | undefined) => void
}

const useStore = create<State & Action>((set, get) => ({
    todoTitle: "",
    todos: [],
    allTodos: [],
    clearTodoTitle: () => set(({ todoTitle: "" })),
    setTodoTitle: (title: string) => set(({ todoTitle: title })),
    addTodo: () => set(state => {
        const updateTodos = state.todoTitle === ""
            ? [...state.todos]
            : [...state.todos, {
                id: Date.now(),
                title: state.todoTitle,
                status: todoStatus.incomplete
            }]
        return ({
            todos: updateTodos,
            allTodos: updateTodos
        })
    }),
    deleteTodo: (id: number) => set(state => {
        const updateTodos = state.todos.filter(({ id: todoId }) => todoId !== id)
        return ({
            todos: updateTodos,
            allTodos: updateTodos
        })
    }),
    changeTodo: (id: number, updateTodo: ITodos) => set(state => {
        const updateTodos = state.todos.map((todo) => {
            if (todo.id === id) {
                return updateTodo
            }
            return todo
        })

        return ({
            todos: updateTodos,
            allTodos: updateTodos
        })
    }),
    getTodo: (id: number) => get().todos.find(({ id: todoId }) => id === todoId)!,
    filteredTodosStatus: (statusTodo: string) =>
        set(state => {
            const filterTodos = statusTodo.toLocaleLowerCase() === todoStatus.all.toLocaleLowerCase()
                ? state.allTodos
                : state.allTodos.filter(({ status }) => status.toLocaleLowerCase() === statusTodo.toLocaleLowerCase())
            return ({
                todos: filterTodos
            })
        }),
    filterdTodosName: (name) => set(state => ({
        todos: state.allTodos.filter(({ title }) => title.toLocaleLowerCase().trim().includes((name as string)?.toLocaleLowerCase().trim()))
    }))
}))

export default useStore
