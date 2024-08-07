// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {LuX} from "react-icons/lu";

// modules
import Modal from "@/modules/Modal";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import SelectBox from "@/modules/SelectBox";
import Form from "@/modules/Form";
import Button from "@/modules/Button";

// services
import {readAllProjectContractMemberService} from "@/services/projectContractService";
import {readAllJobService} from "@/services/publicService";

// utils
import {createPartiesSchema} from "@/utils/validations.ts";

const CreateOfficialPartiesModal = ({modal, _handleHideModal, updateProjectContractForm}) => {
    const params = useParams();

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const readAllProjectContractMemberAction = useMutation({
        mutationFn: (data) => readAllProjectContractMemberService(data),
    });

    const createPartiesForm = useFormik({
        initialValues: {
            foa_parent_id: "",
            foa_child_id: "",
            user_info: {},
        },
        validationSchema: createPartiesSchema,
        onSubmit: async (result, {resetForm}) => {
            if (modal?.data?.from === "employer") {
                const newArray = [...updateProjectContractForm.values.articles[0].employers, result.user_info];

                updateProjectContractForm.setFieldValue("articles[0].employers", newArray);

                updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${updateProjectContractForm.values.articles.length} ماده و ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length + 1} نسخه تنظیم گردیده و هر کدام از ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length + 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);
            } else if (modal?.data?.from === "contractor") {
                const newArray = [...updateProjectContractForm.values.articles[0].contractors, result.user_info];

                updateProjectContractForm.setFieldValue("articles[0].contractors", newArray);

                updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${updateProjectContractForm.values.articles.length} ماده و ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length + 1} نسخه تنظیم گردیده و هر کدام از ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length + 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);
            }

            resetForm();

            _handleHideModal();
        },
        onReset: async () => {
            _handleHideModal();
        }
    });

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    useLayoutEffect(() => {
        if (createPartiesForm.values.foa_parent_id && createPartiesForm.values.foa_child_id) {
            readAllProjectContractMemberAction.mutate({
                project_id: params.id,
                foa_parent_id: createPartiesForm.values.foa_parent_id,
                foa_child_id: createPartiesForm.values.foa_child_id
            });
        }
    }, [createPartiesForm.values.foa_parent_id, createPartiesForm.values.foa_child_id]);

    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={_handleHideModal}
            position='center'
            width="lg"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    انتخاب
                    &nbsp;
                    {modal?.data?.from === "employer" ? "کارفرما" : "مجری"}
                </Typography>

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={_handleHideModal}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                <div
                    className='d-flex flex-column flex-md-row justify-content-start align-items-start gap-5 w-100 h-100 p-5'>
                    <Form.Group>
                        <Form.Label
                            label="گروه شغلی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <SelectBox
                            id="foa_parent_id"
                            name="foa_parent_id"
                            value={createPartiesForm.values.foa_parent_id}
                            options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null).map(item => ({
                                label: item.title,
                                value: item.id.toString()
                            }))}
                            isSearchable
                            onChange={(value) => {
                                createPartiesForm.setFieldValue("foa_child_id", "");
                                createPartiesForm.setFieldValue("user_id", "");
                                createPartiesForm.setFieldValue("foa_parent_id", value);
                            }}
                            isLoading={readAllJobAction.isPending}
                        />

                        <Form.Error
                            error={createPartiesForm.errors.foa_parent_id}
                            touched={createPartiesForm.touched.foa_parent_id}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="عنوان شغلی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <SelectBox
                            id="foa_child_id"
                            name="foa_child_id"
                            value={createPartiesForm.values.foa_child_id}
                            options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && foa.parent_id === parseInt(createPartiesForm.values.foa_parent_id)).map(item => ({
                                label: item.title,
                                value: item.id.toString()
                            }))}
                            isSearchable
                            onChange={(value) => {
                                createPartiesForm.setFieldValue("user_id", "");
                                createPartiesForm.setFieldValue("foa_child_id", value);
                            }}
                            disabled={!createPartiesForm.values.foa_parent_id}
                            isLoading={readAllJobAction.isPending}
                        />

                        <Form.Error
                            error={createPartiesForm.errors.foa_child_id}
                            touched={createPartiesForm.touched.foa_child_id}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="کاربر"
                            required
                            size="sm"
                            color="dark"
                        />

                        <SelectBox
                            id="user_info"
                            name="user_info"
                            value={JSON.stringify(createPartiesForm.values.user_info)}
                            options={readAllProjectContractMemberAction.data?.data?.members?.map(item => ({
                                label: item.user_info?.first_name + " " + item.user_info?.last_name,
                                value: JSON.stringify(item.user_info)
                            }))}
                            isSearchable
                            onChange={(value) => createPartiesForm.setFieldValue("user_info", JSON.parse(value))}
                            disabled={!createPartiesForm.values.foa_parent_id || !createPartiesForm.values.foa_child_id}
                            isLoading={readAllProjectContractMemberAction.isPending}
                        />

                        <Form.Error
                            error={createPartiesForm.errors.user_info}
                            touched={createPartiesForm.touched.user_info}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={createPartiesForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={createPartiesForm.handleSubmit}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateOfficialPartiesModal;