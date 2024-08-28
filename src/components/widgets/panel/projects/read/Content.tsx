// libraries
import {useState} from "react";
import {useParams} from "react-router-dom";
import {
    LuBriefcase,
    LuCalculator,
    LuClapperboard,
    LuScale,
    LuUsers,
    LuDollarSign,
    LuLayoutDashboard
} from "react-icons/lu";

// modules
import Button from "@/modules/Button";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Content = () => {
    const params = useParams();
    const {auth} = useAuthStore();

    const [links, setLinks] = useState([
        {
            id: 1,
            label: "اعضا",
            icon: LuUsers({size: 25, color: "currentColor"}),
            href: auth.panel_url + `projects/${params.id}/members`
        },
        {
            id: 2,
            label: "فیلم نامه ها",
            icon: LuClapperboard({size: 25, color: "currentColor"}),
            href: auth.panel_url + `projects/${params.id}/screen-plays`
        },
        {
            id: 3,
            label: "آفیش ها",
            icon: LuBriefcase({size: 25, color: "currentColor"}),
            href: auth.panel_url + `projects/${params.id}/affiches`
        },
        {
            id: 4,
            label: "مود بورد ها",
            icon: LuLayoutDashboard({size: 25, color: "currentColor"}),
            href: auth.panel_url + `projects/${params.id}/mood-boards`
        },
        {
            id: 5,
            label: "قرارداد ها",
            icon: LuScale({size: 25, color: "currentColor"}),
            href: auth.panel_url + `projects/${params.id}/contracts`
        },
        {
            id: 6,
            label: "مالی",
            icon: LuDollarSign({size: 25, color: "currentColor"}),
            href: ""
        },
        {
            id: 7,
            label: "برآورد ها",
            icon: LuCalculator({size: 25, color: "currentColor"}),
            href: ""
        },
    ]);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                <div className="row g-5 w-100">
                    {
                        links.map(link =>
                            <div
                                key={link.id}
                                className='col-12 col-sm-6 col-md-4'
                            >
                                <div className="card shadow-sm">
                                    <Button
                                        href={link.href}
                                        className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100 p-8"
                                        color='light'
                                        activeColor='light-primary'
                                        isBold
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Content;