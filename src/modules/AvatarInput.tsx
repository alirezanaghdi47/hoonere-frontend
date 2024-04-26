// libraries
import {useDropzone} from 'react-dropzone';
import {LazyLoadImage} from "react-lazy-load-image-component";

const AvatarInput = ({name, value, preview, onChange}) => {
    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024,
        onDrop: (acceptedFiles) => onChange(acceptedFiles[0]),
    });

    return (
        <div
            {...getRootProps()}
            className="d-flex justify-content-center align-items-center form-control form-control-lg form-control-solid w-100px h-100px p-2 cursor-pointer"
        >
            <input {...getInputProps({name: name})} className='d-none'/>

            {
                (value || preview) ? (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100">
                        <LazyLoadImage
                            src={value ? value : preview}
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-100 h-100 rounded-2"
                        />
                    </div>
                ) : (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100">
                        <i className="fad fa-user fs-1"/>
                    </div>
                )
            }
        </div>
    )
}

export default AvatarInput;