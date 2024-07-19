// libraries
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LuInfo, LuPen, LuTrash2, LuVideo, LuImage, LuMusic, LuFileText} from "react-icons/lu";

// components
import Filter from "@/components/widgets/panel/projects/read/mood-boards/Filter.tsx";
import Finder from "@/components/widgets/panel/projects/read/mood-boards/Finder.tsx";

// helpers
import dialog from "@/helpers/dialog.tsx";
import toast from "@/helpers/toast.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

// services
import {deleteProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IDeleteProjectMember} from "@/types/serviceType.ts";

const MoodBoardCard = ({readAllProjectMemberAction, moodBoard}) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
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
                className="d-flex flex-column justify-content-center align-items-center w-100 min-h-200px border border-dashed border-secondary rounded-2 p-5">
                <LuVideo
                    size={25}
                    color='currentColor'
                    className="text-muted mb-5"
                />

                <Typography
                    size="sm"
                    color="gray-600"
                    className="mb-2"
                >
                    عنوان
                </Typography>

                <Typography
                    size="sm"
                    color="gray-600"
                    className="mb-5"
                >
                    ( 2 مورد )
                </Typography>

                <div className="d-flex justify-content-center align-items-center gap-5 w-100">
                    <IconButton
                        size="sm"
                        color="light-info"
                        onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/mood-boards/" + moodBoard?.id, {state: {background: location}})}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="جزییات"
                    >
                        <LuInfo
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>

                    <IconButton
                        href={auth.panel_url + "projects/" + params.id + "/mood-boards/" + moodBoard?.id + "/update"}
                        size="sm"
                        color="light-warning"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="ویرایش"
                    >
                        <LuPen
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>

                    <IconButton
                        size="sm"
                        color="light-danger"
                        onClick={() =>
                            dialog(
                                "حذف مود بورد",
                                "آیا میخواهید این مود بورد را حذف کنید ؟",
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
                                    moodboard_id: moodBoard?.id.toString(),
                                    project_id: moodBoard?.project_id,
                                })
                            )
                        }
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="حذف"
                    >
                        <LuTrash2
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
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
                  }) => {
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
                />

                <div className="row gy-5 w-100">
                    {
                        readAllProjectMemberAction.data?.data?.members?.map((moodBoard) =>
                            <MoodBoardCard
                                key={moodBoard?.id}
                                readAllProjectMemberAction={readAllProjectMemberAction}
                                moodBoard={moodBoard}
                            />
                        )
                    }
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