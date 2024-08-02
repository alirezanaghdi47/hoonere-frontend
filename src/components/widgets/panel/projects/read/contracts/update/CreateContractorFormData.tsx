// libraries
import {Fragment} from "react";
import Loadable from "@loadable/component";
import {LuPen, LuTrash} from "react-icons/lu";

// components
const CreatePartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/update/CreatePartiesModal.tsx"));

import {Section , Note} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

// utils
import {removeNote} from "@/utils/functions.ts";

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

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف مجری"
                    onClick={() => {
                        updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${updateProjectContractForm.values.articles.length + 1} ماده و ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length - 1} نسخه تنظیم گردیده و هر کدام از ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length - 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

                        updateProjectContractForm.setFieldValue("articles[0].contractors", updateProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor)));
                    }}
                >
                    <LuTrash
                        size={20}
                        color="currentColor"
                    />
                </IconButton>
            </div>
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

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف مجری"
                    onClick={() => updateProjectContractForm.setFieldValue("articles[0].contractors" , updateProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor)))}
                >
                    <LuTrash
                        size={20}
                        color="currentColor"
                    />
                </IconButton>
            </div>
        </li>
    )
}

const CreateContractorFormData = ({article , section, updateProjectContractForm}) => {
    const {
        part: notePart,
        currentPart: noteCurrentPart,
        changePart: noteChangePart,
        resetPart: noteResetPart,
        changeCurrentPart: noteChangeCurrentPart
    } = usePart(null, "read");

    const {
        part: sectionPart,
        currentPart: sectionCurrentPart,
        changePart: sectionChangePart,
        resetPart: sectionResetPart,
        changeCurrentPart: sectionChangeCurrentPart
    } = usePart(null, "read");

    return (
        <>
            <Section
                article={article}
                section={section}
                updateProjectContractForm={updateProjectContractForm}
                part={sectionPart}
                currentPart={sectionCurrentPart}
                resetPart={sectionResetPart}
                changeCurrentPart={sectionChangeCurrentPart}
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
                            part={notePart}
                            currentPart={noteCurrentPart}
                            resetPart={noteResetPart}
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

                                <div className='ms-auto'>
                                    <IconButton
                                        color="light-warning"
                                        size="sm"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="ویرایش تبصره"
                                        onClick={() => {
                                            noteChangePart({
                                                article_number: note.article_number,
                                                section_number: note.section_number,
                                                number: note.number
                                            });
                                            noteChangeCurrentPart("update");
                                        }}
                                    >
                                        <LuPen
                                            size={20}
                                            color="currentColor"
                                        />
                                    </IconButton>
                                </div>

                                <div>
                                    <IconButton
                                        color="light-danger"
                                        size="sm"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="حذف تبصره"
                                        onClick={() => {
                                            const notes = removeNote(updateProjectContractForm.values.notes, note.number);
                                            updateProjectContractForm.setFieldValue("notes", notes);
                                        }}
                                    >
                                        <LuTrash
                                            size={20}
                                            color="currentColor"
                                        />
                                    </IconButton>
                                </div>
                            </div>
                        </Note>
                    )
                }
            </Section>
        </>
    )
}

export default CreateContractorFormData;