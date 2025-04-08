"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  listsPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertImage,
  ListsToggle,
  toolbarPlugin,
  Separator,
  imagePlugin,
  BlockTypeSelect,
  linkDialogPlugin,
} from "@mdxeditor/editor";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        listsPlugin(),

        imagePlugin(),
        linkDialogPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <Separator />

              <ListsToggle />
              <Separator />

              <CreateLink />
              <InsertImage />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
      contentEditableClassName="description__input "
    />
  );
}
