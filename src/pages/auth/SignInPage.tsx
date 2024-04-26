// libraries
import {useBoolean} from "usehooks-ts";

// components
import LoginWithAccount from "@/components/widgets/auth/sign-in/LoginWithAccount.tsx";
import LoginWithMobile from "@/components/widgets/auth/sign-in/LoginWithMobile.tsx";

// layouts
import AuthLayout from "@/layouts/AuthLayout.tsx";

const SignInPage = () => {
    const {value: isMobileWay, setTrue: setMobileWay, setFalse: unSetMobileWay} = useBoolean(false);

    return (
        <AuthLayout>
            {
                isMobileWay ? (
                    <LoginWithMobile unSetMobileWay={unSetMobileWay}/>
                ) : (
                    <LoginWithAccount setMobileWay={setMobileWay}/>
                )
            }
        </AuthLayout>
    )
}

export default SignInPage;