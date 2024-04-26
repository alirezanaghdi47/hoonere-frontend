// components
import Image from "@/components/widgets/account/projects/add/Image.tsx";
import Intro from "@/components/widgets/account/projects/add/Intro.tsx";
import Type from "@/components/widgets/account/projects/add/Type.tsx";
import Users from "@/components/widgets/account/projects/add/Users.tsx";
import TypeInfo from "@/components/widgets/account/projects/add/TypeInfo.tsx";
import Location from "@/components/widgets/account/projects/add/Location.tsx";
import ActionBar from "@/components/widgets/account/projects/add/ActionBar.tsx";

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