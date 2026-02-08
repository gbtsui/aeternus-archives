"use client";

import {ArchiveDocumentMetadata} from "@/app/schema";
import {CSSProperties} from "react";

type AnimatedDocumentFolderProps = {
    state: AnimatedFolderLiftState,
    onOpened(): void,
    onDocked(): void
}

export type AnimatedFolderLiftState = null | {
    doc: ArchiveDocumentMetadata
    originRect: DOMRect,
    phase: "lifting" | "opening" | "docked" //RAHHHH FINITE STATE MACHINE MY BELOVED???
    //yo lowkenuinely i havent done one of these since godot

}



export default function AnimatedDocumentFolder(props: AnimatedDocumentFolderProps) {
    if (!props.state) return null;

    const {doc, originRect, phase} = props.state;
    const {onOpened, onDocked} = props

    const style: CSSProperties = {
        position: "fixed",
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        transition: "all 600ms cubic-bezier"
    }

    return (
        <div className={`absolute inset-0 bg-amber-100 text-black flex align-center justify-center hover:bg-destructive/80`}
            style={style}
            >

            <div className={"relative inset-0 w-full h-full bg-amber-200 shadow-4xl rounded-l-md "}>
                <div className={"absolute top-[1vh] left-0 text-amber-950"}>
                    <span style={{writingMode: "vertical-rl", transform: "rotate(180deg)"}}>{doc.title}</span>
                </div>
                <div className={"absolute bg-gradient-to-r from-amber-100 to-amber-200 top-[-0.67vh] right-0 h-full w-[22vh] rounded-tl-md border-l-amber-300 border-l-1 border-r-0"}>
                    <div className={"absolute bg-amber-100 bottom-0 left-[-3.5vh] h-[25vh] w-[3.5vh] rounded-l-md border-l-amber-300 border-l-1 border-r-0"}>

                    </div>
                </div>

            </div>
        </div>
    )
}