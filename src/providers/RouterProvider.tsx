// libraries
import {Route, Routes} from "react-router-dom";
import Loadable from '@loadable/component';

// layouts
const Panel = Loadable(() => import('@/layouts/PanelLayout.tsx'));
const Auth = Loadable(() => import('@/layouts/AuthLayout.tsx'));
const Blank = Loadable(() => import('@/layouts/BlankLayout.tsx'));

// pages
const Home = Loadable(() => import('@/pages/blank/home'));
const Server = Loadable(() => import('@/pages/blank/server'));
const Client = Loadable(() => import('@/pages/blank/client'));
const SignIn = Loadable(() => import('@/pages/auth/sign-in'));
const SignUp = Loadable(() => import('@/pages/auth/sign-up'));
const Dashboard = Loadable(() => import('@/pages/panel/dashboard'));
const Projects = Loadable(() => import('@/pages/panel/projects'));
const Project = Loadable(() => import('@/pages/panel/projects/read'));
const CreateProject = Loadable(() => import('@/pages/panel/projects/create'));
const UpdateProject = Loadable(() => import('@/pages/panel/projects/update'));
const ProjectMembers = Loadable(() => import('@/pages/panel/projects/read/members'));
const CreateProjectMember = Loadable(() => import('@/pages/panel/projects/read/members/create'));
const UpdateProjectMember = Loadable(() => import('@/pages/panel/projects/read/members/update'));
const ProjectScreenPlays = Loadable(() => import('@/pages/panel/projects/read/screen-plays'));
const CreateProjectScreenPlay = Loadable(() => import('@/pages/panel/projects/read/screen-plays/create'));
const UpdateProjectScreenPlay = Loadable(() => import('@/pages/panel/projects/read/screen-plays/update'));
const Profile = Loadable(() => import('@/pages/panel/profile'));

const routes = [
    {
        id: 1,
        path: "*",
        component: Blank,
        children: [
            {
                id: 1,
                path: "",
                component: Home,
                requiredAuth: false,
            },
            {
                id: 2,
                path: "server-down",
                component: Server,
            },
            {
                id: 3,
                path: "*",
                component: Client,
            }
        ]
    },
    {
        id: 2,
        path: "auth",
        component: Auth,
        children: [
            {
                id: 1,
                path: "sign-in",
                component: SignIn,
            },
            {
                id: 2,
                path: "sign-up",
                component: SignUp,
            }
        ]
    },
    {
        id: 3,
        path: "panel",
        component: Panel,
        children: [
            {
                id: 1,
                path: "dashboard",
                component: Dashboard,
            },
            {
                id: 2,
                path: "projects",
                component: Projects,
            },
            {
                id: 3,
                path: "projects/:id",
                component: Project,
            },
            {
                id: 4,
                path: "projects/create",
                component: CreateProject,
            },
            {
                id: 5,
                path: "projects/:id/update",
                component: UpdateProject,
            },
            {
                id: 6,
                path: "projects/:id/members",
                component: ProjectMembers,
            },
            {
                id: 7,
                path: "projects/:id/members/create",
                component: CreateProjectMember,
            },
            {
                id: 8,
                path: "projects/:id/members/:subId/update",
                component: UpdateProjectMember,
            },
            {
                id: 9,
                path: "projects/:id/screen-plays",
                component: ProjectScreenPlays,
            },
            {
                id: 10,
                path: "projects/:id/screen-plays/create",
                component: CreateProjectScreenPlay,
            },
            {
                id: 11,
                path: "projects/:id/screen-plays/:subId/update",
                component: UpdateProjectScreenPlay,
            },
            {
                id: 12,
                path: "profile",
                component: Profile,
            },
        ]
    },
]

const RouterProvider = () => {
    return (
        <Routes>
            {
                routes.map(route => (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={<route.component/>}
                        >
                            {
                                route.hasOwnProperty("children") && route.children?.map(subRoute =>
                                    <Route
                                        key={subRoute.id}
                                        path={subRoute.path}
                                        element={<subRoute.component/>}
                                    />
                                )
                            }
                        </Route>
                    )
                )
            }
        </Routes>
    )
}

export default RouterProvider;
