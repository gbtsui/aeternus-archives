export interface ArchiveElement {
    atomicNumber: number,
    characterName: string | undefined,

    archiveDocuments: ArchiveDocumentMetadata[]
}

export interface ArchiveDocumentMetadata {
    link: string;
}

export interface ElementBasicMetadata {
    atomicNumber: number,
    symbol: string,
    name: string,

    column: number,
    row: number,
}
