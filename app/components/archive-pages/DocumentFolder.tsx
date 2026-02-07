import {ArchiveDocumentMetadata} from "@/app/schema";
import {CSSProperties} from "react";

type DocumentFolderProps = {
    archiveDocument: ArchiveDocumentMetadata;
    index: number;
}

export default function DocumentFolder(props: DocumentFolderProps) {
    const {archiveDocument, index} = props;


    return (
        <div className={"absolute inset-0 bg-amber-100 text-black flex align-center justify-center hover:bg-destructive/80 hover:cursor-pointer"}
        style={{
            transform: "translateX(calc(var(--i) * 8.5vw)) scale(0.97)",
            zIndex: "calc(100 + var(--i))",

            transition: "transform 180ms ease, z-index 0ms",
            "--i": index
        } as CSSProperties}
        >

            <div className={"relative inset-0 w-full h-full bg-amber-200 shadow-xl rounded-l-md"}>
                <div className={"absolute top-[1vh] left-0 text-amber-950"}>
                    <span style={{writingMode: "vertical-rl", transform: "rotate(180deg)"}}>{archiveDocument && archiveDocument.title}</span>
                </div>
                <div className={"absolute bg-gradient-to-r from-amber-100 to-amber-200 top-[-0.67vh] right-0 h-full w-[22vh] rounded-tl-md"}>
                    <div className={"absolute bg-amber-100 bottom-0 left-[-3.5vh] h-[25vh] w-[3.5vh] rounded-l-md"}>

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