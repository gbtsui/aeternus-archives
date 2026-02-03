export interface ArchiveDocumentMetadata {
    path: string; //ex. "/public/elementData/1/1.html
}

export interface ElementBasicMetadata {
    atomicNumber: number,
    symbol: string,
    name: string,

    column: number,
    row: number,

    elementType: "alkali" | "alkalineEarth" | "nobleGas" | "halogen" | "metalloid" | "transitionMetal" | "postTransitionMetal" | "nonMetal" | "lanthanide" | "actinide" //i lwk dont know if i missed any???

    characterName: string | undefined,
    archiveDocuments: ArchiveDocumentMetadata[]
}

/*
possible types:
- alkali
- alkaline earth
- noble gas
- halogen
- metalloid
- transition metal
- post-transition metal
- nonmetal
- lanthanide
- actinide
 */