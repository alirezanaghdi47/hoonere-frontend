// libraries
import {Navigate, Route, Routes} from "react-router-dom";
import Loadable from '@loadable/component';

// layouts
const Panel = Loadable(() => import('@/layouts/PanelLayout.tsx'));
const Auth = Loadable(() => import('@/layouts/AuthLayout.tsx'));
const Blank = Loadable(() => import('@/layouts/BlankLayout.tsx'));

// pages
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
const ProjectAffiches = Loadable(() => import('@/pages/panel/projects/read/affiches'));
const CreateProjectAffiche = Loadable(() => import('@/pages/panel/projects/read/affiches/create'));
const UpdateProjectAffiche = Loadable(() => import('@/pages/panel/projects/read/affiches/update'));
const ProjectAfficheHistories = Loadable(() => import('@/pages/panel/projects/read/affiches/histories'));
const Profile = Loadable(() => import('@/pages/panel/profile'));

// stores
import useAuthStore from "@/stores/authStore.ts";

const routes = [
    {
        id: 1,
        path: "*",
        component: Blank,
        children: [
            {
                id: 1,
                path: "server-down",
                component: Server,
            },
            {
                id: 2,
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
                path: "projects/:id/affiches",
                component: ProjectAffiches,
            },
            {
                id: 13,
                path: "projects/:id/affiches/create",
                component: CreateProjectAffiche,
            },
            {
                id: 14,
                path: "projects/:id/affiches/:subId/update",
                component: UpdateProjectAffiche,
            },
            {
                id: 15,
                path: "projects/:id/affiches/:subId/histories",
                component: ProjectAfficheHistories,
            },
            {
                id: 16,
                path: "profile",
                component: Profile,
            },
        ]
    },
]

const RouterProvider = () => {
    const {auth} = useAuthStore();

    return (
        <Routes>
            <Route path="/" element={<Navigate to={auth.panel_url + "dashboard"}/>}/>

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
