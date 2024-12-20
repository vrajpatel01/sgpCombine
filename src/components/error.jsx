import {cn} from "@/lib/utils";

export const ErrorComp = ({ icon, text, ...rest }) => {
    return (
        <div {...rest} className={cn("py-10 flex flex-col justify-center items-center gap-5",rest.className)}>
            {icon}
            <span>{text}</span>
        </div>
    )
}