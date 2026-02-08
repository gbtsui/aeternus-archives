"use client";

import {ArchiveDocumentMetadata} from "@/app/schema";
import {CSSProperties, TransitionEventHandler} from "react";

type AnimatedDocumentFolderProps = {
    state: AnimatedFolderLiftState,
    onOpened(): void,
    onDocked(): void
}

export type AnimatedFolderLiftState = null | {
    doc: ArchiveDocumentMetadata
    originRect: DOMRect,
    phase: "spawned" | "lifting" | "opening" | "docked" //RAHHHH FINITE STATE MACHINE MY BELOVED???
    //yo lowkenuinely i havent done one of these since godot

}



export default function AnimatedDocumentFolder(props: AnimatedDocumentFolderProps) {
    if (!props.state) return null;

    const {doc, originRect, phase} = props.state;
    const {onOpened, onDocked} = props

    const style: CSSProperties = {
        position: "fixed",
        transition: "all 600ms ease",

        width: originRect.width,
        height: originRect.height,

        top: originRect.top,
        left: originRect.left,
        transform: "translateY(0)"
        //some parts moved to openedFolderStyle btwbtw
    }

    const liftingStyle =
        phase === "lifting" ? {transform: "translateY(-30vh)"} : {}

    const openedFolderFlapStyle =
        phase === "opening" ? {transform: "rotateY(150deg) translateX(-22vh) translateY(0.67vh)", transition: "all 300ms ease"} : {transform: "rotateY(0deg) translateX(0)",  transition: "all 300ms ease"}

    const openedFolderStyle =
        phase === "opening" ? {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        } : {

            //default
        }

    const onTransitionEndHandler:  TransitionEventHandler<HTMLDivElement> = (e) => {
        if (e.propertyName !== "transform") return
        if (phase === "lifting") onOpened()
    }

    return (
        <div className={`absolute inset-0 bg-amber-100 text-black flex align-center justify-center hover:bg-destructive/80`}
            style={{...style, ...liftingStyle, ...openedFolderStyle}}
             onTransitionEnd={onTransitionEndHandler}
            >

            <div className={"relative inset-0 w-full h-full bg-amber-200 shadow-4xl rounded-l-md "}>
                <div className={"absolute top-[1vh] left-0 text-amber-950"}>
                    <span style={{writingMode: "vertical-rl", transform: "rotate(180deg)"}}>{doc.title}</span>
                </div>
                <div className={"absolute bg-amber-100 top-[-0.67vh] right-0 h-full w-[22vh] rounded-tl-md border-l-amber-300 border-l-1 z-[202]"}
                    style={openedFolderFlapStyle}
                >
                    <div className={"absolute bg-amber-100 bottom-0 left-[-3.5vh] h-[25vh] w-[3.5vh] rounded-l-md border-l-amber-300 border-l-1 border-r-0 z-[202]"}>
                        {phase}
                    </div>
                </div>

            </div>
        </div>
    )
}