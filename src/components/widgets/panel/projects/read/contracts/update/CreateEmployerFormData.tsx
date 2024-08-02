// libraries
import {Fragment} from "react";
import Loadable from "@loadable/component";
import {LuTrash} from "react-icons/lu";

// components
const CreatePartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/update/CreatePartiesModal.tsx"));

import {Section, Note} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

// utils
import {removeNote} from "@/utils/functions.ts";

const BlankEmployerCard = ({updateProjectContractForm}) => {
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <li className='d-flex flex-wrap justify-content-start align-items-center gap-5'>
                <Typography
                    size="sm"
                    color="dark"
                >
                    کارفرما :
                </Typography>

                <Button
                    color="light-dark"
                    size="sm"
                    onClick={() => _handleShowModal({from: "employer"})}
                >
                    انتخاب کارفرما
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

const EmployerRealCard = ({employer, updateProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                کارفرما :
                &nbsp;
                {(employer?.first_name && employer?.last_name) ? employer?.first_name + " " + employer?.last_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به کد ملی :
                &nbsp;
                {employer?.national_code ? employer?.national_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {employer?.address ? employer?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {employer?.postal_code ? employer?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {employer?.mobile ? employer?.mobile : "نا معلوم"}
            </Typography>

            <IconButton
                color="light-danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="حذف کارفرما"
                className='ms-auto'
                onClick={() => updateProjectContractForm.setFieldValue("articles[0].employers", updateProjectContractForm.values.articles[0].employers.filter(item => JSON.stringify(item) !== JSON.stringify(employer)))}
            >
                <LuTrash
                    size={20}
                    color="currentColor"
                />
            </IconButton>
        </li>
    )
}

const EmployerLegalCard = ({employer, updateProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                کارفرما :
                &nbsp;
                {employer?.company_name ? employer?.company_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به شماره ثبت :
                &nbsp;
                {employer?.register_code ? employer?.register_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شناسه ملی :
                &nbsp;
                {employer?.economic_code ? employer?.economic_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {employer?.address ? employer?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {employer?.postal_code ? employer?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {employer?.telephone ? employer?.telephone : "نا معلوم"}
            </Typography>

            {
                employer?.representatives.length !== 0 && (
                    <Typography
                        size="sm"
                        color="dark"
                    >
                        به نمایندگی :
                        &nbsp;
                        <ul className="hstack justify-content-start gap-5 p-0 m-0">
                            {
                                employer?.representatives.map(representative =>
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

            <IconButton
                color="light-danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="حذف کارفرما"
                className='ms-auto'
                onClick={() => updateProjectContractForm.setFieldValue("articles[0].employers", updateProjectContractForm.values.articles[0].employers.filter(item => JSON.stringify(item) !== JSON.stringify(employer)))}
            >
                <LuTrash
                    size={20}
                    color="currentColor"
                />
            </IconButton>
        </li>
    )
}

const CreateEmployerFormData = ({article, section, updateProjectContractForm}) => {
    return (
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
                    <BlankEmployerCard updateProjectContractForm={updateProjectContractForm}/>

                    {
                        updateProjectContractForm.values.articles.find(item => item.number === article.number)?.employers?.map(employer =>
                            <Fragment
                                key={employer.user_type === "1" ? `employer-real-${employer.id}` : `employer-legal-${employer.id}`}>
                                {
                                    employer.user_type === "1" && (
                                        <EmployerRealCard
                                            employer={employer}
                                            updateProjectContractForm={updateProjectContractForm}
                                        />
                                    )
                                }

                                {
                                    employer.user_type === "2" && (
                                        <EmployerLegalCard
                                            employer={employer}
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
                                        onClick={() => {
                                            const notes = removeNote(updateProjectContractForm.values.notes , note.number);
                                            updateProjectContractForm.setFieldValue("notes", notes);
                                        }}
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
    )
}

export default CreateEmployerFormData;