// components
import Register from "@/components/auth/sign-up/Register.tsx";

// layouts
import AuthLayout from "@/layouts/AuthLayout.tsx";

const SignUpPage = () => {
    return (
        <AuthLayout>
            <Register/>
        </AuthLayout>
    )
}

export default SignUpPage;