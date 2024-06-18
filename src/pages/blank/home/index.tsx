// libraries
import {Navigate} from "react-router-dom";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const Home = () => {
    return <Navigate to="/panel/dashboard"/>
}

export default RouteGuardHoc(Home);