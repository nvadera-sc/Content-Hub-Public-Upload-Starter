"use client"
import { useRef, useState, DragEvent, ChangeEvent, useId } from "react"

export default function Upload({ onFileAdded } : { onFileAdded: (file: File) => void }) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputId = useId();

    const handleDragEnter = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    const handleDragLeave = () => {
        setDragActive(false);
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        addFiles(e.dataTransfer.files)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        addFiles(e.target.files);

        e.target.value = "";
    }

    const addFiles = (fileList: FileList | null) => {
        Array.from(fileList || []).forEach(onFileAdded);
    }

    return (
        <div 
            className={`border-2 border-slate-400 border-dashed rounded-xl flex flex-col items-center gap-4 p-16 ${dragActive ? "bg-slate-50" : ""}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <input
                id={inputId}
                ref={inputRef}
                className="hidden"
                type="file"
                multiple={true}
                onChange={handleChange}
            />
            <p>
                <label htmlFor={inputId} className="text-slate-900 font-semibold">Upload files</label> or drag and drop
            </p>
            <p className="text-slate-400 text-sm">Maximum file size 10MB</p>
        </div>
    )
}