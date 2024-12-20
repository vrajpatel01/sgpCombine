import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FindAndReplace,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Underline,
    Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzU5NDg3OTksImp0aSI6ImZkNzc4OTFlLWM5ZTgtNDhmOC04ZGRhLWZkODgyMDUyYmJhOCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImU3NWM4Y2ZlIn0.Y0a1hyxQ3Z43Xfjf-1Le-0NpARgdBuyG83xM8MbvA5WGqghOW9YBvdvVgD6-cZeb5HUJy86QfkMFS5QnQFyK8g';


export default function RichTextEditor({ initialValue = '', menuBar = true, ...rest }) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'insertTable',
                'highlight',
                'blockQuote',
                'codeBlock',
                '|',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            AutoLink,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            BlockToolbar,
            Bold,
            Code,
            CodeBlock,
            Essentials,
            FindAndReplace,
            Heading,
            Highlight,
            HorizontalLine,
            HtmlEmbed,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Paragraph,
            SelectAll,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Table,
            TableCellProperties,
            TableProperties,
            TableToolbar,
            TextTransformation,
            Underline,
            Undo
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link'],
        blockToolbar: ['bold', 'italic', '|', 'link', 'insertTable', '|', 'outdent', 'indent'],
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        licenseKey: LICENSE_KEY,
        initialData: initialValue,
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        menuBar: {
            isVisible: menuBar
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
    };


    return (
        <div>
            <div className="main-container">
                <div className="editor-container editor-container_classic-editor editor-container_include-block-toolbar" ref={editorContainerRef}>
                    <div className="editor-container__editor">
                        <div ref={editorRef}>{isLayoutReady && <CKEditor content='hello' editor={ClassicEditor} config={editorConfig} {...rest} />}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
