// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/update/Actions.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography";

const EmployerOfficialRealCard = ({employer}) => {
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
        </li>
    )
}

const EmployerUnOfficialRealCard = ({employer}) => {
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
        </li>
    )
}

const EmployerOfficialLegalCard = ({employer}) => {
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
        </li>
    )
}

const EmployerUnOfficialLegalCard = ({employer}) => {
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
        </li>
    )
}

const CreateEmployerFormData = ({article, section ,updateProjectContractInsertionForm}) => {
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
            updateProjectContractInsertionForm={updateProjectContractInsertionForm}
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
                    {
                        updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.employers?.map(employer => {
                            // رسمی و حقیقی
                            if (employer.hasOwnProperty("user_info") && employer?.user_info?.user_type === "1"){
                                return (
                                    <EmployerOfficialRealCard
                                        key={employer?.user_info?.id}
                                        employer={employer}
                                    />
                                )
                            }

                            // رسمی و حقوقی
                            if (employer.hasOwnProperty("user_info") && employer?.user_info?.user_type === "2"){
                                return (
                                    <EmployerOfficialLegalCard
                                        key={employer?.user_info?.id}
                                        employer={employer}
                                    />
                                )
                            }

                            // غیر رسمی و حقیقی
                            if (!employer.hasOwnProperty("user_info") && employer?.user_type === "1"){
                                return (
                                    <EmployerUnOfficialRealCard
                                        key={employer?.id}
                                        employer={employer}
                                    />
                                )
                            }

                            // غیر رسمی و حقوقی
                            if (!employer.hasOwnProperty("user_info") && employer?.user_type === "2"){
                                return (
                                    <EmployerUnOfficialLegalCard
                                        key={employer?.id}
                                        employer={employer}
                                    />
                                )
                            }
                        })
                    }
                </ul>
            </div>
        </Section>
    )
}

export default CreateEmployerFormData;