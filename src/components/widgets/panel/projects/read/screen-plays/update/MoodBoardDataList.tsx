// libraries
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {LuImage, LuInfo, LuMusic, LuType, LuVideo} from "react-icons/lu";

// components
import MoodBoardFilter from "@/components/widgets/panel/projects/read/screen-plays/update/MoodBoardFilter.tsx";
import MoodBoardFinder from "@/components/widgets/panel/projects/read/screen-plays/update/MoodBoardFinder.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import RadioBox from "@/modules/RadioBox.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const MoodBoardCard = ({moodBoard, attachProjectMoodBoardForm}) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <div
                className="d-flex flex-column justify-content-center align-items-center w-100 min-h-150px border border-dashed border-secondary rounded-2 p-5">
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <RadioBox
                        id={`moodboard-${moodBoard.id}`}
                        name={`moodboard-${moodBoard.id}`}
                        value={moodBoard.id.toString()}
                        checked={attachProjectMoodBoardForm.values.id.toString() === moodBoard?.id.toString()}
                        onChange={(value) => attachProjectMoodBoardForm.setFieldValue("id", value.toString())}
                    />

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
                </div>

                {
                    moodBoard?.type === "1" && (
                        <LuImage
                            size={25}
                            color='currentColor'
                            className="text-muted mb-5"
                        />
                    )
                }

                {
                    moodBoard?.type === "2" && (
                        <LuVideo
                            size={25}
                            color='currentColor'
                            className="text-muted mb-5"
                        />
                    )
                }

                {
                    moodBoard?.type === "3" && (
                        <LuMusic
                            size={25}
                            color='currentColor'
                            className="text-muted mb-5"
                        />
                    )
                }

                {
                    moodBoard?.type === "4" && (
                        <LuType
                            size={25}
                            color='currentColor'
                            className="text-muted mb-5"
                        />
                    )
                }

                <Typography
                    size="sm"
                    color="muted"
                    className="mb-2"
                >
                    {moodBoard?.title}
                </Typography>

                <Typography
                    size="xs"
                    color="muted"
                    className="mb-5"
                >
                    {moodBoard?.type === "1" ? "تصویر" : moodBoard?.type === "2" ? "فیلم" : moodBoard?.type === "3" ? "فایل صوتی" : "متن"}
                </Typography>
            </div>
        </div>
    )
}

const MoodBoardDataList = ({
                               readAllProjectMoodBoardAction,
                               attachProjectMoodBoardForm,
                               filter,
                               initialFilter,
                               isOpenFilter,
                               changeFilter,
                               resetFilter,
                               hideFilter,
                               showFilter,
                           }) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-5 w-100">
            <MoodBoardFilter
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
                            attachProjectMoodBoardForm={attachProjectMoodBoardForm}
                        />
                    )
                }
            </div>

            <MoodBoardFinder
                readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
                filter={filter}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default MoodBoardDataList;