// components
import Register from "@/components/widgets/auth/sign-up/Register.tsx";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

const SignUp = () => {
    return (
        <Register/>
    )
}

export default RouteGuardHoc(SignUp);