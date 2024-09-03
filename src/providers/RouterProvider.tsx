// libraries
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Loadable from '@loadable/component';

// pages
const BlankPage = Loadable(() => import('@/pages/blank'));
const ServerPage = Loadable(() => import('@/pages/blank/server-down'));
const ClientPage = Loadable(() => import('@/pages/blank/not-found'));
const AuthPage = Loadable(() => import('@/pages/auth'));
const SignInPage = Loadable(() => import('@/pages/auth/sign-in'));
const SignUpPage = Loadable(() => import('@/pages/auth/sign-up'));
const PanelPage = Loadable(() => import('@/pages/panel'));
const DashboardPage = Loadable(() => import('@/pages/panel/dashboard'));
const ProjectsPage = Loadable(() => import('@/pages/panel/projects'));
const ProjectPage = Loadable(() => import('@/pages/panel/projects/read'));
const InvitedProjectPage = Loadable(() => import('@/pages/panel/projects/invited'));
const CreateProjectPage = Loadable(() => import('@/pages/panel/projects/create'));
const UpdateProjectPage = Loadable(() => import('@/pages/panel/projects/update'));
const ProjectMembersPage = Loadable(() => import('@/pages/panel/projects/read/members'));
const CreateProjectMemberPage = Loadable(() => import('@/pages/panel/projects/read/members/create'));
const UpdateProjectMemberPage = Loadable(() => import('@/pages/panel/projects/read/members/update'));
const ProjectScreenPlaysPage = Loadable(() => import('@/pages/panel/projects/read/screen-playes'));
const ProjectScreenPlayPage = Loadable(() => import('@/pages/panel/projects/read/screen-playes/read'));
const CreateProjectScreenPlayPage = Loadable(() => import('@/pages/panel/projects/read/screen-playes/create'));
const UpdateProjectScreenPlayPage = Loadable(() => import('@/pages/panel/projects/read/screen-playes/update'));
const ProjectAffichesPage = Loadable(() => import('@/pages/panel/projects/read/affiches'));
const ProjectAffichePage = Loadable(() => import('@/pages/panel/projects/read/affiches/read'));
const InvitedProjectAffichePage = Loadable(() => import('@/pages/panel/projects/read/affiches/invited'));
const CreateProjectAffichePage = Loadable(() => import('@/pages/panel/projects/read/affiches/create'));
const UpdateProjectAffichePage = Loadable(() => import('@/pages/panel/projects/read/affiches/update'));
const ProjectAfficheHistoriesPage = Loadable(() => import('@/pages/panel/projects/read/affiches/histories'));
const ProjectAfficheHistoryPage = Loadable(() => import('@/pages/panel/projects/read/affiches/histories/read'));
const ProjectMoodBoardsPage = Loadable(() => import('@/pages/panel/projects/read/mood-boards'));
const ProjectMoodBoardPage = Loadable(() => import('@/pages/panel/projects/read/mood-boards/read'));
const CreateProjectMoodBoardPage = Loadable(() => import('@/pages/panel/projects/read/mood-boards/create'));
const ProjectContractsPage = Loadable(() => import('@/pages/panel/projects/read/contracts'));
const ProjectContractPage = Loadable(() => import('@/pages/panel/projects/read/contracts/read'));
const InvitedProjectContractPage = Loadable(() => import('@/pages/panel/projects/read/contracts/invited'));
const CreateProjectContractPage = Loadable(() => import('@/pages/panel/projects/read/contracts/create'));
const UpdateProjectContractPage = Loadable(() => import('@/pages/panel/projects/read/contracts/update'));
const ProjectContractInsertionsPage = Loadable(() => import('@/pages/panel/projects/read/contracts/insertions'));
const ProjectContractInsertionPage = Loadable(() => import('@/pages/panel/projects/read/contracts/insertions/read'));
const CreateProjectContractInsertionPage = Loadable(() => import('@/pages/panel/projects/read/contracts/insertions/create'));
const UpdateProjectContractInsertionPage = Loadable(() => import('@/pages/panel/projects/read/contracts/insertions/update'));
const ProfilePage = Loadable(() => import('@/pages/panel/profile'));

// stores
import useAuthStore from "@/stores/authStore.ts";

const pageRoutes = [
    {
        id: 1,
        path: "*",
        component: BlankPage,
        children: [
            {
                id: 1,
                path: "server-down",
                component: ServerPage,
            },
            {
                id: 2,
                path: "*",
                component: ClientPage,
            }
        ]
    },
    {
        id: 2,
        path: "auth",
        component: AuthPage,
        children: [
            {
                id: 1,
                path: "sign-in",
                component: SignInPage,
            },
            {
                id: 2,
                path: "sign-up",
                component: SignUpPage,
            }
        ]
    },
    {
        id: 3,
        path: "panel",
        component: PanelPage,
        children: [
            {
                id: 1,
                path: "dashboard",
                component: DashboardPage,
            },
            {
                id: 2,
                path: "projects",
                component: ProjectsPage,
            },
            {
                id: 3,
                path: "projects/:id",
                component: ProjectPage,
            },
            {
                id: 4,
                path: "projects/create",
                component: CreateProjectPage,
            },
            {
                id: 5,
                path: "projects/:id/update",
                component: UpdateProjectPage,
            },
            {
                id: 6,
                path: "projects/:id/members",
                component: ProjectMembersPage,
            },
            {
                id: 7,
                path: "projects/:id/members/create",
                component: CreateProjectMemberPage,
            },
            {
                id: 8,
                path: "projects/:id/members/:subId/update",
                component: UpdateProjectMemberPage,
            },
            {
                id: 9,
                path: "projects/:id/screen-plays",
                component: ProjectScreenPlaysPage,
            },
            {
                id: 10,
                path: "projects/:id/screen-plays/create",
                component: CreateProjectScreenPlayPage,
            },
            {
                id: 11,
                path: "projects/:id/screen-plays/:subId/update",
                component: UpdateProjectScreenPlayPage,
            },
            {
                id: 12,
                path: "projects/:id/affiches",
                component: ProjectAffichesPage,
            },
            {
                id: 13,
                path: "projects/:id/affiches/create",
                component: CreateProjectAffichePage,
            },
            {
                id: 14,
                path: "projects/:id/affiches/:subId/update",
                component: UpdateProjectAffichePage,
            },
            {
                id: 15,
                path: "projects/:id/affiches/:subId/histories",
                component: ProjectAfficheHistoriesPage,
            },
            {
                id: 16,
                path: "projects/:id/mood-boards",
                component: ProjectMoodBoardsPage,
            },
            {
                id: 17,
                path: "projects/:id/mood-boards/create",
                component: CreateProjectMoodBoardPage,
            },
            {
                id: 18,
                path: "projects/:id/contracts",
                component: ProjectContractsPage,
            },
            {
                id: 19,
                path: "projects/:id/contracts/create",
                component: CreateProjectContractPage,
            },
            {
                id: 20,
                path: "projects/:id/contracts/:subId/update",
                component: UpdateProjectContractPage,
            },
            {
                id: 21,
                path: "projects/:id/contracts/:subId/insertions",
                component: ProjectContractInsertionsPage,
            },
            {
                id: 22,
                path: "projects/:id/contracts/:subId/insertions/create",
                component: CreateProjectContractInsertionPage,
            },
            {
                id: 23,
                path: "projects/:id/contracts/:subId/insertions/:subSubId/update",
                component: UpdateProjectContractInsertionPage,
            },
            {
                id: 40,
                path: "profile",
                component: ProfilePage,
            },
        ]
    },
];

const modalRoutes = [
    {
        id: 2,
        path: "panel/projects/:id/invited",
        component: InvitedProjectPage,
    },
    {
        id: 1,
        path: "panel/projects/:id/screen-plays/:subId",
        component: ProjectScreenPlayPage,
    },
    {
        id: 2,
        path: "panel/projects/:id/affiches/:subId",
        component: ProjectAffichePage,
    },
    {
        id: 2,
        path: "panel/projects/:id/affiches/:subId/invited",
        component: InvitedProjectAffichePage,
    },
    {
        id: 3,
        path: "panel/projects/:id/affiches/:subId/histories/:subSubId",
        component: ProjectAfficheHistoryPage,
    },
    {
        id: 4,
        path: "panel/projects/:id/mood-boards/:subId",
        component: ProjectMoodBoardPage,
    },
    {
        id: 5,
        path: "panel/projects/:id/contracts/:subId",
        component: ProjectContractPage,
    },
    {
        id: 5,
        path: "panel/projects/:id/contracts/:subId/invited",
        component: InvitedProjectContractPage,
    },
    {
        id: 6,
        path: "panel/projects/:id/contracts/:subId/insertions/:subSubId",
        component: ProjectContractInsertionPage,
    },
];

const RouterProvider = () => {
    const location = useLocation();
    const {auth} = useAuthStore();

    const background = location.state && location.state.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<Navigate to={auth.panel_url ? auth.panel_url + "dashboard" : "/panel/dashboard"}/>}/>

                {
                    pageRoutes.map(pageRoute => (
                            <Route
                                key={pageRoute.id}
                                path={pageRoute.path}
                                element={<pageRoute.component/>}
                            >
                                {
                                    pageRoute.hasOwnProperty("children") && pageRoute.children?.map(subRoute =>
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

            <Routes>
                {
                    background && modalRoutes.map(modalRoute => (
                            <Route
                                key={modalRoute.id}
                                path={modalRoute.path}
                                element={<modalRoute.component/>}
                            />
                        )
                    )
                }
            </Routes>
        </>
    )
}

export default RouterProvider;
