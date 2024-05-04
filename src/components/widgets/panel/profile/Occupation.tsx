// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {useBoolean} from 'usehooks-ts';
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import SelectBox from "@/modules/SelectBox.tsx";
import FileInput from "@/modules/FileInput.tsx";
import Form from "@/modules/Form.tsx";
import Textarea from "@/modules/Textarea.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Typography from "@/modules/Typography.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {jobGetMyFieldsOfActivityService, jobUpdateService} from "@/services/profileService.ts";
import {getAllFieldsOfActivityService} from "@/services/publicService.ts";

// utils
import {profileOccupationSchema, profileOccupation2Schema} from "@/utils/validations.ts";

const TempJobCard = ({onClick}) => {
    return (
        <div
            className="col-12 col-sm-6 col-md-4"
            onClick={onClick}
        >
            <div
                className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100px border-2 border-dashed border-secondary rounded-2 overflow-hidden p-5 cursor-pointer">
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
                    افزودن شغل جدید
                </Typography>
            </div>
        </div>
    )
}

const JobCard = ({group, title , onDelete}) => {
    return (
        <div className="col-12 col-sm-6 col-md-4">
            <div
                className="d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-100px bg-light rounded-2 p-5">
                <div className='d-flex justify-content-between align-items-center gap-2 w-100 h-100'>
                    <div className="d-flex flex-column justify-content-center align-items-start gap-2">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                            isBold
                        >
                            {group}
                        </Typography>

                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {title}
                        </Typography>
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-5">
                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={onDelete}
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

const Occupation = ({me}) => {
    const {value: addCardForm, setTrue: showAddCardForm, setFalse: hideAddCardForm,} = useBoolean();

    const allFieldsOfActivity = useMutation({
        mutationFn: () => getAllFieldsOfActivityService(),
    });

    const jobGetMyFieldsOfActivity = useMutation({
        mutationFn: () => jobGetMyFieldsOfActivityService(),
    });

    const {mutate, isPending} = useMutation({
        mutationFn: (data) => jobUpdateService(data),
        onSuccess: async (data) => {
            console.log(data)
            if (!data.error) {
                toast("success", data.message);
            } else {
                toast("error", data.message);
            }
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            foa_parent_id: null,
            foa_child_id: null,
        },
        validationSchema: profileOccupationSchema,
        onSubmit: async (result, {resetForm}) => {
            const oldFoaArray = formik2.values.fields_of_activity;
            let newFoaArray = oldFoaArray.filter(foa => JSON.stringify(foa) !== JSON.stringify(result));

            newFoaArray.push(result);

            await formik2.setFieldValue("fields_of_activity", newFoaArray);

            hideAddCardForm();
            resetForm();
        },
        onReset: async () => {
            hideAddCardForm();
        }
    });

    const formik2 = useFormik({
        enableReinitialize: true,
        initialValues: {
            fields_of_activity: [],
            resume_file: {},
            resume_text: me?.data?.data?.userInfo?.resume_text ? me?.data?.data?.userInfo?.resume_text : "",
        },
        validationSchema: profileOccupation2Schema,
        onSubmit: async (result) => {
            mutate(result);
        }
    });

    useLayoutEffect(() => {
        allFieldsOfActivity.mutate();
        jobGetMyFieldsOfActivity.mutate();
    }, []);

    console.log(jobGetMyFieldsOfActivity.data)

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column gap-5">
                    <div className="row">
                        <Typography
                            variant="h2"
                            size="md"
                            color="dark"
                            isBold
                        >
                            شغل ها
                        </Typography>
                    </div>

                    <div className="row gy-5">
                        <JobCard
                            group="گروه 1"
                            title="عنوان 1"
                        />

                        {
                            !addCardForm && (
                                <TempJobCard
                                    onClick={showAddCardForm}
                                />
                            )
                        }
                    </div>

                    {
                        addCardForm && (
                            <>
                                <div className="row gy-2 mt-10">
                                    <div className="col-lg-4">
                                        <Form.Label
                                            label="گروه شغلی"
                                            required
                                            size="sm"
                                            color="dark"
                                        />
                                    </div>

                                    <div className="col-lg-8">
                                        <Form.Group>
                                            <SelectBox
                                                name="foa_parent_id"
                                                value={formik.values.foa_parent_id}
                                                options={allFieldsOfActivity?.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null).map(item => ({
                                                    label: item.title,
                                                    value: item.id
                                                }))}
                                                placeholder=""
                                                isSearchable
                                                onChange={(value) => formik.setFieldValue("foa_parent_id", value)}
                                            />

                                            <Form.Error
                                                error={formik.errors.foa_parent_id}
                                                touched={formik.touched.foa_parent_id}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row gy-2">
                                    <div className="col-lg-4">
                                        <Form.Label
                                            label="عنوان شغلی"
                                            required
                                            size="sm"
                                            color="dark"
                                        />
                                    </div>

                                    <div className="col-lg-8">
                                        <Form.Group>
                                            <SelectBox
                                                name="foa_child_id"
                                                value={formik.values.foa_child_id}
                                                options={allFieldsOfActivity?.data?.data?.fieldsOfActivity?.filter(foa => parseInt(foa.parent_id) === parseInt(formik.values.foa_parent_id)).map(item => ({
                                                    label: item.title,
                                                    value: item.id
                                                }))}
                                                placeholder=""
                                                isSearchable
                                                disabled={!formik.values.foa_parent_id}
                                                onChange={(value) => formik.setFieldValue("foa_child_id", value)}
                                            />

                                            <Form.Error
                                                error={formik.errors.foa_child_id}
                                                touched={formik.touched.foa_child_id}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row gy-2">
                                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                                        <Button
                                            color="light-danger"
                                            onClick={formik.handleReset}
                                        >
                                            انصراف
                                        </Button>

                                        <Button
                                            color="primary"
                                            onClick={formik.handleSubmit}
                                        >
                                            افزودن
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <div className="card w-100">
                <div className="card-body d-flex flex-column gap-5">
                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="رزومه ( عکس یا pdf )"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <FileInput
                                    name="resume_file"
                                    preview={me?.data?.data?.userInfo?.resume_file}
                                    value={formik2.values.resume_file}
                                    onChange={(value) => formik2.setFieldValue("resume_file", value)}
                                />

                                <Form.Error
                                    error={formik2.errors.resume_file}
                                    touched={formik2.touched.resume_file}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="رزومه متنی"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <Textarea
                                    name="resume_text"
                                    value={formik2.values.resume_text}
                                    onChange={(value) => formik2.setFieldValue("resume_text", value)}
                                />

                                <Form.Error
                                    error={formik2.errors.resume_text}
                                    touched={formik2.touched.resume_text}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="primary"
                    onClick={formik2.handleSubmit}
                    disabled={isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default Occupation;