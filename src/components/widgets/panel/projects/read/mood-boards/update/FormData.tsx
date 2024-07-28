// libraries
import {useParams} from "react-router-dom";

// modules
import SelectBox from "@/modules/SelectBox.jsx";
import Form from "@/modules/Form.jsx";
import TextInput from "@/modules/TextInput.jsx";
import Button from "@/modules/Button.jsx";

// stores
import useAuthStore from "@/stores/authStore.js";

const FormData = ({updateProjectMoodBoardForm , updateProjectMoodBoardAction}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                    <div className="row gy-5 w-100">
                        <div className="col-12">
                            <Form.Group>
                                {/*<Form.Label*/}
                                {/*    label="عنوان"*/}
                                {/*    color="dark"*/}
                                {/*    size="sm"*/}
                                {/*    required*/}
                                {/*/>*/}

                                {/*<TextInput*/}
                                {/*    name="title"*/}
                                {/*    value={createBlogCategoryForm.values.title}*/}
                                {/*    onChange={(value) => createBlogCategoryForm.setFieldValue("title", value)}*/}
                                {/*/>*/}

                                {/*<Form.Error*/}
                                {/*    error={createBlogCategoryForm.errors.title}*/}
                                {/*    touched={createBlogCategoryForm.touched.title}*/}
                                {/*/>*/}
                            </Form.Group>
                        </div>

                        <div className="col-12">
                            <Form.Group>
                                {/*<Form.Label*/}
                                {/*    label="نامک ( لاتین )"*/}
                                {/*    color="dark"*/}
                                {/*    size="sm"*/}
                                {/*    required*/}
                                {/*/>*/}

                                {/*<TextInput*/}
                                {/*    name="nickname"*/}
                                {/*    value={createBlogCategoryForm.values.nickname}*/}
                                {/*    onChange={(value) => createBlogCategoryForm.setFieldValue("nickname", value)}*/}
                                {/*/>*/}

                                {/*<Form.Error*/}
                                {/*    error={createBlogCategoryForm.errors.nickname}*/}
                                {/*    touched={createBlogCategoryForm.touched.nickname}*/}
                                {/*/>*/}
                            </Form.Group>
                        </div>

                        <div className="col-12">
                            <Form.Group>
                                {/*<Form.Label*/}
                                {/*    label="دسته بندی ( والد )"*/}
                                {/*    color="dark"*/}
                                {/*    size="sm"*/}
                                {/*    required*/}
                                {/*/>*/}

                                {/*<SelectBox*/}
                                {/*    name="parent_id"*/}
                                {/*    value={createBlogCategoryForm.values.parent_id}*/}
                                {/*    options={(!readAllParentBlogCategoryAction.isPending && readAllParentBlogCategoryAction.data) ? [*/}
                                {/*        {id: 0, label: "بدون والد", value: "0"},*/}
                                {/*        ...readAllParentBlogCategoryAction.data?.data?.categories?.map(category => ({*/}
                                {/*            label: category.title,*/}
                                {/*            value: category.id.toString()*/}
                                {/*        }))*/}
                                {/*    ] : []}*/}
                                {/*    isSearchable*/}
                                {/*    onChange={(value) => createBlogCategoryForm.setFieldValue("parent_id", value)}*/}
                                {/*    isLoading={readAllParentBlogCategoryAction.isPending}*/}
                                {/*/>*/}

                                {/*<Form.Error*/}
                                {/*    error={createBlogCategoryForm.errors.parent_id}*/}
                                {/*    touched={createBlogCategoryForm.touched.parent_id}*/}
                                {/*/>*/}
                            </Form.Group>
                        </div>
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
                    color="warning"
                    onClick={updateProjectMoodBoardForm.handleSubmit}
                    isLoading={updateProjectMoodBoardAction.isPending}
                >
                    ویرایش مود بورد
                </Button>
            </div>
        </>
    )
}

export default FormData;