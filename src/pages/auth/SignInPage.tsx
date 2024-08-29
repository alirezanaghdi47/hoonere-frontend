// libraries
import {useBoolean} from "usehooks-ts";

// components
import LoginWithAccount from "@/components/widgets/auth/sign-in/LoginWithAccount.tsx";
import LoginWithMobile from "@/components/widgets/auth/sign-in/LoginWithMobile.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const SignInPage = () => {
    const {value: isOtpWay, setTrue: setOtpWay, setFalse: unSetOtpWay} = useBoolean(false);

    return (
        <>
            {
                isOtpWay ? (
                    <LoginWithMobile unSetOtpWay={unSetOtpWay}/>
                ) : (
                    <LoginWithAccount setOtpWay={setOtpWay}/>
                )
            }
        </>
    )
}

export default WithRouteGuard(SignInPage);