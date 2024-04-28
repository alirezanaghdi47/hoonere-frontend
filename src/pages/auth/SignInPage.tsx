// libraries
import {useBoolean} from "usehooks-ts";

// components
import LoginWithAccount from "@/components/widgets/auth/sign-in/LoginWithAccount.tsx";
import LoginWithMobile from "@/components/widgets/auth/sign-in/LoginWithMobile.tsx";

const SignInPage = () => {
    const {value: isMobileWay, setTrue: setMobileWay, setFalse: unSetMobileWay} = useBoolean(false);

    return (
        <>
            {
                isMobileWay ? (
                    <LoginWithMobile unSetMobileWay={unSetMobileWay}/>
                ) : (
                    <LoginWithAccount setMobileWay={setMobileWay}/>
                )
            }
        </>
    )
}

export default SignInPage;