// libraries
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useMutation} from "@tanstack/react-query";
import {LuInfo, LuMusic, LuTrash2, LuType, LuVideo} from "react-icons/lu";

// components
import Filter from "@/components/widgets/panel/projects/read/mood-boards/Filter.tsx";
import Finder from "@/components/widgets/panel/projects/read/mood-boards/Finder.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Dialog from "@/modules/Dialog";
import Toast from "@/modules/Toast";

// services
import {deleteProjectMoodBoardsService , IDeleteProjectMoodBoard} from "@/services/projectMoodBoardService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const MoodBoardCard = ({moodBoard, readAllProjectMoodBoardAction , filter}) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const deleteProjectMoodBoardAction = useMutation({
        mutationFn: (data: IDeleteProjectMoodBoard) => deleteProjectMoodBoardsService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readAllProjectMoodBoardAction.mutate({
                    ...filter,
                    project_id: params.id
                });
            } else {
                Toast("error", data.message);
            }
        }
    });

    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <div
                className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 min-h-200px border border-dashed border-secondary rounded-2 p-5">
                {
                    moodBoard?.type === "1" && (
                        <LazyLoadImage
                            src={moodBoard?.content}
                            width={300}
                            height={150}
                            className="w-100 h-100 min-h-150px mh-150px object-fit-cover rounded-2"
                        />
                    )
                }

                {
                    moodBoard?.type === "2" && (
                        <LuVideo
                            size={25}
                            color='currentColor'
                            className="text-muted"
                        />
                    )
                }

                {
                    moodBoard?.type === "3" && (
                        <LuMusic
                            size={25}
                            color='currentColor'
                            className="text-muted"
                        />
                    )
                }

                {
                    moodBoard?.type === "4" && (
                        <LuType
                            size={25}
                            color='currentColor'
                            className="text-muted"
                        />
                    )
                }

                <Typography
                    size="sm"
                    color="muted"
                >
                    {moodBoard?.title}
                </Typography>

                <Typography
                    size="xs"
                    color="muted"
                >
                    {moodBoard?.type === "1" ? "تصویر" : moodBoard?.type === "2" ? "فیلم" : moodBoard?.type === "3" ? "فایل صوتی" : "متن"}
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
                        size="sm"
                        color="light-danger"
                        onClick={() =>
                            Dialog(
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
                                async () => deleteProjectMoodBoardAction.mutate({
                                    project_id: moodBoard?.project_id,
                                    moodboard_id: moodBoard?.id.toString(),
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
                      readAllProjectMoodBoardAction,
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
                    readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
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
                        readAllProjectMoodBoardAction.data?.data?.moodboards?.map((moodBoard) =>
                            <MoodBoardCard
                                key={moodBoard?.id}
                                moodBoard={moodBoard}
                                readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
                                filter={filter}
                            />
                        )
                    }
                </div>

                {
                    readAllProjectMoodBoardAction.data?.data?.moodboards.length === 0 && (
                        <Empty
                            title="مود بورد یافت نشد"
                            width="100%"
                            height={300}
                        />
                    )
                }

                <Finder
                    readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default DataList;