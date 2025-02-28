export type FileStatus = {
    file: File,
    status: Status,
    message?: string
}

export enum Status {
    NEW = 'NEW',
    UPLOADING = 'UPLOADING',
    UPLOADED = 'UPLOADED',
    ERROR = 'ERROR'
};