// libraries
import {useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {LazyLoadImage} from "react-lazy-load-image-component";
import classNames from "classnames";
import {LuImage, LuTrash2} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";
import Typography from "@/modules/Typography.tsx";

// types
import {TImageInput} from "@/types/moduleType.ts";
import {ExtendedFile} from "@/types/constantsType.ts";

const ImageInput = ({
                        id,
                        name,
                        value,
                        preview = null,
                        onChange,
                        disabled = false,
                        readOnly = false,
                        isCircle,
                        ...props
                    }: TImageInput) => {
    const [files, setFiles] = useState<ExtendedFile[] | object>([]);

    const {getRootProps, getInputProps} = useDropzone({
        disabled: disabled,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            onChange(acceptedFiles[0]);
        }
    });

    useEffect(() => {
        // @ts-ignore
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div
            {...getRootProps()}
            className={classNames("d-flex justify-content-center align-items-center form-control form-control-lg form-control-solid p-2 cursor-pointer", props.className, {
                "w-150px h-150px rounded-circle": isCircle,
                "w-100 h-200px rounded-2": !isCircle
            })}
        >
            <input
                {...getInputProps({id: id, name: name, readOnly: readOnly})}
                className='d-none'
            />

            {
                files[0] && files[0]?.preview ? (
                    <div
                        className="position-relative d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100">
                        <LazyLoadImage
                            src={files[0]?.preview}
                            width={100}
                            height={100}
                            className={classNames("object-fit-cover", {
                                "w-100 h-100 rounded-circle": isCircle,
                                "w-100 h-100 rounded-2": !isCircle
                            })}
                        />

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
                            style={{top: isCircle ? "5%" : 10, left: isCircle ? "5%" : 10}}
                        >
                            <LuTrash2
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    </div>
                ) : preview ? (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100">
                        <LazyLoadImage
                            src={preview}
                            width={100}
                            height={100}
                            className={classNames("object-fit-cover", {
                                "w-100 h-100 rounded-circle": isCircle,
                                "w-100 h-100 rounded-2": !isCircle
                            })}
                        />
                    </div>
                ) : (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100 my-auto">
                        <LuImage
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

export default ImageInput;