"use client"
import { processUploadFile } from "@/app/actions/upload";
import Upload from "@/components/Upload";
import UploadFileList from "@/components/UploadFileList";
import { uploadActionFormDataKeys } from "@/lib/constants/formDataConstants";
import { FileStatus, Status } from "@/lib/models/fileStatus";
import { UploadedFile } from "@/lib/models/uploadedFile";
import { useEffect, useState, useCallback } from "react";
import { getCollection } from "@/app/actions/collection";

export default function UploadPage({ params }: { params: Promise<{ path: string }> }) {
  const pathIsInviteToUploadToCollection: boolean = false; // when enabled use collection identifier as path to upload to collection
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);
  const [processingFile, setProcessingFile] = useState<File>();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [collectionId, setCollectionId] = useState<number | null>();
  const [collectionName, setCollectionName] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(pathIsInviteToUploadToCollection);
  const [unwrappedParams, setUnwrappedParams] = useState<{ path: string } | null>(null);

  const handleFileAdded = (file: File) => {
    setQueuedFiles(currentFiles => [...currentFiles, file]);
  };

  const validateInvite = useCallback(async (collectionIdentifier: string) => {
    if (pathIsInviteToUploadToCollection) {
      const collection = await getCollection(collectionIdentifier);
      if (collection) {
        setCollectionId(collection.id);
        setCollectionName(collection.name);
      }
    }
    setLoading(false);
  }, [pathIsInviteToUploadToCollection]);

  const processFile = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append(uploadActionFormDataKeys.file, file);
    formData.append(uploadActionFormDataKeys.path, unwrappedParams?.path || "default folder");
    if (pathIsInviteToUploadToCollection) {
      formData.append(uploadActionFormDataKeys.uploadToCollection, "true");
    }

    const success = await processUploadFile(formData);
    setUploadedFiles(currentFiles => [...currentFiles, { file, success }]);

    setProcessingFile(undefined);
  }, [unwrappedParams?.path, pathIsInviteToUploadToCollection]);

  const getFileList = () => {
    const queuedFilesStatus = queuedFiles.map(f => ({ file: f, status: Status.NEW }));
    const uploadedFilesStatus = uploadedFiles.map(f => ({ file: f.file, status: f.success ? Status.UPLOADED : Status.ERROR }));

    const fileStatuses: FileStatus[] = [...queuedFilesStatus, ...uploadedFilesStatus];

    if (processingFile)
      fileStatuses.push({ file: processingFile, status: Status.UPLOADING });

    return fileStatuses;
  };

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrapped = await params;
      setUnwrappedParams(unwrapped);
      validateInvite(unwrapped.path);
      if (queuedFiles.length > 0 && processingFile === undefined) {
        const newProcessingFile = queuedFiles.pop();

        setQueuedFiles(currentQueuedFiles => currentQueuedFiles.filter(f => f !== newProcessingFile));
        setProcessingFile(newProcessingFile);

        processFile(newProcessingFile!);
      }
    };
    unwrapParams();
  }, [params, validateInvite, queuedFiles, processingFile, processFile]);

  return (
    <>
      <header className="px-8 py-4 bg-slate-600 text-slate-50 text-xl font-semibold">
        Public Upload Demo Application
      </header>
      <main className="p-8 text-slate-600 flex flex-col gap-4">
        {loading && <h2 className="text-lg capitalize font-semibold">Loading...</h2>}
        {!loading && pathIsInviteToUploadToCollection && !collectionId && <h2 className="text-lg capitalize font-semibold">Invite key is invalid or expired</h2>}
        {!loading && (!pathIsInviteToUploadToCollection || (pathIsInviteToUploadToCollection && collectionId)) &&
          <>
            <h2 className="text-lg capitalize font-semibold">Upload{collectionName ? ` to '${collectionName}'` : ``}:</h2>
            <Upload onFileAdded={handleFileAdded} />
            <UploadFileList files={getFileList()} />
          </>}
      </main>
    </>
  );
}