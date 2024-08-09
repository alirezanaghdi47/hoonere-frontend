// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/create/Actions.tsx";

// modules
import Typography from "@/modules/Typography";

const ContractorOfficialRealCard = ({contractor}) => {
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
                به کد ملی :
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
        </li>
    )
}

const ContractorUnOfficialRealCard = ({contractor}) => {
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
                به کد ملی :
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
        </li>
    )
}

const ContractorOfficialLegalCard = ({contractor}) => {
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
        </li>
    )
}

const ContractorUnOfficialLegalCard = ({contractor}) => {
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
        </li>
    )
}

const CreateContractorFormData = ({article , section, createProjectContractInsertionForm}) => {
    return (
        <Section section={section}>
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
                        createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.contractors?.map(contractor => {
                            // رسمی و حقیقی
                            if (contractor.hasOwnProperty("user_info") && contractor?.user_info?.user_type === "1"){
                                return (
                                    <ContractorOfficialRealCard
                                        key={contractor?.user_info?.id}
                                        contractor={contractor}
                                    />
                                )
                            }

                            // رسمی و حقوقی
                            if (contractor.hasOwnProperty("user_info") && contractor?.user_info?.user_type === "2"){
                                return (
                                    <ContractorOfficialLegalCard
                                        key={contractor?.user_info?.id}
                                        contractor={contractor}
                                    />
                                )
                            }

                            // غیر رسمی و حقیقی
                            if (!contractor.hasOwnProperty("user_info") && contractor?.user_type === "1"){
                                return (
                                    <ContractorUnOfficialRealCard
                                        key={contractor?.id}
                                        contractor={contractor}
                                    />
                                )
                            }

                            // غیر رسمی و حقوقی
                            if (!contractor.hasOwnProperty("user_info") && contractor?.user_type === "2"){
                                return (
                                    <ContractorUnOfficialLegalCard
                                        key={contractor?.id}
                                        contractor={contractor}
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

export default CreateContractorFormData;