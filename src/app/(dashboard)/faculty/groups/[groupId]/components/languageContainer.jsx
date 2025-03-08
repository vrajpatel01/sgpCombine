export default function LanguageContainer({ lang = '' }) {
    return (
        <div className="text-center px-4 py-2 rounded-lg bg-secondary-background flex justify-center items-center border-[.5px] border-border">
            <div className="uppercase">
                {lang}
            </div>
        </div>
    )
}