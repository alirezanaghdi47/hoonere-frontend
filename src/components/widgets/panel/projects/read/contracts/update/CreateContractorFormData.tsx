// libraries
import {Fragment} from "react";
import Loadable from "@loadable/component";
import {LuTrash} from "react-icons/lu";

// components
const CreatePartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/update/CreatePartiesModal.tsx"));

import {Section , Note} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

// utils
import {cloneObject, removeNote} from "@/utils/functions.ts";

const BlankContractorCard = ({updateProjectContractForm}) => {
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <li className='d-flex flex-wrap justify-content-start align-items-center gap-5'>
                <Typography
                    size="sm"
                    color="dark"
                >
                    مجری :
                </Typography>

                <Button
                    color="light-dark"
                    size="sm"
                    onClick={() => _handleShowModal({from: "contractor"})}
                >
                    انتخاب مجری
                </Button>
            </li>

            {
                modal.isOpen && (
                    <CreatePartiesModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }
        </>
    )
}

const ContractorRealCard = ({contractor , updateProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                مجری :
                &nbsp;
                {(contractor?.first_name && contractor?.last_name) ? contractor?.first_name + " " + contractor?.last_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به شماره ملی :
                &nbsp;
                {contractor?.national_code ? contractor?.national_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {contractor?.address ? contractor?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {contractor?.postal_code ? contractor?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {contractor?.mobile ? contractor?.mobile : "نا معلوم"}
            </Typography>

            <IconButton
                color="light-danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="حذف مجری"
                className='ms-auto'
                onClick={() => updateProjectContractForm.setFieldValue("articles[0].contractors" , updateProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor)))}
            >
                <LuTrash
                    size={20}
                    color="currentColor"
                />
            </IconButton>
        </li>
    )
}

const ContractorLegalCard = ({contractor , updateProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                کارفرما :
                &nbsp;
                {contractor?.company_name ? contractor?.company_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به شماره ثبت :
                &nbsp;
                {contractor?.register_code ? contractor?.register_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شناسه ملی :
                &nbsp;
                {contractor?.economic_code ? contractor?.economic_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {contractor?.address ? contractor?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {contractor?.postal_code ? contractor?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {contractor?.telephone ? contractor?.telephone : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به نمایندگی :
                &nbsp;
                {
                    contractor?.representatives.length !== 0 && (
                        <Typography
                            size="sm"
                            color="dark"
                        >
                            به نمایندگی :
                            &nbsp;
                            <ul className="hstack justify-content-start gap-5 p-0 m-0">
                                {
                                    contractor?.representatives.map(representative =>
                                        <li
                                            key={representative.id}
                                            className="d-flex justify-content-start align-items-center gap-5"
                                        >
                                            <Typography
                                                size="sm"
                                                color="dark"
                                            >
                                                {representative.full_name}
                                            </Typography>
                                        </li>
                                    )
                                }
                            </ul>
                        </Typography>
                    )
                }
            </Typography>

            <IconButton
                color="light-danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="حذف مجری"
                className='ms-auto'
                onClick={() => updateProjectContractForm.setFieldValue("articles[0].contractors" , updateProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor)))}
            >
                <LuTrash
                    size={20}
                    color="currentColor"
                />
            </IconButton>
        </li>
    )
}

const CreateContractorFormData = ({article , section, updateProjectContractForm}) => {
    return (
        <>
            <Section
                article={article}
                section={section}
                updateProjectContractForm={updateProjectContractForm}
            >
                <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                    <Typography
                        size="sm"
                        color="muted"
                        isBold
                        className="w-30px"
                    >
                        {section.number}-{article.number}
                    </Typography>

                    <ul className="vstack justify-content-center gap-5 p-0 m-0">
                        <BlankContractorCard updateProjectContractForm={updateProjectContractForm}/>

                        {
                            updateProjectContractForm.values.articles.find(item => item.number === article.number)?.contractors?.map(contractor =>
                                <Fragment key={contractor.user_type === "1" ? `contractor-real-${contractor.id}` : `contractor-legal-${contractor.id}`}>
                                    {
                                        contractor.user_type === "1" && (
                                            <ContractorRealCard
                                                contractor={contractor}
                                                updateProjectContractForm={updateProjectContractForm}
                                            />
                                        )
                                    }

                                    {
                                        contractor.user_type === "2" && (
                                            <ContractorLegalCard
                                                contractor={contractor}
                                                updateProjectContractForm={updateProjectContractForm}
                                            />
                                        )
                                    }
                                </Fragment>
                            )
                        }
                    </ul>
                </div>

                {
                    updateProjectContractForm.values.notes.filter(note => note.section_number === section.number && note.article_number === section.article_number).map(note =>
                        <Note
                            key={`${article.number}-${section.number}-${note.number}`}
                            article={article}
                            section={section}
                            note={note}
                            updateProjectContractForm={updateProjectContractForm}
                        >
                            <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                                <Typography
                                    size="xs"
                                    color="muted"
                                    isBold
                                    className="w-60px"
                                >
                                    تبصره
                                    &nbsp;
                                    {note.number}
                                </Typography>

                                <Typography
                                    size="xs"
                                    color="dark"
                                    lineHeight="lg"
                                >
                                    {note.content}
                                </Typography>

                                {
                                    note.isAdded && (
                                        <IconButton
                                            color="light-danger"
                                            size="sm"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="حذف تبصره"
                                            className='ms-auto'
                                            onClick={() => updateProjectContractForm.setFieldValue("notes", removeNote(cloneObject(updateProjectContractForm.values.notes) , note.number))}
                                        >
                                            <LuTrash
                                                size={20}
                                                color="currentColor"
                                            />
                                        </IconButton>
                                    )
                                }
                            </div>
                        </Note>
                    )
                }
            </Section>
        </>
    )
}

export default CreateContractorFormData;