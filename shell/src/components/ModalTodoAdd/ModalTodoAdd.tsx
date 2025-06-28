import { Modal } from 'ui-kit/Modal'
import { useStore } from 'shared/store'
import { lazy, useCallback, type ActionDispatch, type ChangeEvent } from 'react'
import Button from 'ui-kit/Button'
import styles from './ModalTodoAdd.module.css'
const Input = lazy(() => import('ui-kit/Input'))

interface IProps {
    modalIsOpen: boolean
    dispathModalIsOpen: ActionDispatch<[]>
}

export const ModalTodoAdd = ({ dispathModalIsOpen, modalIsOpen }: IProps) => {
    const todoTitle = useStore(state => state.todoTitle)

    const setTodoTitle = useStore?.(state => state.setTodoTitle)
    const addTodo = useStore(state => state.addTodo)
    const clearTodoTitle = useStore(state => state.clearTodoTitle)

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const { value } = target
        setTodoTitle?.(value)
    }, [setTodoTitle])

    const handleAddTodo = useCallback(() => {
        addTodo()
        clearTodoTitle()
    }, [addTodo, clearTodoTitle])

    const handleCancel = useCallback(() => {
        clearTodoTitle()
        dispathModalIsOpen()
    }, [clearTodoTitle, dispathModalIsOpen])

    return (
        <Modal isOpen={modalIsOpen} onClose={dispathModalIsOpen}>
            <div className={styles.modalContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>NEW NOTE</h1>
                    <Input
                        withIcon={false}
                        placeholder="Input your note ..."
                        onChange={handleChange}
                        value={todoTitle}
                    />
                </div>
                <div className={styles.buttonsContainer}>
                    <Button className={styles.secondaryButton} onClick={handleCancel}>CANCEL</Button>
                    <Button className={styles.primaryButton} onClick={handleAddTodo}>APPLY</Button>
                </div>
            </div>
        </Modal>
    )
}
