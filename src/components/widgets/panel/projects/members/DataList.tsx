// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuPlus} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";
import dialog from "@/modules/dialog.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {deleteProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const BlankCard = ({onClick}) => {
    return (
        <div
            className="col-12 col-sm-6 col-lg-4"
            onClick={onClick}
        >
            <div
                className="d-flex flex-column justify-content-center align-items-center w-100 min-h-250px rounded-2 border border-dashed border-secondary p-5 cursor-pointer">
                <LuPlus
                    size={20}
                    color="currentColor"
                    className="text-gray-600 mb-2"
                />

                <Typography
                    size="sm"
                    color="gray-600"
                >
                    افزودن عضو
                </Typography>
            </div>
        </div>
    )
}

const DataCard = ({readAllProjectMemberAction, member}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const deleteProjectMemberAction = useMutation({
        mutationFn: (data) => deleteProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectMemberAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <div
                className="d-flex flex-column justify-content-center align-items-center w-100 min-h-250px rounded-2 border border-dashed border-secondary p-5">
                <LazyLoadImage
                    src={member?.user_info?.profile_img}
                    width={75}
                    height={75}
                    className="object-fit-cover rounded-circle mb-5"
                />

                <Typography
                    size="md"
                    color="dark"
                    isBold
                    className="mb-2"
                >
                    {(member?.user_info?.first_name && member?.user_info?.last_name) ? member?.user_info?.first_name + " " + member?.user_info?.last_name : member?.name}
                </Typography>

                <Typography
                    size="sm"
                    color="gray-600"
                    className="mb-2"
                >
                    {member?.parent_info?.title}
                </Typography>

                <Typography
                    size="sm"
                    color="gray-600"
                    className="mb-5"
                >
                    ( {member?.child_info?.title} )
                </Typography>

                <div className="d-flex justify-content-center align-items-center gap-5 w-100">
                    <Button
                        href={auth.panel_url + "projects/" + params.id + "/members/" + member?.id + "/update"}
                        size="sm"
                        color="light-warning"
                        activeColor="warning"
                    >
                        ویرایش
                    </Button>

                    <Button
                        size="sm"
                        color="light-danger"
                        activeColor="danger"
                        onClick={() =>
                            dialog(
                                "حذف عضو",
                                "آیا میخواهید این عضو را حذف کنید ؟",
                                "info",
                                {
                                    show: true,
                                    text: "حذف",
                                    color: "danger",
                                },
                                {
                                    show: true,
                                    text: "انصراف",
                                    color: "light-dark",
                                },
                                async () => deleteProjectMemberAction.mutate({
                                    member_id: member?.id.toString(),
                                    project_id: member?.project_id,
                                    foa_parent_id: member?.foa_parent_id,
                                    foa_child_id: member?.foa_child_id,
                                })
                            )
                        }
                    >
                        حذف
                    </Button>
                </div>
            </div>
        </div>
    )
}

const DataList = ({readAllProjectMemberAction}) => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    return (
        <div className="row gy-5">
            {
                readAllProjectMemberAction.data?.data?.members?.map((member) =>
                    <DataCard
                        key={member?.id}
                        readAllProjectMemberAction={readAllProjectMemberAction}
                        member={member}
                    />
                )
            }

            <BlankCard onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/members/create")}/>
        </div>
    )
}

export default DataList;