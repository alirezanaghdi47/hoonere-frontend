// libraries
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Loadable from '@loadable/component';

// pages
const BlankPage = Loadable(() => import('@/pages/blank/BlankPage.tsx'));
const ServerPage = Loadable(() => import('@/pages/blank/ServerDownPage.tsx'));
const ClientPage = Loadable(() => import('@/pages/blank/NotFoundPage.tsx'));
const AuthPage = Loadable(() => import('@/pages/auth/AuthPage.tsx'));
const SignInPage = Loadable(() => import('@/pages/auth/SignInPage.tsx'));
const SignUpPage = Loadable(() => import('@/pages/auth/SignUpPage.tsx'));
const PanelPage = Loadable(() => import('@/pages/panel/PanelPage.tsx'));
const DashboardPage = Loadable(() => import('@/pages/panel/DashboardPage.tsx'));
const ProjectsPage = Loadable(() => import('@/pages/panel/ProjectsPage.tsx'));
const ProjectPage = Loadable(() => import('@/pages/panel/ProjectPage.tsx'));
const InvitedProjectPage = Loadable(() => import('@/pages/panel/InvitedProjectPage.tsx'));
const CreateProjectPage = Loadable(() => import('@/pages/panel/CreateProjectPage.tsx'));
const UpdateProjectPage = Loadable(() => import('@/pages/panel/UpdateProjectPage.tsx'));
const ProjectMembersPage = Loadable(() => import('@/pages/panel/ProjectMembersPage.tsx'));
const CreateProjectMemberPage = Loadable(() => import('@/pages/panel/CreateProjectMemberPage.tsx'));
const UpdateProjectMemberPage = Loadable(() => import('@/pages/panel/UpdateProjectMemberPage.tsx'));
const ProjectScreenPlaysPage = Loadable(() => import('@/pages/panel/ProjectScreenPlaysPage.tsx'));
const ProjectScreenPlayPage = Loadable(() => import('@/pages/panel/ProjectScreenPlayPage.tsx'));
const CreateProjectScreenPlayPage = Loadable(() => import('@/pages/panel/CreateProjectScreenPlayPage.tsx'));
const UpdateProjectScreenPlayPage = Loadable(() => import('@/pages/panel/UpdateProjectScreenPlayPage.tsx'));
const ProjectAffichesPage = Loadable(() => import('@/pages/panel/ProjectAffichesPage.tsx'));
const ProjectAffichePage = Loadable(() => import('@/pages/panel/ProjectAffichePage.tsx'));
const InvitedProjectAffichePage = Loadable(() => import('@/pages/panel/InvitedProjectAffichePage.tsx'));
const CreateProjectAffichePage = Loadable(() => import('@/pages/panel/CreateProjectAffichePage.tsx'));
const UpdateProjectAffichePage = Loadable(() => import('@/pages/panel/UpdateProjectAffichePage.tsx'));
const ProjectAfficheHistoriesPage = Loadable(() => import('@/pages/panel/ProjectAfficheHistoriesPage.tsx'));
const ProjectAfficheHistoryPage = Loadable(() => import('@/pages/panel/ProjectAfficheHistoryPage.tsx'));
const ProjectMoodBoardsPage = Loadable(() => import('@/pages/panel/ProjectMoodBoardsPage.tsx'));
const ProjectMoodBoardPage = Loadable(() => import('@/pages/panel/ProjectMoodBoardPage.tsx'));
const CreateProjectMoodBoardPage = Loadable(() => import('@/pages/panel/CreateProjectMoodBoardPage.tsx'));
const ProjectContractsPage = Loadable(() => import('@/pages/panel/ProjectContractsPage.tsx'));
const ProjectContractPage = Loadable(() => import('@/pages/panel/ProjectContractPage.tsx'));
const InvitedProjectContractPage = Loadable(() => import('@/pages/panel/InvitedProjectContractPage.tsx'));
const CreateProjectContractPage = Loadable(() => import('@/pages/panel/CreateProjectContractPage.tsx'));
const UpdateProjectContractPage = Loadable(() => import('@/pages/panel/UpdateProjectContractPage.tsx'));
const ProjectContractInsertionsPage = Loadable(() => import('@/pages/panel/ProjectContractInsertionsPage.tsx'));
const ProjectContractInsertionPage = Loadable(() => import('@/pages/panel/ProjectContractInsertionPage.tsx'));
const CreateProjectContractInsertionPage = Loadable(() => import('@/pages/panel/CreateProjectContractInsertionPage.tsx'));
const UpdateProjectContractInsertionPage = Loadable(() => import('@/pages/panel/UpdateProjectContractInsertionPage.tsx'));
const ProfilePage = Loadable(() => import('@/pages/panel/ProfilePage.tsx'));

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
                path: "server-down-down",
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
