// components
import Register from "@/components/widgets/auth/sign-up/Register.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const SignUp = () => {
    return (
        <Register/>
    )
}

export default WithRouteGuard(SignUp);