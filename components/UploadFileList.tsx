import { FileStatus, Status } from "@/lib/models/fileStatus";
import UploadFileStatusBadge from "./UploadFileStatusBadge";

export default function UploadFileList({ files } : { files: FileStatus[] }) {
    const getSortValueForStatus = (s: Status) => {
        if(s === Status.ERROR)
            return "0";
        if(s === Status.NEW)
            return "1";
        if(s === Status.UPLOADING)
            return "2";
        if(s === Status.UPLOADED)
            return "3";
        return "4";
    }
    const getSortValue = (f: FileStatus) => getSortValueForStatus(f.status) + f.file.name;
    const sortFiles = (a: FileStatus, b: FileStatus) => getSortValue(a).localeCompare(getSortValue(b))

    return (
        <ul className="divide-y">
            {files?.sort(sortFiles).map(file => 
                <li className="flex p-4 justify-between" key={file.file.webkitRelativePath}>
                    <div>{file.file.name}</div>
                    <UploadFileStatusBadge status={file.status} />
                </li>
            )}
        </ul>
    )
}