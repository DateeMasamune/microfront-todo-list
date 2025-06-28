import { useMemo, useState, type ReactNode } from 'react'
import { themeValues, colorsValue } from 'shared/constants'
import { ThemeContext as ThemeContextReact } from 'shared/context'

interface IProps {
    children: ReactNode
}

export const ThemeContext = ({ children }: IProps) => {
    const [theme, setTheme] = useState(themeValues?.light)

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
        <ThemeContextReact value={themeContextValues}>
            {children}
        </ThemeContextReact>
    )
}
