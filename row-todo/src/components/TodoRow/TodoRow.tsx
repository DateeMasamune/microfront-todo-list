import { lazy, memo, useCallback, useReducer, useState, type ChangeEvent } from 'react'
import { useStore } from 'shared/store'
import { todoStatus } from 'shared/constants'

const Checkbox = lazy(() => import('ui-kit/Checkbox'))
const Button = lazy(() => import('ui-kit/Button'))
const Input = lazy(() => import('ui-kit/Input'))

import styles from './TodoRow.module.css'
import type { ITodos } from 'shared/store/store'
import clsx from 'clsx'

interface IProps extends ITodos {
    remove: (id: number) => void
}

const TodoRow = memo(({ title, remove, id, status }: IProps) => {
    const [checked, setChecked] = useState(status === todoStatus.complete)
    const [changeTitle, dispatchChangeTitle] = useReducer((prev) => !prev, false)

    const changeTodo = useStore(state => state.changeTodo)

    const handleChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const { value } = target

        changeTodo(id, {
            id,
            status,
            title: value,
        })
    }, [id, status, changeTodo])

    const handleCompleteTodo = useCallback(() => {
        setChecked(prev => !prev)
        changeTodo(id, {
            id,
            status: status === todoStatus.complete ? todoStatus.incomplete : todoStatus.complete,
            title
        })
    }, [id, status, title, changeTodo])

    return <div className={styles.container}>
        <Checkbox name='checkbox-row' onChange={handleCompleteTodo} checked={checked} />
        {changeTitle
            ? <Input
                withIcon={false}
                className={styles.input}
                placeholder={""}
                value={title}
                onChange={handleChangeText}
                onBlur={dispatchChangeTitle}
            />
            : <p className={clsx(styles.name, {
                [styles.textThrough]: checked
            })}>{title}</p>}
        <Button variant="change" className={styles.button} onClick={dispatchChangeTitle} />
        <Button variant="remove" className={styles.button} onClick={() => remove(id)} />
    </div>
})

export default TodoRow
