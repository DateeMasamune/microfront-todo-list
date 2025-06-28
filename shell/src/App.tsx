import { lazy, Suspense, useCallback, useReducer } from 'react'
import styles from './App.module.css'
import { useStore } from 'shared/store'
import { ModalTodoAdd } from './components/ModalTodoAdd'
import { EmptyState } from './components/EmptyState'
import { ThemeContext } from './components/ThemeContext'

const Button = lazy(() => import('ui-kit/Button'))
const TodoHeader = lazy(() => import('header-todo/components/TodoHeader'))
const TodoRow = lazy(() => import('row-todo/components/TodoRow'))

function App() {
  const [modalIsOpen, dispathModalIsOpen] = useReducer(prev => !prev, false)

  const todos = useStore(state => state.todos)

  const deleteTodo = useStore(state => state.deleteTodo)
  const handleDeleteTodo = useCallback((id: number) => {
    deleteTodo(id)
  }, [deleteTodo])

  return (
    <ThemeContext >
      <div className={styles.container}>
        <Suspense fallback="loading header...">
          <TodoHeader />
        </Suspense>
        <Suspense fallback="loading row...">
          {todos.length > 0
            ? todos.map(({ title, id, status }) =>
              <TodoRow
                id={id}
                key={id}
                title={title}
                status={status}
                remove={handleDeleteTodo}
              />)
            : <EmptyState className={styles.emptyState} />}
        </Suspense>
        <Button variant="add" className={styles.addButton} onClick={dispathModalIsOpen} />
      </div>
      <ModalTodoAdd modalIsOpen={modalIsOpen} dispathModalIsOpen={dispathModalIsOpen} />
    </ThemeContext>

  )
}

export default App
