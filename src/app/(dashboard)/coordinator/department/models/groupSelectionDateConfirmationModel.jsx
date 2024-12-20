import { useState } from "react"
// models
import PopUpModel from "@/components/models/popUpModel"

// components
import InputField from "@/components/shared/inputField"
import Button from "@/components/shared/button"

export default function GroupSelectionDateConfirmationModel({ data, setData, selectedDates }) {
    const [message, setMessage] = useState('')
    const handleDeleteConfirmation = async (e) => {
        e.preventDefault()
    }
    return (
        <PopUpModel
            toggle={data}
            setToggle={setData}>
            <form onSubmit={handleDeleteConfirmation} className="flex flex-col gap-5">
                <div className="flex justify-start items-center gap-2">
                    <h1 className="text-title-24">Confirmation</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="min-w-full sm:w-[350px] text-body-16 leading-5">Enter the Your Password to continue.</div>
                    <InputField
                        type='password'
                        placeholder='password'
                        value={message}
                        className='min-w-full sm:min-w-[350px]'
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="w-full sm:w-[350px] leading-5">
                        Group Selection Start from date <b>{selectedDates.start.toDateString()}</b> and end on <b>{selectedDates.end.toDateString()}</b>
                    </div>
                    <div className="w-full sm:w-[350px] text-sm leading-[18px] text-light-text">
                        This date is not change after you confirm it so please check once before you confirm.
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        label='Cancel'
                        onClick={() => {
                            setMessage('')
                            setData(false)
                        }}
                        type="button"
                        className='!rounded-full w-full sm:min-w-[130px]'
                    />
                    <Button
                        label='Set'
                        className='bg-primary text-white !rounded-full whitespace-nowrap w-full sm:min-w-[130px] disabled:bg-opacity-90'
                    />
                </div>
            </form>
        </PopUpModel>
    )
}