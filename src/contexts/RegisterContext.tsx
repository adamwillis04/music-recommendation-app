import { createContext, useContext, ReactNode, useState } from "react"
import { Role } from "../types/roles"
import { VerificationMethod } from "../types/verification"
import { Artist } from "../types/artist"

interface RegisterData {
    email: string
    password: string
    role: Role

    //Fan
    username?: string
    artistCode?: string
    
    //Artist / Venue
    artist?: Artist
    venue?: string
    verMethod?: VerificationMethod
}

interface RegisterContextType {
    form: RegisterData
    updateForm: (data: Partial<RegisterData>) => void
}

const RegisterContext = createContext<RegisterContextType | null>(null)

export function useRegister() {
    const context = useContext(RegisterContext)
    if (!context) throw new Error("useRegister used outside of RegisterProvider container")
    return context
}

interface Props {
  children: ReactNode
}

export const RegisterProvider: React.FC<Props> = ({ children }) => {
    const [form, setForm] = useState<RegisterData>({
        email: "",
        password: "",
        role: "fan"
    })

    function updateForm(data: Partial<RegisterData>) {
        setForm(prev => ({...prev, ...data}))
    }

  return <RegisterContext.Provider value={{form, updateForm}}>{children}</RegisterContext.Provider>
}