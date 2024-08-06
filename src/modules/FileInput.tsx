// libraries
import {useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone';
import classNames from "classnames";
import {LuFileInput, LuTrash2} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

// types
import {TFileInput} from "@/types/moduleType.ts";
import {ExtendedFile} from "@/types/constantsType.ts";

// utils
import {formattedSize} from "@/utils/functions.ts";

const FileInput = ({
                       id,
                       name,
                       value,
                       file = null,
                       onChange,
                       disabled = false,
                       readOnly = false,
                       ...props
                   }: TFileInput) => {
    const [files, setFiles] = useState<ExtendedFile[] | object>([value]);

    const {getRootProps, getInputProps} = useDropzone({
        disabled: disabled,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles);

            onChange(acceptedFiles[0]);
        },
    });

    useEffect(() => {
        // @ts-ignore
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div
            {...getRootProps()}
            className={classNames("d-flex justify-content-center align-items-center form-control form-control-solid w-100 h-150px cursor-pointer", props.className)}
        >
            <input
                {...getInputProps({id: id, name: name, readOnly: readOnly})}
                className='d-none'
            />

            {
                files[0] && Object.keys(files[0]).length > 0 ? (
                    <div
                        className="position-relative d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100">
                        <Typography
                            variant="p"
                            size="xs"
                            color="muted"
                        >
                            {files[0]?.name}
                        </Typography>

                        <Typography
                            variant="p"
                            size="xs"
                            color="muted"
                        >
                            {formattedSize(files[0]?.size)}
                        </Typography>

                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();

                                // @ts-ignore
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
                ) : file && Object.keys(file).length > 0 ? (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100">
                        <Typography
                            variant="p"
                            size="xs"
                            color="muted"
                        >
                            {file?.name}
                        </Typography>

                        <Typography
                            variant="p"
                            size="xs"
                            color="muted"
                        >
                            {formattedSize(file?.size)}
                        </Typography>
                    </div>
                ) : (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100">
                        <LuFileInput
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