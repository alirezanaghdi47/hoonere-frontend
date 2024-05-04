// libraries
import {Navigate, Route, Routes} from "react-router-dom";
import Loadable from '@loadable/component';

// stores
import useAuthStore from "@/stores/authStore.ts";

// layouts
const MainLayout = Loadable(() => import('@/layouts/MainLayout.tsx'));
const AuthLayout = Loadable(() => import('@/layouts/AuthLayout.tsx'));
const BlankLayout = Loadable(() => import('@/layouts/BlankLayout.tsx'));

// pages
const DashboardPanel = Loadable(() => import('@/pages/panel/dashboard'));
const ProjectsPanel = Loadable(() => import('@/pages/panel/projects'));
const AddProjectPanel = Loadable(() => import('@/pages/panel/projects/add'));
const ProfilePanel = Loadable(() => import('@/pages/panel/profile'));
const SignIn = Loadable(() => import('@/pages/auth/sign-in'));
const SignUp = Loadable(() => import('@/pages/auth/sign-up'));
const ServerError = Loadable(() => import('@/pages/ServerErrorPage.tsx'));
const ClientError = Loadable(() => import('@/pages/ClientErrorPage.tsx'));

const RouterProvider = () => {
    const {auth} = useAuthStore();

    const isAuth = Boolean(auth.token && parseInt(auth.status_id) > 1);

    return (
        <Routes>
            <Route
                path="/"
                element={isAuth ? <Navigate to="/panel/dashboard"/> : <Navigate to="/auth/sign-in"/>}
            />

            <Route
                path="auth"
                element={!isAuth ? <AuthLayout/> : <Navigate to="/panel/dashboard"/>}
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
                path="panel"
                element={isAuth ? <MainLayout/> : <Navigate to="/auth/sign-in"/>}
            >
                <Route
                    path="dashboard"
                    element={<DashboardPanel/>}
                />

                <Route
                    path="projects"
                    element={<ProjectsPanel/>}
                />

                <Route
                    path="projects/add"
                    element={<AddProjectPanel/>}
                />

                <Route
                    path="profile"
                    element={<ProfilePanel/>}
                />
            </Route>

            <Route
                path="/*"
                element={<BlankLayout/>}
            >
                <Route
                    path="server-down"
                    element={<ServerError/>}
                />

                <Route
                    path="*"
                    element={<ClientError/>}
                />
            </Route>
        </Routes>
    )
}

export default RouterProvider;
