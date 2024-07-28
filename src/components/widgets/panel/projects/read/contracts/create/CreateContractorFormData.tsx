// libraries
import Loadable from "@loadable/component";
import {LuTrash} from "react-icons/lu";

// components
const CreatePartiesModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/create/CreatePartiesModal.tsx"));

import {Section , Note} from "@/components/partials/panel/projects/read/contracts/Tools.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

const BlankContractorCard = ({createProjectContractForm}) => {
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
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }
        </>
    )
}

const ContractorCard = ({value , createProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                مجری :
                &nbsp;
                علیرضا نقدی
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                به شماره ملی :
                &nbsp;
                1234567890
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                نشانی :
                &nbsp;
                ایران ، تهران
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                کدپستی :
                &nbsp;
                1234567890
            </Typography>

            <Typography
                size="sm"
                color="dark"
            >
                شماره تماس :
                &nbsp;
                1234567890
            </Typography>

            <IconButton
                color="light-danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="حذف مجری"
                className='ms-auto'
                onClick={() => createProjectContractForm.setFieldValue("articles[0].contractors" , createProjectContractForm.values.articles[0].contractors.filter(contractor => contractor !== value))}
            >
                <LuTrash
                    size={20}
                    color="currentColor"
                />
            </IconButton>
        </li>
    )
}

const CreateContractorFormData = ({article , section, createProjectContractForm}) => {
    return (
        <>
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
                            createProjectContractForm.values.articles.find(item => item.number === article.number)?.contractors?.map((subItem , i) =>
                                <ContractorCard
                                    key={i}
                                    value={20}
                                    createProjectContractForm={createProjectContractForm}
                                />
                            )
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
                                        <IconButton
                                            color="light-danger"
                                            size="sm"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="حذف تبصره"
                                            className='ms-auto'
                                            onClick={() => createProjectContractForm.setFieldValue("notes", createProjectContractForm.values.notes.filter(item => item.number !== note.number || item.section_number !== note.section_number || item.article_number !== note.article_number))}
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