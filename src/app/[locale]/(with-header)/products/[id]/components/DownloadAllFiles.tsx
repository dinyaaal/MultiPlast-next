"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import { ChevronDownIcon, FileDown, FileText } from "lucide-react";

type Props = {
  files: { url: string; name: string }[];
  label: string;
};

export function DownloadAllFiles({ files, label }: Props) {
  return (
    <Accordion selectionMode="single" showDivider={false}>
      <AccordionItem
        classNames={{
          base: "p-5 border border-border rounded-lg w-full",
          trigger: "p-0 cursor-pointer",
          title: "title title--small",
          indicator: "data-[open=true]:-rotate-180 text-black",
          content: "p-0 pt-5",
        }}
        indicator={<ChevronDownIcon />}
        key="files"
        aria-label={label}
        title={`${label}: ${files.length}`}
      >
        <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
          {files.map((file, index) => (
            <a
              key={index}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors min-w-0"
            >
              <FileText className="shrink-0 text-gray-500" size={20} />
              <span className="min-w-0 flex-1 text-sm truncate">{file.name}</span>
              <FileDown className="shrink-0 text-gray-400" size={18} />
            </a>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
