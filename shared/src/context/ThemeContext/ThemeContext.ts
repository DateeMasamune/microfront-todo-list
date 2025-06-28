import { createContext, useContext } from "react";
import { themeValues } from "../../constants";

interface IProps {
    theme?: string;
    handleChangeTheme?: (theme: string) => void
}

const ThemeContext = createContext<IProps>({ theme: themeValues.light })
export const useTheme = () => useContext(ThemeContext)

export default ThemeContext
