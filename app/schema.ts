export interface ArchiveDocumentMetadata {
    path: string; //ex. "/public/elementData/1/1.html
}

export interface ElementBasicMetadata {
    atomicNumber: number,
    symbol: string,
    name: string,

    column: number,
    row: number,

    characterName: string | undefined,
    archiveDocuments: ArchiveDocumentMetadata[]
}
