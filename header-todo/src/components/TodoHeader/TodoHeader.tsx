import { lazy, useCallback, type ChangeEvent } from "react"
const Input = lazy(() => import("ui-kit/Input"))
const Button = lazy(() => import('ui-kit/Button'))
import { debounce } from 'throttle-debounce';
import { useStore } from 'shared/store'
import styles from './TodoHeader.module.css'

const dropListForButton = [
    {
        displayName: 'All',
        value: 'all'
    },
    {
        displayName: 'Complete',
        value: 'complete'
    },
    {
        displayName: 'Incomplete',
        value: 'incomplete'
    },
]

const TodoHeader = () => {
    const filteredTodosStatus = useStore(state => state.filteredTodosStatus)
    const filterdTodosName = useStore(state => state.filterdTodosName)
    const debounceFilteredTodosName = debounce(200, (value: string | undefined) => filterdTodosName(value))

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } = {} } = event
        debounceFilteredTodosName(value)
    }, [debounceFilteredTodosName])

    return (
        <div>
            <h1 className={styles.title}>TODO LIST</h1>
            <div className={styles.container}>
                <Input className={styles.input} onChange={handleChange} />
                <Button variant="dropdown" dropList={dropListForButton} filteredList={filteredTodosStatus} >
                    {dropListForButton[0].displayName}
                </Button>
                <Button variant="theme" />
            </div>

        </div>
    )
}

export default TodoHeader
