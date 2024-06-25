// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuPlus} from "react-icons/lu";

// components
import Filter from "@/components/widgets/panel/projects/read/members/Filter.tsx";
import Finder from "@/components/widgets/panel/projects/read/members/Finder.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";
import dialog from "@/helpers/dialog.tsx";
import toast from "@/helpers/toast.tsx";

// services
import {deleteProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IDeleteProjectMember} from "@/types/serviceType.ts";

const BlankCard = ({onClick}) => {
    return (
        <div
            className="col-12 col-sm-6 col-lg-4"
            onClick={onClick}
        >
            <div
                className="d-flex flex-column justify-content-center align-items-center w-100 min-h-300px rounded-2 border-2 border-dashed border-secondary p-5 cursor-pointer">
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

const MemberCard = ({readAllProjectMemberAction, member}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const deleteProjectMemberAction = useMutation({
        mutationFn: (data: IDeleteProjectMember) => deleteProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectMemberAction.mutate({project_id: params?.id});
            } else {
                toast("error", data.message);
            }
        }
    });

    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <div
                className="d-flex flex-column justify-content-center align-items-center w-100 min-h-300px bg-light rounded-2 p-5">
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
                        color="warning"
                    >
                        ویرایش
                    </Button>

                    <Button
                        size="sm"
                        color="danger"
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

const DataList = ({
                      readAllProjectMemberAction,
                      filter,
                      initialFilter,
                      isOpenFilter,
                      changeFilter,
                      resetFilter,
                      hideFilter,
                      showFilter,
                      isListView,
                      toggleView
                  }) => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <Filter
                    readAllProjectMemberAction={readAllProjectMemberAction}
                    filter={filter}
                    initialFilter={initialFilter}
                    changeFilter={changeFilter}
                    isOpenFilter={isOpenFilter}
                    showFilter={showFilter}
                    hideFilter={hideFilter}
                    resetFilter={resetFilter}
                    isListView={isListView}
                    toggleView={toggleView}
                />

                <div className="row gy-5 w-100">
                    {
                        readAllProjectMemberAction.data?.data?.members?.map((member) =>
                            <MemberCard
                                key={member?.id}
                                readAllProjectMemberAction={readAllProjectMemberAction}
                                member={member}
                            />
                        )
                    }

                    <BlankCard onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/members/create")}/>
                </div>

                <Finder
                    readAllProjectMemberAction={readAllProjectMemberAction}
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default DataList;