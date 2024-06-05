// libraries
import {Navigate} from "react-router-dom";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

const Home = () => {
    return <Navigate to="/panel/dashboard"/>
}

export default RouteGuardHoc(Home);