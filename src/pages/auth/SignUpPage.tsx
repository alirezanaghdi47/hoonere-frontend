// components
import Register from "@/components/widgets/auth/sign-up/Register.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const SignUpPage = () => {
    return (
        <Register/>
    )
}

export default WithRouteGuard(SignUpPage);