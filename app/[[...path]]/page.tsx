"use client"
import { processUploadFile } from "@/app/actions/upload";
import Upload from "@/components/Upload";
import UploadFileList from "@/components/UploadFileList";
import { UploadActionFormDataKeys } from "@/lib/constants/formDataConstants";
import { FileStatus, Status } from "@/lib/models/fileStatus";
import { UploadedFile } from "@/lib/models/uploadedFile";
import { useEffect, useState } from "react";

export default function UploadPage({ params } : { params: { path: string } }) {
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);
  const [processingFile, setProcessingFile] = useState<File>();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileAdded = (file: File) => {
    setQueuedFiles(currentFiles => [...currentFiles, file ])
  }

  const processFile = async (file: File) => {
    const formData = new FormData();
    formData.append(UploadActionFormDataKeys.file, file);
    formData.append(UploadActionFormDataKeys.path, params.path || "default folder");

    const success = await processUploadFile(formData);
    setUploadedFiles(currentFiles => [...currentFiles, { file, success }])

    setProcessingFile(undefined);
  };

  const getFileList = () => {
    const queuedFilesStatus = queuedFiles.map(f => ({ file: f, status: Status.NEW }));
    const uploadedFilesStatus = uploadedFiles.map(f => ({ file: f.file, status: f.success ? Status.UPLOADED : Status.ERROR }));

    const fileStatuses: FileStatus[] = [...queuedFilesStatus, ...uploadedFilesStatus];

    if(processingFile)
      fileStatuses.push({ file: processingFile, status: Status.UPLOADING });

    return fileStatuses;
  }

  useEffect(() => {
    if(queuedFiles.length > 0 && processingFile === undefined)
    {
      const newProcessingFile = queuedFiles.pop();
      
      setQueuedFiles(currentQueuedFiles => currentQueuedFiles.filter(f => f !== newProcessingFile));
      setProcessingFile(newProcessingFile);

      processFile(newProcessingFile!);
    }
  }, [queuedFiles, processingFile])


  return (
    <>
      <header className="px-8 py-4 bg-slate-600 text-slate-50 text-xl font-semibold">
        Public Upload Demo Application
      </header>
      <main className="p-8 text-slate-600 flex flex-col gap-4">
        <h2 className="text-lg capitalize font-semibold">Upload to {params.path || "default folder"}</h2>
        <Upload onFileAdded={handleFileAdded} />
        <UploadFileList files={getFileList()} />
      </main>
    </>
  );
}