export default function ProjectInfoItem({ title, values = [] }) {
    return (
        <div>
            <div className="text-body-16 text-primary-text mb-1">{title}</div>
            <div className="flex flex-wrap gap-2">
                {values.map((value, index) => (
                    <div className="text-body-16 p-1 px-2 rounded-md bg-secondary-background max-w-min whitespace-nowrap border-[.5px] border-border">
                        {value}
                    </div>
                ))}
            </div>
        </div>
    )
}