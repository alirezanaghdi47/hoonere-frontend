// libraries
import {useLocation} from "react-router-dom";
import Loadable from "@loadable/component";
import {LuTrash} from "react-icons/lu";

// ?????
import {removeNoteForContract} from "@/components/widgets/panel/projects/read/contracts/Action.tsx";

// components
const CreateOfficialPartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/create/CreateOfficialPartiesModal.tsx"));
const CreateUnOfficialPartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/create/CreateUnOfficialPartiesModal.tsx"));

import {Section , Note} from "@/components/widgets/panel/projects/read/contracts/create/Actions.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography";
import Button from "@/modules/Button";
import IconButton from "@/modules/IconButton";

const BlankContractorCard = ({createProjectContractForm}) => {
    const location = useLocation();
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
                location.hash === "#official" && modal.isOpen && (
                    <CreateOfficialPartiesModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }

            {
                location.hash === "#un-official" && modal.isOpen && (
                    <CreateUnOfficialPartiesModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }
        </>
    )
}

const ContractorOfficialRealCard = ({contractor , createProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                مجری :
                &nbsp;
                {(contractor?.user_info?.first_name && contractor?.user_info?.last_name) ? contractor?.user_info?.first_name + " " + contractor?.user_info?.last_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به شماره ملی :
                &nbsp;
                {contractor?.user_info?.national_code ? contractor?.user_info?.national_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {contractor?.user_info?.address ? contractor?.user_info?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {contractor?.user_info?.postal_code ? contractor?.user_info?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {contractor?.user_info?.mobile ? contractor?.user_info?.mobile : "نا معلوم"}
            </Typography>

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف مجری"
                    onClick={() => {
                        createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length + 1} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length - 1} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length - 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

                        createProjectContractForm.setFieldValue("articles[0].contractors", createProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor?.user_info)));
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

const ContractorUnOfficialRealCard = ({contractor , createProjectContractForm}) => {
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
                        createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length + 1} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length - 1} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length - 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

                        createProjectContractForm.setFieldValue("articles[0].contractors", createProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor)));
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

const ContractorOfficialLegalCard = ({contractor , createProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                مجری :
                &nbsp;
                {contractor?.user_info?.company_name ? contractor?.user_info?.company_name : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به شماره ثبت :
                &nbsp;
                {contractor?.user_info?.register_code ? contractor?.user_info?.register_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شناسه ملی :
                &nbsp;
                {contractor?.user_info?.economic_code ? contractor?.user_info?.economic_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                {contractor?.user_info?.address ? contractor?.user_info?.address : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                {contractor?.user_info?.postal_code ? contractor?.user_info?.postal_code : "نا معلوم"}
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                {contractor?.user_info?.telephone ? contractor?.user_info?.telephone : "نا معلوم"}
            </Typography>

            {
                contractor?.user_info?.representatives.length !== 0 && (
                    <div className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                        <Typography
                            size="sm"
                            color="dark"
                        >
                            به نمایندگی :
                        </Typography>

                        <ul className="vstack justify-content-start gap-5 p-0 m-0">
                            {
                                contractor?.user_info?.representatives.map((representative , index) =>
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
                    data-tooltip-content="حذف مجری"
                    onClick={() => createProjectContractForm.setFieldValue("articles[0].contractors" , createProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor?.user_info)))}
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

const ContractorUnOfficialLegalCard = ({contractor , createProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                مجری :
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

            {
                contractor?.representatives.length !== 0 && (
                    <div className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                        <Typography
                            size="sm"
                            color="dark"
                        >
                            به نمایندگی :
                        </Typography>

                        <ul className="vstack justify-content-start gap-5 p-0 m-0">
                            {
                                contractor?.representatives.map((representative , index) =>
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
                    data-tooltip-content="حذف مجری"
                    onClick={() => createProjectContractForm.setFieldValue("articles[0].contractors" , createProjectContractForm.values.articles[0].contractors.filter(item => JSON.stringify(item) !== JSON.stringify(contractor)))}
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

const CreateContractorFormData = ({article , section, createProjectContractForm}) => {
    return (
        <Section
            article={article}
            section={section}
            createProjectContractForm={createProjectContractForm}
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
                    <BlankContractorCard createProjectContractForm={createProjectContractForm}/>

                    {
                        createProjectContractForm.values.articles.find(item => item.number === article.number)?.contractors?.map(contractor => {
                            // رسمی و حقیقی
                            if (contractor.hasOwnProperty("user_info") && contractor?.user_info?.user_type === "1"){
                                return (
                                    <ContractorOfficialRealCard
                                        key={contractor?.user_info?.id}
                                        contractor={contractor}
                                        createProjectContractForm={createProjectContractForm}
                                    />
                                )
                            }

                            // رسمی و حقوقی
                            if (contractor.hasOwnProperty("user_info") && contractor?.user_info?.user_type === "2"){
                                return (
                                    <ContractorOfficialLegalCard
                                        key={contractor?.user_info?.id}
                                        contractor={contractor}
                                        createProjectContractForm={createProjectContractForm}
                                    />
                                )
                            }

                            // غیر رسمی و حقیقی
                            if (!contractor.hasOwnProperty("user_info") && contractor?.user_type === "1"){
                                return (
                                    <ContractorUnOfficialRealCard
                                        key={contractor?.id}
                                        contractor={contractor}
                                        createProjectContractForm={createProjectContractForm}
                                    />
                                )
                            }

                            // غیر رسمی و حقوقی
                            if (!contractor.hasOwnProperty("user_info") && contractor?.user_type === "2"){
                                return (
                                    <ContractorUnOfficialLegalCard
                                        key={contractor?.id}
                                        contractor={contractor}
                                        createProjectContractForm={createProjectContractForm}
                                    />
                                )
                            }
                        })
                    }
                </ul>
            </div>

            {
                createProjectContractForm.values.notes.filter(note => note.section_number === section.number && note.article_number === section.article_number).map(note =>
                    <Note
                        key={`${article.number}-${section.number}-${note.number}`}
                        article={article}
                        section={section}
                        note={note}
                        createProjectContractForm={createProjectContractForm}
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
                                    <div className='ms-auto'>
                                        <IconButton
                                            color="light-danger"
                                            size="sm"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="حذف تبصره"
                                            onClick={() => {
                                                const notes = removeNoteForContract(createProjectContractForm.values.notes , note.number);
                                                createProjectContractForm.setFieldValue("notes", notes);
                                            }}
                                        >
                                            <LuTrash
                                                size={20}
                                                color="currentColor"
                                            />
                                        </IconButton>
                                    </div>
                                )
                            }
                        </div>
                    </Note>
                )
            }
        </Section>
    )
}

export default CreateContractorFormData;