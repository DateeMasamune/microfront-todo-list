import { memo, type InputHTMLAttributes } from 'react'
import styles from './Input.module.css'
import { SearchIcon } from './SearchIcon'
import clsx from 'clsx'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    withIcon?: boolean
}

const Input = memo(({ name = "input", placeholder = "Search note...", className, withIcon = true, ...rest }: IProps) => {
    return (
        <div className={clsx(styles.container, className)}>
            <input {...rest} className={styles.input} name={name} placeholder={placeholder} />
            {withIcon && <SearchIcon className={styles.icon} />}
        </div>
    )
})

export default Input
