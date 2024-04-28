// libraries
import {Outlet} from "react-router-dom";

const BlankLayout = () => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 min-vh-100">
            <div className="d-flex flex-column justify-content-center align-items-center w-100 w-sm-500px p-10">
                <Outlet/>
            </div>
        </div>
    )
}

export default BlankLayout;