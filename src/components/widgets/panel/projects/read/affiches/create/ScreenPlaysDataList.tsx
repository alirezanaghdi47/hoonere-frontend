// libraries
import {useLocation, useNavigate, useParams} from "react-router-dom";
import parse from 'html-react-parser';
import {LuInfo} from "react-icons/lu";

// components
import ScreenPlaysFinder from "@/components/widgets/panel/projects/read/affiches/create/ScreenPlaysFinder.tsx";
import ScreenPlaysFilter from "@/components/widgets/panel/projects/read/affiches/create/ScreenPlaysFilter.tsx";

// modules
import Chip from "@/modules/Chip";
import Form from "@/modules/Form";
import IconButton from "@/modules/IconButton";
import CheckBox from "@/modules/CheckBox";

// stores
import useAuthStore from "@/stores/authStore.ts";

export const ScreenPlayCard = ({screenPlay, createProjectAfficheP3Form}) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <div
                className="d-flex flex-column justify-content-between align-items-center w-100 h-200px border border-dashed border-secondary rounded-2 p-5">
                <div className='d-flex justify-content-between align-items-center gap-5 w-100'>
                    <CheckBox
                        id={`screenplay-${screenPlay.id}`}
                        name={`screenplay-${screenPlay.id}`}
                        value={screenPlay.id}
                        checked={createProjectAfficheP3Form.values.screenplays.includes(screenPlay.id.toString())}
                        onChange={value => {
                            if (!createProjectAfficheP3Form.values.screenplays.includes(screenPlay.id.toString())) {
                                createProjectAfficheP3Form.setFieldValue("screenplays", [...createProjectAfficheP3Form.values.screenplays.filter(screenPlay => screenPlay !== value), value]);
                            } else {
                                createProjectAfficheP3Form.setFieldValue("screenplays", [...createProjectAfficheP3Form.values.screenplays.filter(screenPlay => screenPlay !== value)]);
                            }
                        }}
                    />

                    <IconButton
                        color="light-info"
                        size="sm"
                        onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/screen-plays/" + screenPlay.id, {state: {background: location}})}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="جزییات"
                    >
                        <LuInfo
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                </div>

                <div className="d-flex flex-column justify-content-start align-items-center gap-5 w-100 h-100">
                    <div className="d-flex justify-content-center align-items-center gap-5 w-100">
                        <Chip
                            label={` قسمت : ${screenPlay?.part} `}
                            color="light-success"
                        />

                        <Chip
                            label={` سکانس : ${screenPlay?.sequence} `}
                            color="light-danger"
                        />
                    </div>

                    <div className="text-truncate-3">
                        {parse(`${screenPlay?.description}`)}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ScreenPlaysDataList = ({
                                 readAllProjectScreenPlayAction,
                                 createProjectAfficheP3Form,
                                 filter,
                                 initialFilter,
                                 changeFilter,
                                 isOpenFilter,
                                 showFilter,
                                 hideFilter,
                                 resetFilter
                             }) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                            <Form.Label
                                label="فیلم نامه ها"
                                size="sm"
                                color="dark"
                                required
                            />

                            <div className="row gy-5 w-100">
                                <ScreenPlaysFilter
                                    filter={filter}
                                    initialFilter={initialFilter}
                                    changeFilter={changeFilter}
                                    isOpenFilter={isOpenFilter}
                                    showFilter={showFilter}
                                    hideFilter={hideFilter}
                                    resetFilter={resetFilter}
                                    readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                                />

                                <div className='row g-5 w-100'>
                                    {
                                        readAllProjectScreenPlayAction.data?.data?.screenplays?.map((screenPlay, i) =>
                                            <ScreenPlayCard
                                                key={i}
                                                screenPlay={screenPlay}
                                                createProjectAfficheP3Form={createProjectAfficheP3Form}
                                            />
                                        )
                                    }
                                </div>

                                <ScreenPlaysFinder
                                    readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                                    filter={filter}
                                    changeFilter={changeFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ScreenPlaysDataList;