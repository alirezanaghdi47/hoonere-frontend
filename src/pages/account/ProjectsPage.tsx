// components
import Header from "@/components/widgets/account/projects/Header.tsx";
import Content from "@/components/widgets/account/projects/Content.tsx";

// layouts
import MainLayout from "@/layouts/MainLayout.tsx";

const ProjectsPage = () => {
    return (
        <MainLayout>
            <Header/>
            <Content/>
        </MainLayout>
    )
}

export default ProjectsPage;