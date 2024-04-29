// libraries
import {useDropzone} from 'react-dropzone';
import {LuFileUp} from "react-icons/lu";

// utils
import {formattedSize} from "@/utils/functions";

const FileInput = ({name, value, onChange}) => {
    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024,
        onDrop: (acceptedFiles) => onChange(acceptedFiles[0]),
    });

    return (
        <div
            {...getRootProps()}
            className="d-flex justify-content-center align-items-center form-control form-control-solid w-100 cursor-pointer"
        >
            <input {...getInputProps({name: name})} className='d-none'/>

            {
                value ? (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 my-auto py-10">
                        <span className="fs-5 text-dark fw-bold mb-0">
                            {value.name}
                        </span>

                        <p className="fs-6 text-muted mb-0">
                            {formattedSize(value.size)}
                        </p>
                    </div>
                ) : (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 my-auto py-10">
                        <LuFileUp
                            size={20}
                            color="currentColor"
                            className="text-muted"
                        />

                        <p className="fs-6 text-muted mb-0">
                            فایل خود را انتخاب کنید
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default FileInput;