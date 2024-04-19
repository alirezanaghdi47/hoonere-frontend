// libraries
import {Route, Routes} from "react-router-dom";
import Loadable from '@loadable/component';

// pages
const SignIn = Loadable(() => import('@/pages/auth/SignInPage.tsx'));
const SignUp = Loadable(() => import('@/pages/auth/SignUpPage.tsx'));
const Temp = Loadable(() => import('@/pages/TempPage.tsx'));

const RouterProvider = () => {
    return (
        <Routes>
            <Route
                path="/auth/sign-in"
                element={<SignIn/>}
            />

            <Route
                path="/auth/sign-up"
                element={<SignUp/>}
            />

            <Route
                path="/temp"
                element={<Temp/>}
            />
        </Routes>
    )
}

export default RouterProvider;
