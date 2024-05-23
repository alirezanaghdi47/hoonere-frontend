// libraries
import {useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuUser} from "react-icons/lu";

const AvatarInput = ({name, value, preview, onChange , disabled}) => {
    const [files, setFiles] = useState([value]);

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
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div
            {...getRootProps()}
            className="d-flex justify-content-center align-items-center form-control form-control-lg form-control-solid w-100px h-100px p-2 cursor-pointer"
        >
            <input
                {...getInputProps({name: name})}
                className='d-none'
            />

            {
                (files[0]?.preview || preview) ? (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100">
                        <LazyLoadImage
                            src={files[0]?.preview ? files[0]?.preview : preview}
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-100 h-100 rounded-2"
                        />
                    </div>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                        <LuUser
                            size={20}
                            color="currentColor"
                            className="text-muted"
                        />
                    </div>
                )
            }
        </div>
    )
}

export default AvatarInput;