// libraries
import {Route, Routes} from "react-router-dom";
import Loadable from '@loadable/component';

// pages
const Dashboard = Loadable(() => import('@/pages/account/DashboardPage.tsx'));
const Projects = Loadable(() => import('@/pages/account/ProjectsPage.tsx'));
const AddProject = Loadable(() => import('@/pages/account/projects/AddProjectPage.tsx'));
const Profile = Loadable(() => import('@/pages/account/ProfilePage.tsx'));
const SignIn = Loadable(() => import('@/pages/auth/SignInPage.tsx'));
const SignUp = Loadable(() => import('@/pages/auth/SignUpPage.tsx'));
const NotFoundPage = Loadable(() => import('@/pages/NotFoundPage.tsx'));

const RouterProvider = () => {
    return (
        <Routes>
            <Route
                path="/account/dashboard"
                element={<Dashboard/>}
            />

            <Route
                path="/account/projects"
                element={<Projects/>}
            />

            <Route
                path="/account/projects/add"
                element={<AddProject/>}
            />

            <Route
                path="/account/profile"
                element={<Profile/>}
            />

            <Route
                path="/auth/sign-in"
                element={<SignIn/>}
            />

            <Route
                path="/auth/sign-up"
                element={<SignUp/>}
            />

            <Route
                path="/*"
                element={<NotFoundPage/>}
            />
        </Routes>
    )
}

export default RouterProvider;
