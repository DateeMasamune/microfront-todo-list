import { createPortal } from "react-dom"
import { memo, type ReactNode } from "react"
import styles from './Modal.module.css'

interface IProps {
    isOpen?: boolean
    onClose?: () => void
    children?: ReactNode
}

const Modal = memo(({ children, isOpen, onClose }: IProps) => {
    return (
        isOpen &&
        <>
            {createPortal(
                children,
                document.body
            )}
            {createPortal(<div className={styles.overlay} onClick={onClose} />, document.body)}
        </>
    )
})

export default Modal
