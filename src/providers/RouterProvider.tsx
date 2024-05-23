// libraries
import {Navigate, Route, Routes} from "react-router-dom";
import Loadable from '@loadable/component';

// stores
import useAuthStore from "@/stores/authStore.ts";

import Temp from "@/pages/TempPage.tsx";

// layouts
const Panel = Loadable(() => import('@/layouts/panel'));
const Auth = Loadable(() => import('@/layouts/auth'));
const Blank = Loadable(() => import('@/layouts/error'));

// pages
const Dashboard = Loadable(() => import('@/pages/panel/dashboard'));
const Projects = Loadable(() => import('@/pages/panel/projects'));
const CreateProject = Loadable(() => import('@/pages/panel/projects/create'));
const UpdateProject = Loadable(() => import('@/pages/panel/projects/update'));
const ProjectMembers = Loadable(() => import('@/pages/panel/projects/members'));
const CreateProjectMember = Loadable(() => import('@/pages/panel/projects/members/create'));
const UpdateProjectMember = Loadable(() => import('@/pages/panel/projects/members/update'));
const Profile = Loadable(() => import('@/pages/panel/profile'));
const SignIn = Loadable(() => import('@/pages/auth/sign-in'));
const SignUp = Loadable(() => import('@/pages/auth/sign-up'));
const Server = Loadable(() => import('@/pages/error/server'));
const Client = Loadable(() => import('@/pages/error/client'));

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
                element={!isAuth ? <Auth/> : <Navigate to="/panel/dashboard"/>}
            >
                <Route
                    path=""
                    element={<Navigate to="/auth/sign-in"/>}
                />

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
                element={isAuth ? <Panel/> : <Navigate to="/auth/sign-in"/>}
            >
                <Route
                    path=""
                    element={<Navigate to="/panel/dashboard"/>}
                />

                <Route
                    path="dashboard"
                    element={<Dashboard/>}
                />

                <Route
                    path="projects"
                    element={<Projects/>}
                />

                <Route
                    path="projects/create"
                    element={<CreateProject/>}
                />

                <Route
                    path="projects/:id/update"
                    element={<UpdateProject/>}
                />

                <Route
                    path="projects/:id/members"
                    element={<ProjectMembers/>}
                />

                <Route
                    path="projects/:id/members/create"
                    element={<CreateProjectMember/>}
                />

                <Route
                    path="projects/:id/members/:subId/update"
                    element={<UpdateProjectMember/>}
                />

                <Route
                    path="profile"
                    element={<Profile/>}
                />
            </Route>

            <Route
                path="/*"
                element={<Blank/>}
            >
                <Route
                    path="server-down"
                    element={<Server/>}
                />

                <Route
                    path="*"
                    element={<Client/>}
                />
            </Route>

            <Route
                path="/temp"
                element={<Temp/>}
            />
        </Routes>
    )
}

export default RouterProvider;
