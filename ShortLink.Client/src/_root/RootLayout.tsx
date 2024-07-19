import Navbar from "@/components/layout/Navbar"
import { Outlet } from "react-router-dom"

function Rootlayout() {
    return (
        <>
            <div className="">
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default Rootlayout