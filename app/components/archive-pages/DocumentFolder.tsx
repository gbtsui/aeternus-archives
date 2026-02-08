import {ArchiveDocumentMetadata} from "@/app/schema";
import {CSSProperties, Dispatch, MouseEventHandler, SetStateAction} from "react";

import "@/app/stylesheets/folders.css"

type DocumentFolderProps = {
    archiveDocument: ArchiveDocumentMetadata;
    index: number;
    currentHoveredIndex: null|number;
    setCurrentHoveredIndex: Dispatch<SetStateAction<number|null>>;
    onSelect: (archiveDocument: ArchiveDocumentMetadata, rect: DOMRect) => void;
    activeDocument: ArchiveDocumentMetadata | null;
}

export default function DocumentFolder(props: DocumentFolderProps) {
    const {archiveDocument, activeDocument, index, currentHoveredIndex, setCurrentHoveredIndex, onSelect} = props;

    const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        onSelect(archiveDocument, rect)
    }

    if (archiveDocument === activeDocument) return null

    return (
        <div className={`absolute inset-0 bg-amber-100 text-black flex align-center justify-center hover:bg-destructive/80 hover:cursor-pointer card ${currentHoveredIndex === index && "card-hovering"} ${currentHoveredIndex !== null && currentHoveredIndex > index && "card-before"} ${currentHoveredIndex !== null && currentHoveredIndex < index && "card-after"}`}
            style={{"--i": index} as CSSProperties}
             onPointerOver={() => setCurrentHoveredIndex(index)}
             onPointerLeave={() => setCurrentHoveredIndex(null)}
            onClick={clickHandler}
        >

            <div className={"relative inset-0 w-full h-full bg-amber-200 shadow-4xl rounded-l-md "}>
                <div className={"absolute top-[1vh] left-0 text-amber-950"}>
                    <span style={{writingMode: "vertical-rl", transform: "rotate(180deg)"}}>{archiveDocument && archiveDocument.title}</span>
                </div>
                <div className={"absolute bg-gradient-to-r from-amber-100 to-amber-200 top-[-0.67vh] right-0 h-full w-[22vh] rounded-tl-md border-l-amber-300 border-l-1 border-r-0"}>
                    <div className={"absolute bg-amber-100 bottom-0 left-[-3.5vh] h-[25vh] w-[3.5vh] rounded-l-md border-l-amber-300 border-l-1 border-r-0"}>

                    </div>
                </div>

            </div>

            {/*
                        <div style={{
                transform: "rotate(-90deg) translateY(11%) translateX(150%)",
            }}>
                {archiveDocument && archiveDocument.title}
            </div>
            */}

        </div>
    )
}