interface IProps {
    className?: string
}

export const Chevron = ({ className }: IProps) => {
    return (
        <svg className={className} width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6308 4L1.26157 1" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 1L4.63077 4" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
