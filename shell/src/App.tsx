import { lazy, Suspense, useMemo, useReducer, useState } from 'react'
import styles from './App.module.css'
import { ThemeContext } from 'shared/context'
import { themeValues, colorsValue } from 'shared/constants'
import { useStore } from 'shared/store'
import { ModalTodoAdd } from './components/ModalTodoAdd'
import { EmptyState } from './components/EmptyState'

const Button = lazy(() => import('ui-kit/Button'))
const TodoHeader = lazy(() => import('header-todo/components/TodoHeader'))
const TodoRow = lazy(() => import('row-todo/components/TodoRow'))

function App() {
  const [theme, setTheme] = useState(themeValues?.light)
  const [modalIsOpen, dispathModalIsOpen] = useReducer(prev => !prev, false)

  const todos = useStore(state => state.todos)

  const deleteTodo = useStore(state => state.deleteTodo)

  const handleChangeTheme = (theme: string) => {
    setTheme(theme)
    if (theme === themeValues.dark) {
      document.documentElement.style.setProperty('--white', colorsValue.nero)
      document.documentElement.style.setProperty('--black', colorsValue.white)
    } else {
      document.documentElement.style.setProperty('--white', colorsValue.white)
      document.documentElement.style.setProperty('--black', colorsValue.black)
    }
  }

  const themeContextValues = useMemo(() => ({
    theme,
    handleChangeTheme
  }), [theme])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <ThemeContext value={themeContextValues}>
      <div className={styles.container}>
        <Suspense fallback="loading header...">
          <TodoHeader />
        </Suspense>
        <Suspense fallback="loading row...">
          {todos.length > 0
            ? todos.map(({ title, id, status }) =>
              <TodoRow
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                id={id}
                key={id}
                title={title}
                remove={() => deleteTodo(id)}
                status={status}
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
