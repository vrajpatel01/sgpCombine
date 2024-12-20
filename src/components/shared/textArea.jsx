"use client";
import { useId } from "react";

export default function TextArea({ title, placeholder, className, onChange, type, id, value, required = false, maxLength, disabled = false, cols, rows }) {
    const fieldId = useId()

    return (
        <div className="w-auto">
            {title && <p className="mb-[2px] text-detail-14">{title} {required && <span className="text-red-500">*</span>}</p>}
            <div className="relative">
                <textarea
                    cols={cols}
                    rows={rows}
                    disabled={disabled}
                    value={value}
                    maxLength={maxLength}
                    className={`border-border border-2 rounded-md px-4 py-2 ${className} peer`}
                    onChange={(e) => onChange(e)}
                    placeholder={placeholder}
                    name={id}
                    id={id || title || fieldId} >
                    {/* {value} */}
                </textarea>
            </div>
        </div >
    );
}