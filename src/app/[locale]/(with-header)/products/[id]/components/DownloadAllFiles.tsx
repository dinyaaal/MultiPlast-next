"use client";

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
    <button
      onClick={downloadAll}
      className="actions-body-product__download button button--secondary"
    >
      {label}: {files.length}
    </button>
  );
}
