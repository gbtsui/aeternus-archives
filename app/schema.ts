export interface ArchiveDocumentMetadata {
    filename: string; //will be under /elementData/1/[filename].html
    title: string; //ex. "archive doc 1, aeternus intake form
    type?: "staticish_document" | "custom_react_module" //man i lwk dont know what to do with this
    //should default to staticish_document tho...
    //im honestly not very sure
    //i'll figure it out eventually!
    //note to future me: figure out what to do for custom react modules,
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