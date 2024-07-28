// libraries
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LuInfo, LuPen, LuTrash2, LuVideo, LuImage, LuMusic, LuFileText} from "react-icons/lu";

// components
import MoodBoardFilter from "@/components/widgets/panel/projects/read/screen-plays/create/MoodBoardFilter.tsx";
import MoodBoardFinder from "@/components/widgets/panel/projects/read/screen-plays/create/MoodBoardFinder.tsx";

// helpers
import dialog from "@/helpers/dialog.tsx";
import toast from "@/helpers/toast.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import RadioBox from "@/modules/RadioBox.tsx";

// services
import {deleteProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IDeleteProjectMember} from "@/types/serviceType.ts";

const MoodBoardCard = ({moodBoard}) => {
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
                        value={moodBoard.id}
                        // checked={createProjectAfficheP3Form.values.screenplays.includes(screenPlay.id.toString())}
                        // onChange={value => {
                        //     if (!createProjectAfficheP3Form.values.screenplays.includes(screenPlay.id.toString())) {
                        //         createProjectAfficheP3Form.setFieldValue("screenplays", [...createProjectAfficheP3Form.values.screenplays.filter(screenPlay => screenPlay !== value), value]);
                        //     } else {
                        //         createProjectAfficheP3Form.setFieldValue("screenplays", [...createProjectAfficheP3Form.values.screenplays.filter(screenPlay => screenPlay !== value)]);
                        //     }
                        // }}
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
                <LuVideo
                    size={25}
                    color='currentColor'
                    className="text-muted mb-5"
                />

                <Typography
                    size="sm"
                    color="muted"
                    className="mb-2"
                >
                    عنوان
                </Typography>

                <Typography
                    size="sm"
                    color="muted"
                    className="mb-5"
                >
                    ( 2 مورد )
                </Typography>
            </div>
        </div>
    )
}

const MoodBoardDataList = ({
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
        <div className="d-flex flex-column justify-content-center align-items-center gap-5 w-100">
            {/*<MoodBoardFilter*/}
            {/*    readAllProjectMemberAction={readAllProjectMemberAction}*/}
            {/*    filter={filter}*/}
            {/*    initialFilter={initialFilter}*/}
            {/*    changeFilter={changeFilter}*/}
            {/*    isOpenFilter={isOpenFilter}*/}
            {/*    showFilter={showFilter}*/}
            {/*    hideFilter={hideFilter}*/}
            {/*    resetFilter={resetFilter}*/}
            {/*/>*/}

            <div className="row gy-5 w-100">
                {/*{*/}
                {/*    readAllProjectMemberAction.data?.data?.members?.map((moodBoard) =>*/}
                {/*        <MoodBoardCard*/}
                {/*            key={moodBoard?.id}*/}
                {/*            readAllProjectMemberAction={readAllProjectMemberAction}*/}
                {/*            moodBoard={moodBoard}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}   */}
                {
                    Array(5).fill("")?.map((moodBoard) =>
                        <MoodBoardCard
                            key={moodBoard?.id}
                            moodBoard={moodBoard}
                        />
                    )
                }
            </div>

            {/*<MoodBoardFinder*/}
            {/*    readAllProjectMemberAction={readAllProjectMemberAction}*/}
            {/*    filter={filter}*/}
            {/*    changeFilter={changeFilter}*/}
            {/*/>*/}
        </div>
    )
}

export default MoodBoardDataList;