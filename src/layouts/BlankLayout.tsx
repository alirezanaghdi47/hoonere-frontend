// libraries
import {Outlet} from "react-router-dom";

const BlankLayout = () => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 min-vh-100">
            <div className="d-flex flex-column justify-content-center align-items-center w-100 w-sm-500px h-100 p-10 my-auto">
                <Outlet/>
            </div>
        </div>
    )
}

export default BlankLayout;