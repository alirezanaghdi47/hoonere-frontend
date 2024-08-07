// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";

export const BlankCard = ({changeCurrentPart}) => {
    return (
        <div
            className="col-12"
            onClick={() => changeCurrentPart("create")}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-100px bg-light rounded-2 p-5 cursor-pointer">
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
                    افزودن مورد دلخواه
                </Typography>
            </div>
        </div>
    )
}

export const FieldCard = ({field, createProjectScreenPlayForm}) => {
    return (
        <div className="col-12">
            <div
                className="d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-100px border border-dashed border-secondary rounded-2 p-5">
                <div className='d-flex justify-content-between align-items-center gap-2 w-100 h-100'>
                    <div className="d-flex flex-column justify-content-center align-items-start gap-2">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                            isBold
                        >
                            {field?.title}
                        </Typography>

                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {field?.value}
                        </Typography>
                    </div>

                    <div className="d-flex justify-content-end align-items-start gap-5 h-100">
                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={() => createProjectScreenPlayForm.setFieldValue("fields", createProjectScreenPlayForm.values.fields.filter(item => (item.title && item.value) !== (field.title && field.value)))}
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

const Fields = ({createProjectScreenPlayForm , changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    {
                        createProjectScreenPlayForm.values.fields?.map((item, i) =>
                            <FieldCard
                                key={i}
                                field={item}
                                createProjectScreenPlayForm={createProjectScreenPlayForm}
                            />
                        )
                    }

                    <BlankCard changeCurrentPart={changeCurrentPart}/>
                </div>
            </div>
        </div>
    )
}

export default Fields;