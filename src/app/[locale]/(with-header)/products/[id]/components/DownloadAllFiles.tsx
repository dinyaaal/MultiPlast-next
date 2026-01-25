"use client";

import { ButtonMain } from "@/components/ButtonMain";

type Props = {
  files: { url: string; name: string }[];
  label: string;
};

export function DownloadAllFiles({ files, label }: Props) {
  const downloadAll = () => {
    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  return (
    <ButtonMain
      type="button"
      onPress={downloadAll}
      color='secondary'
      className="w-full!"
    >
      {label}: {files.length}
    </ButtonMain>
  );
}
