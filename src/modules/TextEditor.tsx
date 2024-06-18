// libraries
import {Editor} from '@tinymce/tinymce-react';
import classNames from "classnames";

// styles
import "@/styles/modules/text-editor.scss";

// types
import {TTextEditor} from "@/types/moduleType.ts";

const TextEditor = ({name, value, placeholder = null, onChange, disabled = false, ...props}: TTextEditor) => {
    return (
        <div
            {...props}
            className={classNames('position-relative w-100', props.className)}
        >

            <Editor
                tinymceScriptSrc='/tinymce/tinymce.min.js'
                licenseKey="gpl"
                textareaName={name}
                initialValue=""
                value={value}
                disabled={disabled}
                init={{
                    width: "100%",
                    height: 400,
                    language_url: '/tinymce/i18n/fa.js',
                    language: 'fa',
                    directionality: "rtl",
                    // icons: 'custom',
                    // skin: "tinymce-5-dark",
                    skin: "tinymce-5",
                    // content_css: "tinymce-5-dark",
                    content_css: "tinymce-5",
                    content_style: `
                        @font-face {
                            font-family: IRANSansWeb;
                            font-style: normal;
                            font-weight: 500;
                            src: url('/tinymce/fonts/IRANSansWeb.woff2') format('woff2');
                        }
                        
                        @font-face {
                            font-family: IRANSansWeb;
                            font-style: normal;
                            font-weight: bold;
                            src: url('/tinymce/fonts/IRANSansWeb_Bold.woff2') format('woff2');
                        }
                        
                        body {
                            font-family: IRANSansWeb!important;
                        }
                    `,
                    menubar: false,
                    placeholder: placeholder,
                    plugins: ['advlist', 'autolink', 'lists', 'link',],
                    toolbar: 'undo redo | blocks fontfamily | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link',
                    toolbar_location: 'top',
                    toolbar_mode: 'sliding',
                    toolbar_sticky: true,
                    font_family_formats: "Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; IRANSansWeb=IRANSansWeb,sans-serif ; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
                    color_map: [
                        '#BFEDD2', 'Light Green',
                        '#FBEEB8', 'Light Yellow',
                        '#F8CAC6', 'Light Red',
                        '#ECCAFA', 'Light Purple',
                        '#C2E0F4', 'Light Blue',
                        '#2DC26B', 'Green',
                        '#F1C40F', 'Yellow',
                        '#E03E2D', 'Red',
                        '#B96AD9', 'Purple',
                        '#3598DB', 'Blue',
                        '#169179', 'Dark Turquoise',
                        '#E67E23', 'Orange',
                        '#BA372A', 'Dark Red',
                        '#843FA1', 'Dark Purple',
                        '#236FA1', 'Dark Blue',
                        '#ECF0F1', 'Light Gray',
                        '#CED4D9', 'Medium Gray',
                        '#95A5A6', 'Gray',
                        '#7E8C8D', 'Dark Gray',
                        '#34495E', 'Navy Blue',
                        '#000000', 'Black',
                        '#ffffff', 'White'
                    ],
                    custom_colors: false,
                    branding: false,
                    resize: true,
                }}
                onEditorChange={(newValue, editor) => {
                    onChange(editor.getContent());
                }}
            />

        </div>
    )
}

export default TextEditor;