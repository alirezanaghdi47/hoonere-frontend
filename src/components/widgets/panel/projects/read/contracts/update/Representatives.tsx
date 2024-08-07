// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import Form from "@/modules/Form";
import IconButton from "@/modules/IconButton";

export const BlankCard = ({_handleShowModal}) => {
    return (
        <div
            className="d-flex justify-content-center align-items-center gap-2 w-100 h-75px bg-light rounded-2 p-5 cursor-pointer"
            onClick={() => _handleShowModal()}
        >
            <LuPlus
                size={20}
                color="currentColor"
                className="text-muted"
            />

            <Typography
                variant="p"
                size="sm"
                color="muted"
            >
                افزودن نماینده جدید
            </Typography>
        </div>
    )
}

export const RepresentativeCard = ({representative, createUnOfficialLegalPartiesForm}) => {
    return (
        <div
            className="d-flex justify-content-between align-items-center gap-5 w-100 h-125px border border-dashed border-secondary rounded-2 p-5">
            <div className='d-flex justify-content-between align-items-center gap-2 w-100 h-100'>
                <div className="d-flex flex-column justify-content-center align-items-start gap-5">
                    <Typography
                        size="sm"
                        color="dark"
                        isBold
                    >
                        {representative?.full_name}
                    </Typography>

                    <Typography
                        size="sm"
                        color="dark"
                    >
                        {representative?.national_code}
                    </Typography>

                    <Typography
                        size="sm"
                        color="dark"
                    >
                        {representative?.post}
                    </Typography>
                </div>

                <div className="d-flex justify-content-end align-items-center gap-5 h-100">
                    <IconButton
                        color="light-danger"
                        size="sm"
                        onClick={() => createUnOfficialLegalPartiesForm.setFieldValue("representatives", createUnOfficialLegalPartiesForm.values.representatives.filter(item => JSON.stringify(item) !== JSON.stringify(representative)))}
                    >
                        <LuTrash
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

const Representatives = ({createUnOfficialLegalPartiesForm, _handleShowModal}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
            <Form.Label
                label="نمایندگان"
                size="sm"
                color="dark"
            />

            <div className="d-flex flex-column justify-content-start align-items-center gap-5 w-100">
                {
                    createUnOfficialLegalPartiesForm.values.representatives?.map((representative, i) =>
                        <RepresentativeCard
                            key={i}
                            representative={representative}
                            createUnOfficialLegalPartiesForm={createUnOfficialLegalPartiesForm}
                        />
                    )
                }

                <BlankCard _handleShowModal={_handleShowModal}/>
            </div>
        </div>
    )
}

export default Representatives;