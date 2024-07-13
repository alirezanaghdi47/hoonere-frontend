// libraries
import {forwardRef} from "react";
import {Editor} from '@tinymce/tinymce-react';
import html2pdf from "html2pdf.js";
import classNames from "classnames";

// styles
import "@/styles/modules/text-editor.scss";

// types
import {TTextEditor} from "@/types/moduleType.ts";

const TextEditor = forwardRef(({
                                   name,
                                   value,
                                   placeholder = null,
                                   onChange,
                                   disabled = false,
                                   setupAddon,
                                   toolbarAddon,
                                   contextMenuAddon,
                                   ...props
                               }: TTextEditor,
                               ref) => {
    return (
        <div
            {...props}
            className={classNames('position-relative w-100', props.className)}
        >

            <Editor
                tinymceScriptSrc='/tinymce/tinymce.min.js'
                licenseKey="gpl"
                textareaName={name}
                onInit={(evt, editor) => ref ? ref.current = editor : null}
                initialValue=""
                value={value}
                disabled={disabled}
                init={{
                    setup: (editor) => {
                        // export pdf
                        editor.ui.registry.addIcon('pdfExport', `
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"></path>
                              </svg>
                        `);

                        editor.ui.registry.addButton('pdfExport', {
                            icon: 'pdfExport',
                            tooltip: "خروجی pdf",
                            onAction: async function () {
                                const content = editor.getContent();
                                return html2pdf().from(content).save();
                            }
                        });

                        setupAddon(editor);
                    },
                    width: "100%",
                    height: 400,
                    language_url: '/tinymce/i18n/fa.js',
                    language: 'fa',
                    directionality: "rtl",
                    // icons: 'custom',
                    // skin: "tinymce-5",
                    content_css: "/tinymce/styles/custom.css",
                    menubar: false,
                    placeholder: placeholder,
                    plugins: ['advlist', 'autolink', 'lists', 'link'],
                    toolbar: `undo redo | blocks fontfamily | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link pdfExport | ${toolbarAddon}`,
                    toolbar_location: 'top',
                    toolbar_mode: 'scrolling',
                    toolbar_sticky: true,
                    contextmenu: contextMenuAddon ? contextMenuAddon : "",
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
})

export default TextEditor;