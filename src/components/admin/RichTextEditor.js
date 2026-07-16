import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value || '<p>Start writing your blog content...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: true,
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setTextColor = () => {
    const color = prompt('Enter text color (hex, rgb, or color name):');
    if (color) {
      editor.chain().focus().setColor(color).run();
    }
  };

  const setHighlight = () => {
    const color = prompt('Enter highlight color (yellow, green, blue, pink, purple):');
    if (color) {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };

  return (
    <div className="advanced-editor-container">
      <div className="advanced-toolbar">
        {/* Font Family & Size Row */}
        <div className="toolbar-group">
          <select
            onChange={(e) => {
              if (e.target.value) {
                editor.chain().focus().toggleHeading({ level: parseInt(e.target.value) }).run();
              }
            }}
            defaultValue=""
            className="toolbar-select"
            title="Text Format"
          >
            <option value="">Normal</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
            <option value="5">Heading 5</option>
            <option value="6">Heading 6</option>
          </select>
        </div>

        <div className="toolbar-separator"></div>

        {/* Text Formatting Row */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`toolbar-btn ${editor.isActive('underline') ? 'active' : ''}`}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`toolbar-btn ${editor.isActive('strike') ? 'active' : ''}`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className="toolbar-separator"></div>

        {/* Alignment Row */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
            title="Align Left"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
            title="Align Center"
          >
            ⬇
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
            title="Align Right"
          >
            ➡
          </button>
        </div>

        <div className="toolbar-separator"></div>

        {/* Lists & Blocks Row */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
            title="Ordered List"
          >
            1. List
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
            title="Blockquote"
          >
            " "
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`toolbar-btn ${editor.isActive('codeBlock') ? 'active' : ''}`}
            title="Code Block"
          >
            &lt;/&gt;
          </button>
        </div>

        <div className="toolbar-separator"></div>

        {/* Text Color & Highlight Row */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={setTextColor}
            className="toolbar-btn"
            title="Text Color"
          >
            A
          </button>
          <button
            type="button"
            onClick={setHighlight}
            className="toolbar-btn"
            title="Highlight"
          >
            🔍
          </button>
        </div>

        <div className="toolbar-separator"></div>

        {/* Link & Image Row */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={addLink}
            className={`toolbar-btn ${editor.isActive('link') ? 'active' : ''}`}
            title="Insert Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={addImage}
            className="toolbar-btn"
            title="Insert Image"
          >
            🖼️
          </button>
        </div>

        <div className="toolbar-separator"></div>

        {/* Clear Formatting */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().run()}
            className="toolbar-btn"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>
      </div>

      <EditorContent editor={editor} className="advanced-editor" />
    </div>
  );
};

export default RichTextEditor;
