// libraries
import {useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuFileUp, LuTrash2} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

const FileInput = ({name, value, preview, onChange, disabled, ...props}) => {
    const [files, setFiles] = useState([value]);

    const {getRootProps, getInputProps} = useDropzone({
        disabled: disabled,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            onChange(acceptedFiles[0]);
        },
    });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div
            {...getRootProps()}
            className={`d-flex justify-content-center align-items-center form-control form-control-solid w-100 h-100 min-h-200px cursor-pointer`}
        >
            <input
                {...getInputProps({name: name})}
                className='d-none'
            />

            {
                files[0]?.preview ? (
                    <div
                        className="position-relative d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100">
                        <LazyLoadImage
                            src={files[0]?.preview}
                            alt="preview"
                            width={100}
                            height={100}
                            className="w-100 h-200px object-fit-cover rounded-2"
                        />

                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();

                                files.forEach(file => URL.revokeObjectURL(file.preview));

                                setFiles([]);

                                onChange({});
                            }}
                            className="position-absolute z-index-1"
                            style={{top: 10, left: 10}}
                        >
                            <LuTrash2
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    </div>
                ) : preview ? (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100">
                        <LazyLoadImage
                            src={preview}
                            alt="preview"
                            width={100}
                            height={100}
                            className="w-100 h-200px object-fit-cover rounded-2"
                        />
                    </div>
                ) : (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100 my-auto py-10">
                        <LuFileUp
                            size={20}
                            color="currentColor"
                            className="text-muted"
                        />

                        <Typography
                            variant="p"
                            size="xs"
                            color="muted"
                        >
                            انتخاب کنید
                        </Typography>
                    </div>
                )
            }
        </div>
    )
}

export default FileInput;