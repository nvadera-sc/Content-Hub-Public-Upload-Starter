import { Status } from "@/lib/models/fileStatus";

export default function UploadFileStatusBadge({ status } : { status: Status }) {
    const getClassesForStatus = (status: Status) => {
        if(status === Status.NEW)
            return "bg-slate-500 text-white";
        if(status === Status.UPLOADING)
            return "bg-amber-500 text-amber-950";
        if(status === Status.ERROR)
            return "bg-red-400 text-red-50";
        if(status === Status.UPLOADED)
            return "bg-lime-400 text-lime-900";
        return "";
    }

    return (<div className={`${getClassesForStatus(status)} rounded-xl px-2 leading-6 text-xs align-middle`}>{status}</div>)
}