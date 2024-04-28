// libraries
import {Navigate, Route, Routes} from "react-router-dom";
import Loadable from '@loadable/component';

// layouts
const MainLayout = Loadable(() => import('@/layouts/MainLayout.tsx'));
const AuthLayout = Loadable(() => import('@/layouts/AuthLayout.tsx'));
const BlankLayout = Loadable(() => import('@/layouts/BlankLayout.tsx'));

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
                path="/"
                element={<Navigate to="/account/dashboard"/>}
            />

            <Route
                path="account"
                element={<MainLayout/>}
            >
                <Route
                    path="dashboard"
                    element={<Dashboard/>}
                />

                <Route
                    path="projects"
                    element={<Projects/>}
                />

                <Route
                    path="projects/add"
                    element={<AddProject/>}
                />

                <Route
                    path="profile"
                    element={<Profile/>}
                />
            </Route>

            <Route
                path="auth"
                element={<AuthLayout/>}
            >
                <Route
                    path="sign-in"
                    element={<SignIn/>}
                />

                <Route
                    path="sign-up"
                    element={<SignUp/>}
                />
            </Route>

            <Route
                path="/*"
                element={<BlankLayout/>}
            >
                <Route
                    path="*"
                    element={<NotFoundPage/>}
                />
            </Route>
        </Routes>
    )
}

export default RouterProvider;
