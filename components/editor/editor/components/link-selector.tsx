import { cn, getUrlFromString } from "@/utils/utils";
import type { Editor } from "@tiptap/core";
import { Link } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useRef, useCallback } from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;

    // unset
    if (previousUrl) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    let url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Add protocol if missing
    if (!url.match(/^https?:\/\//i)) {
      url = "https://" + url;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        onClick={setLink}
      >
        <Link
          className={cn("h-4 w-4", {
            "text-blue-500": editor.isActive("link"),
          })}
        />
      </button>
      {/* {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            url && editor.chain().focus().setLink({ href: url }).run();
            setIsOpen(false);
          }}
          className="fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-white p-1 text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <button
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button className="flex items-center rounded-sm p-1 text-stone-600 transition-all hover:bg-stone-100">
              <Check className="h-4 w-4" />
            </button>
          )}
        </form>
      )} */}
    </div>
  );
};
