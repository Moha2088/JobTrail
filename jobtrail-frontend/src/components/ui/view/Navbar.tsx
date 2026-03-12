"use client"

import Link from "next/link"


export function Navbar() {
    return (
        <div className="flex flex-row mr-auto ml-auto border-2 w-fit mt-3 p-3 rounded-full">
            <div className="flex flex-row gap-5">
            
                <Link href="/login" className="font-bold text-black cursor-pointer hover:text-gray-400">
                    Login
                </Link>

                <Link
                    href="/"
                    className="font-bold text-black cursor-pointer hover:text-gray-400"
                >
                    Users
                </Link>
            </div>
        </div>
    )
}