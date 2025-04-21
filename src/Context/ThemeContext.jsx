import { createContext, useState } from "react";

export const Theme = createContext();
export default function ThemeContext({children}){
    const [dark , setDark] = useState(window.localStorage.getItem("theme") || "light")

    return(
        <Theme.Provider value={{dark , setDark}}>{children}</Theme.Provider>
    )
}