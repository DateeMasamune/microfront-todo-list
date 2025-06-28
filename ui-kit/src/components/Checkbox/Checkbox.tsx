import { memo, type InputHTMLAttributes } from "react"
import styles from './Checkbox.module.css'

const Checkbox = memo(({ name, ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input {...rest} name={name} type="checkbox" className={styles.checkbox} />
    )
})

export default Checkbox
