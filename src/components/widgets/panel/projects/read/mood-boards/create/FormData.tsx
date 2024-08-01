// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LuInfo} from "react-icons/lu";

// modules
import SelectBox from "@/modules/SelectBox.jsx";
import Form from "@/modules/Form.jsx";
import TextInput from "@/modules/TextInput.jsx";
import Button from "@/modules/Button.jsx";
import Textarea from "@/modules/Textarea.tsx";
import FileInput from "@/modules/FileInput.tsx";

// services
import {readAllProjectMoodBoardTypeService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.js";

const FormData = ({createProjectMoodBoardForm, createProjectMoodBoardAction}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const readAllProjectMoodBoardTypeAction = useMutation({
        mutationFn: (data) => readAllProjectMoodBoardTypeService(data),
    });

    useLayoutEffect(() => {
        readAllProjectMoodBoardTypeAction.mutate();
    }, []);

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                    <div className="row gy-5 w-100">
                        <div className="col-12">
                            <Form.Group>
                                <Form.Label
                                    label="عنوان"
                                    color="dark"
                                    size="sm"
                                    required
                                />

                                <TextInput
                                    id="title"
                                    name="title"
                                    value={createProjectMoodBoardForm.values.title}
                                    onChange={(value) => createProjectMoodBoardForm.setFieldValue("title", value)}
                                />

                                <Form.Error
                                    error={createProjectMoodBoardForm.errors.title}
                                    touched={createProjectMoodBoardForm.touched.title}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-12">
                            <Form.Group>
                                <Form.Label
                                    label="نوع"
                                    color="dark"
                                    size="sm"
                                    required
                                />

                                <SelectBox
                                    id="type"
                                    name="type"
                                    value={createProjectMoodBoardForm.values.type}
                                    options={readAllProjectMoodBoardTypeAction.data?.data?.moodboards?.map(moodboard => ({
                                        label: moodboard.title,
                                        value: moodboard.id.toString(),
                                    }))}
                                    onChange={(value) => createProjectMoodBoardForm.setFieldValue("type", value)}
                                    isLoading={readAllProjectMoodBoardTypeAction.isPending}
                                />

                                <Form.Error
                                    error={createProjectMoodBoardForm.errors.type}
                                    touched={createProjectMoodBoardForm.touched.type}
                                />
                            </Form.Group>
                        </div>

                        {
                            createProjectMoodBoardForm.values.type === "1" && (
                                <div className="col-12">
                                    <Form.Group>
                                        <div className='d-flex justify-content-between align-items-center w-100 gap-5'>
                                            <Form.Label
                                                label="تصویر"
                                                color="dark"
                                                size="sm"
                                                required
                                            />

                                            <span
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="حداکثر حجم تصویر ارسالی 1 مگابایت و فرمت های (png , jpg , jpeg) قابل قبول است"
                                            >
                                                <LuInfo
                                                    size={20}
                                                    color="currentColor"
                                                    className="text-info"
                                                />
                                            </span>
                                        </div>

                                        <FileInput
                                            id="image"
                                            name="image"
                                            value={createProjectMoodBoardForm.values.image}
                                            onChange={(value) => createProjectMoodBoardForm.setFieldValue("image", value)}
                                        />

                                        <Form.Error
                                            error={createProjectMoodBoardForm.errors.image}
                                            touched={createProjectMoodBoardForm.touched.image}
                                        />
                                    </Form.Group>
                                </div>
                            )
                        }

                        {
                            createProjectMoodBoardForm.values.type === "2" && (
                                <div className="col-12">
                                    <Form.Group>
                                        <Form.Label
                                            label="لینک فیلم"
                                            color="dark"
                                            size="sm"
                                            required
                                        />

                                        <TextInput
                                            id="video"
                                            name="video"
                                            value={createProjectMoodBoardForm.values.video}
                                            onChange={(value) => createProjectMoodBoardForm.setFieldValue("video", value)}
                                        />

                                        <Form.Error
                                            error={createProjectMoodBoardForm.errors.video}
                                            touched={createProjectMoodBoardForm.touched.video}
                                        />
                                    </Form.Group>
                                </div>
                            )
                        }

                        {
                            createProjectMoodBoardForm.values.type === "3" && (
                                <div className="col-12">
                                    <Form.Group>
                                        <div className='d-flex justify-content-between align-items-center w-100 gap-5'>
                                            <Form.Label
                                                label="فایل صوتی"
                                                color="dark"
                                                size="sm"
                                                required
                                            />

                                            <span
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="حداکثر حجم فایل صوتی ارسالی 5 مگابایت و فرمت های (mp3 , wav , ogg) قابل قبول است"
                                            >
                                                <LuInfo
                                                    size={20}
                                                    color="currentColor"
                                                    className="text-info"
                                                />
                                            </span>
                                        </div>

                                        <FileInput
                                            id="audio"
                                            name="audio"
                                            value={createProjectMoodBoardForm.values.audio}
                                            onChange={(value) => createProjectMoodBoardForm.setFieldValue("audio", value)}
                                        />

                                        <Form.Error
                                            error={createProjectMoodBoardForm.errors.audio}
                                            touched={createProjectMoodBoardForm.touched.audio}
                                        />
                                    </Form.Group>
                                </div>
                            )
                        }

                        {
                            createProjectMoodBoardForm.values.type === "4" && (
                                <div className="col-12">
                                    <Form.Group>
                                        <Form.Label
                                            label="متن"
                                            color="dark"
                                            size="sm"
                                            required
                                        />

                                        <Textarea
                                            id="text"
                                            name="text"
                                            value={createProjectMoodBoardForm.values.text}
                                            onChange={(value) => createProjectMoodBoardForm.setFieldValue("text", value)}
                                        />

                                        <Form.Error
                                            error={createProjectMoodBoardForm.errors.text}
                                            touched={createProjectMoodBoardForm.touched.text}
                                        />
                                    </Form.Group>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    href={auth.panel_url + "projects/" + params.id + "/mood-boards"}
                    color="light-danger"
                >
                    انصراف
                </Button>

                <Button
                    color="success"
                    onClick={createProjectMoodBoardForm.handleSubmit}
                    isLoading={createProjectMoodBoardAction.isPending}
                >
                    افزودن مود بورد
                </Button>
            </div>
        </>
    )
}

export default FormData;