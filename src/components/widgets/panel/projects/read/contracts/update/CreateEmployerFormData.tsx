// libraries
import {useLocation} from "react-router-dom";
import Loadable from "@loadable/component";
import {LuPen, LuTrash} from "react-icons/lu";

// components
const CreateOfficialPartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/update/CreateOfficialPartiesModal.tsx"));
const CreateUnOfficialPartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/update/CreateUnOfficialPartiesModal.tsx"));

import {Section, Note} from "@/components/widgets/panel/projects/read/contracts/update/Actions.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography";
import Button from "@/modules/Button";
import IconButton from "@/modules/IconButton";

// utils
import {removeNoteForContract} from "@/utils/functions.ts";

const BlankEmployerCard = ({updateProjectContractForm}) => {
    const location = useLocation();
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
                location.hash === "#official" && modal.isOpen && (
                    <CreateOfficialPartiesModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }

            {
                location.hash === "#un-official" && modal.isOpen && (
                    <CreateUnOfficialPartiesModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }
        </>
    )
}

const EmployerOfficialRealCard = ({employer, updateProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                کارفرما :
                &nbsp;
                {(employer?.user_info?.first_name && employer?.user_info?.last_name) ? employer?.user_info?.first_name + " " + employer?.user_info?.last_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به کد ملی :
                &nbsp;
                {employer?.user_info?.national_code ? employer?.user_info?.national_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {employer?.user_info?.address ? employer?.user_info?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {employer?.user_info?.postal_code ? employer?.user_info?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {employer?.user_info?.mobile ? employer?.user_info?.mobile : "نا معلوم"}
            </Typography>

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف کارفرما"
                    onClick={() => {
                        updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${updateProjectContractForm.values.articles.length + 1} ماده و ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].employers.length - 1} نسخه تنظیم گردیده و هر کدام از ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].employers.length - 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

                        updateProjectContractForm.setFieldValue("articles[0].employers", updateProjectContractForm.values.articles[0].employers.filter(item => JSON.stringify(item) !== JSON.stringify(employer?.user_info)));
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

const EmployerUnOfficialRealCard = ({employer, updateProjectContractForm}) => {
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

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف کارفرما"
                    onClick={() => {
                        updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${updateProjectContractForm.values.articles.length + 1} ماده و ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].employers.length - 1} نسخه تنظیم گردیده و هر کدام از ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].employers.length - 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

                        updateProjectContractForm.setFieldValue("articles[0].employers", updateProjectContractForm.values.articles[0].employers.filter(item => JSON.stringify(item) !== JSON.stringify(employer)));
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

const EmployerOfficialLegalCard = ({employer, updateProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                کارفرما :
                &nbsp;
                {employer?.user_info?.company_name ? employer?.user_info?.company_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به شماره ثبت :
                &nbsp;
                {employer?.user_info?.register_code ? employer?.user_info?.register_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شناسه ملی :
                &nbsp;
                {employer?.user_info?.economic_code ? employer?.user_info?.economic_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {employer?.user_info?.address ? employer?.user_info?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {employer?.user_info?.postal_code ? employer?.user_info?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {employer?.user_info?.telephone ? employer?.user_info?.telephone : "نا معلوم"}
            </Typography>

            {
                employer?.user_info?.representatives.length !== 0 && (
                    <div className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                        <Typography
                            size="sm"
                            color="dark"
                        >
                            به نمایندگی :
                        </Typography>

                        <ul className="vstack justify-content-start gap-5 p-0 m-0">
                            {
                                employer?.user_info?.representatives.map((representative , index) =>
                                    <li
                                        key={representative.id}
                                        className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-2"
                                    >
                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {index + 1} .
                                        </Typography>

                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {representative.full_name}
                                        </Typography>

                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {representative.national_code}
                                        </Typography>

                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {representative.post}
                                        </Typography>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف کارفرما"
                    onClick={() => updateProjectContractForm.setFieldValue("articles[0].employers", updateProjectContractForm.values.articles[0].employers.filter(item => JSON.stringify(item) !== JSON.stringify(employer?.user_info)))}
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

const EmployerUnOfficialLegalCard = ({employer, updateProjectContractForm}) => {
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
                    <div className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                        <Typography
                            size="sm"
                            color="dark"
                        >
                            به نمایندگی :
                        </Typography>

                        <ul className="vstack justify-content-start gap-5 p-0 m-0">
                            {
                                employer?.representatives.map((representative , index) =>
                                    <li
                                        key={representative.id}
                                        className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-2"
                                    >
                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {index + 1} .
                                        </Typography>

                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {representative.full_name}
                                        </Typography>

                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {representative.national_code}
                                        </Typography>

                                        <Typography
                                            size="sm"
                                            color="dark"
                                        >
                                            {representative.post}
                                        </Typography>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف کارفرما"
                    onClick={() => updateProjectContractForm.setFieldValue("articles[0].employers", updateProjectContractForm.values.articles[0].employers.filter(item => JSON.stringify(item) !== JSON.stringify(employer)))}
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

const CreateEmployerFormData = ({article, section ,updateProjectContractForm}) => {
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
                    <BlankEmployerCard updateProjectContractForm={updateProjectContractForm}/>

                    {
                        updateProjectContractForm.values.articles.find(item => item.number === article.number)?.employers?.map(employer => {
                            // رسمی و حقیقی
                            if (employer.hasOwnProperty("user_info") && employer?.user_info?.user_type === "1"){
                                return (
                                    <EmployerOfficialRealCard
                                        key={employer?.user_info?.id}
                                        employer={employer}
                                        updateProjectContractForm={updateProjectContractForm}
                                    />
                                )
                            }

                            // رسمی و حقوقی
                            if (employer.hasOwnProperty("user_info") && employer?.user_info?.user_type === "2"){
                                return (
                                    <EmployerOfficialLegalCard
                                        key={employer?.user_info?.id}
                                        employer={employer}
                                        updateProjectContractForm={updateProjectContractForm}
                                    />
                                )
                            }

                            // غیر رسمی و حقیقی
                            if (!employer.hasOwnProperty("user_info") && employer?.user_type === "1"){
                                return (
                                    <EmployerUnOfficialRealCard
                                        key={employer?.id}
                                        employer={employer}
                                        updateProjectContractForm={updateProjectContractForm}
                                    />
                                )
                            }

                            // غیر رسمی و حقوقی
                            if (!employer.hasOwnProperty("user_info") && employer?.user_type === "2"){
                                return (
                                    <EmployerUnOfficialLegalCard
                                        key={employer?.id}
                                        employer={employer}
                                        updateProjectContractForm={updateProjectContractForm}
                                    />
                                )
                            }
                        })
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
                                    onClick={() => updateProjectContractForm.setFieldValue("notes", removeNoteForContract(updateProjectContractForm.values.notes, note.number))}
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
    )
}

export default CreateEmployerFormData;