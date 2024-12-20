export default function PopUpModel({ children, toggle = false, setToggle }) {
    return (
        <div onClick={(e) => {
            setToggle(false)
        }} className={`${toggle ? 'fixed' : 'hidden'} !m-0 h-screen w-screen top-0 bottom-0 left-0 right-0 z-50 bg-primary-text bg-opacity-15 flex justify-center items-center p-4`}>
            <div onClick={e => e.stopPropagation()} className="bg-white p-4 sm:p-5 rounded-lg shadow-sm min-w-full sm:!min-w-max">
                {children}
            </div>
        </div>
    )
}