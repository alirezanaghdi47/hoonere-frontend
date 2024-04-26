// components
import RegisterWithMobile from "@/components/widgets/auth/sign-up/RegisterWithMobile.tsx";

// layouts
import AuthLayout from "@/layouts/AuthLayout.tsx";

const SignUpPage = () => {
    return (
        <AuthLayout>
            <RegisterWithMobile/>
        </AuthLayout>
    )
}

export default SignUpPage;