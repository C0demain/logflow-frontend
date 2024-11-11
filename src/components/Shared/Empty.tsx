import { ReactNode } from "react"
import { AiOutlineInbox } from 'react-icons/ai'

interface propsType {
    title: string,
    description?: string
    className?: string
    children?: ReactNode
}

export default function Empty(props: propsType) {
    const { title, description, className, children } = props

    return (
        <div className={"flex items-center flex-col gap-2 text-center justify-center min-h-80 select-none" + " " + className}>
            <AiOutlineInbox className="w-32 h-20 mb-3" />
            <p className="font-semibold text-lg leading-4">{title}</p>
            <p className="text-sm mb-4">{description}</p>
            {children}
        </div>
    )
}