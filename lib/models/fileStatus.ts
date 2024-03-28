export type FileStatus = {
    file: File,
    status: Status,
}

export enum Status {
    NEW = 'NEW',
    UPLOADING = 'UPLOADING',
    UPLOADED = 'UPLOADED',
    ERROR = 'ERROR'
};