// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Button from "@/modules/Button.tsx";

export const BlankCard = ({changeCurrentPart}) => {
    return (
        <div
            className="col-12 col-md-6"
            onClick={() => changeCurrentPart("create")}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-150px bg-light rounded-2 p-5 cursor-pointer">
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
        </div>
    )
}

export const RepresentativeCard = ({representative , updateProfileLegalForm}) => {
    return (
        <div className="col-12 col-md-6">
            <div
                className="d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-150px border border-dashed border-secondary rounded-2 p-5">
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

                    <div className="d-flex justify-content-end align-items-start gap-5 h-100">
                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={() => updateProfileLegalForm.setFieldValue("representatives" , updateProfileLegalForm.values.representatives.filter(item => JSON.stringify(item) !== JSON.stringify(representative)))}
                        >
                            <LuTrash
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Representatives = ({updateProfileLegalForm , updateProfileIdentityAction, changeCurrentPart}) => {
    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                    <div className="row gy-5 w-100">
                        <div className="col-12">
                            <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                                <Form.Label
                                    label="نمایندگان"
                                    size="sm"
                                    color="dark"
                                />

                                <div className="row g-5 w-100">
                                    {
                                        updateProfileLegalForm.values.representatives?.map((representative , i) =>
                                            <RepresentativeCard
                                                key={i}
                                                representative={representative}
                                                updateProfileLegalForm={updateProfileLegalForm}
                                            />
                                        )
                                    }

                                    <BlankCard changeCurrentPart={changeCurrentPart}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="success"
                    onClick={updateProfileLegalForm.handleSubmit}
                    isLoading={updateProfileIdentityAction.isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default Representatives;