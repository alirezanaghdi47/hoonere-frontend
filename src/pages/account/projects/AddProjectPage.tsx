// components
import Header from "@/components/widgets/account/projects/add/Header.tsx";
import Content from "@/components/widgets/account/projects/add/Content.tsx";

// layouts
import MainLayout from "@/layouts/MainLayout.tsx";

const AddProjectPage = () => {
    return (
        <MainLayout>
            <Header/>
            <Content/>
        </MainLayout>
    )
}

export default AddProjectPage;