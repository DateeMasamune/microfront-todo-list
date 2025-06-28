import { memo, useEffect, useRef, useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react"
import { Chevron } from "./Illustarion/Chevron"
import styles from './Button.module.css'
import clsx from "clsx"
import { Dark } from "./Illustarion/theme/Dark"
import { themeValues } from "shared/constants"
import { useTheme } from 'shared/context'
import { Light } from "./Illustarion/theme/Light"
import { Change } from "./Illustarion/Change"
import { Delete } from "./Illustarion/Delete"

const EVariants = {
    add: 'add',
    theme: 'theme',
    change: 'change',
    remove: 'remove',
    dropdown: 'dropdown',
} as const

interface IDropList {
    displayName: string
    value: string
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof EVariants
    children?: ReactNode
    dropList?: IDropList[]
    filteredList?: (name: string) => void
}

const Button = memo(({ children, variant, dropList = [], className, filteredList, ...rest }: IProps) => {
    const dropDownButton = useRef(null)
    const [open, setOpen] = useState(false)
    const [buttonName, setButtonName] = useState(children)

    const { theme, handleChangeTheme } = useTheme()

    const handleSetOpen = (event: MouseEvent<HTMLButtonElement> | globalThis.MouseEvent) => {
        if (event.target === dropDownButton.current) {
            setOpen(toggle => !toggle)
        } else {
            setOpen(false)
        }
    }

    const handleChangeButtonName = (value: string) => {
        setButtonName(value)
        filteredList?.(value)
    }

    useEffect(() => {
        window.addEventListener('click', handleSetOpen)

        return () => window.removeEventListener('click', handleSetOpen)
    }, [open])

    if (variant === EVariants.dropdown) {
        return <div className={clsx(styles.dropdown, className)}>
            <button ref={dropDownButton} name="dropdown" className={clsx(styles.button, styles.rootButton)} {...rest}>{buttonName}</button>
            <Chevron className={clsx(styles.chevron, {
                [styles.chevronRotate]: open
            })} />
            <ul className={clsx(styles.dropList, {
                [styles.showList]: open
            })}>
                {dropList.map(({ displayName, value }) =>
                    <li className={styles.item} onClick={() => handleChangeButtonName(value)}>{displayName}</li>)}
            </ul>
        </div>
    }

    if (variant === EVariants.theme) {
        return <div className={clsx(styles.theme, className)}>
            {theme === themeValues?.light ?
                <button onClick={() => handleChangeTheme?.(themeValues?.dark)} className={clsx(styles.themeButton, styles.rootButton)} {...rest}><Light className={styles.themeIcon} /></button>
                : <button onClick={() => handleChangeTheme?.(themeValues?.light)} className={clsx(styles.themeButton, styles.rootButton)} {...rest}><Dark className={styles.themeIcon} /></button>}
        </div>
    }

    if (variant === EVariants.add) {
        return (
            <button className={clsx(styles.add, styles.rootButton, className)} {...rest} />
        )
    }

    if (variant === EVariants.change) {
        return (
            <span {...rest}>
                <Change className={clsx(styles.changeButton, className)} />
            </span>
        )
    }

    if (variant === EVariants.remove) {
        return (
            <span {...rest}>
                <Delete className={clsx(styles.deleteButton, className)} />
            </span>
        )
    }

    return <button className={clsx(styles.rootButton, className, styles.simpleButton)} {...rest} >{children}</button>
})

export default Button
