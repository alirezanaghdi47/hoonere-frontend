// components
import Image from "@/components/widgets/panel/projects/create/Image.tsx";
import Intro from "@/components/widgets/panel/projects/create/Intro.tsx";
import Type from "@/components/widgets/panel/projects/create/Type.tsx";
import Users from "@/components/widgets/panel/projects/create/Users.tsx";
import TypeInfo from "@/components/widgets/panel/projects/create/TypeInfo.tsx";
import Location from "@/components/widgets/panel/projects/create/Location.tsx";
import ActionBar from "@/components/widgets/panel/projects/create/ActionBar.tsx";

const Content = () => {
    return (
        <div className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-column gap-5 w-100 w-lg-400px mt-lg-n20">
                <Image/>
                <Type/>
            </div>

            <div className="d-flex flex-column flex-row-fluid gap-5 w-100">
                <Intro/>
                <TypeInfo/>
                <Users/>
                <Location/>
                <ActionBar/>
            </div>
        </div>
    )
}

export default Content;