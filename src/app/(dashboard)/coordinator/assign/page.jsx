'use client'
import { useState } from "react";

// components
import AssignData from "./components/assignData";
import { Input } from "@/components/ui/input";

export default function AssignScreen() {
    const [searchText, setSearchText] = useState('')
    return (
        <div className="h-full">
            <div className="header flex justify-between items-center">
                <div className="flex justify-between items-start flex-col md:flex-row w-full gap-3">
                    <h1 className="text-title-28">Assign Faculty</h1>
                </div>
            </div>

            <div className="mt-5">
                <AssignData />
            </div>
        </div>
    )
}