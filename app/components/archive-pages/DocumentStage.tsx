import {CSSProperties, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Property} from "csstype";
import PointerEvents = Property.PointerEvents;
import {ArchiveDocumentMetadata} from "@/app/schema";
import DocumentFolder from "@/app/components/archive-pages/DocumentFolder";
import {AnimatedFolderLiftState} from "@/app/components/archive-pages/AnimatedDocumentFolder";

export type StageState = "closed" | "opening" | "open" | "closing"

type DocumentStageProps = {
    state: StageState,
    setState: Dispatch<SetStateAction<StageState>>,
    archiveDocuments: ArchiveDocumentMetadata[],
    setLiftedFolder: Dispatch<SetStateAction<AnimatedFolderLiftState | null>>
    liftedFolder: AnimatedFolderLiftState | null,
}

export default function DocumentStage(props: DocumentStageProps) {
    const {state, setState, archiveDocuments, setLiftedFolder, liftedFolder} = props;

    const overallStyle: CSSProperties = {
        position: "fixed",
        left: "5vw",
        right: "0",
        bottom: "2vh",
        height: "48vh",
        backgroundColor: "#9298a2",
        transitionDuration: "0.67s",
        transitionProperty: "all",
        zIndex: 5,
    }

    const closedStyle: CSSProperties = {
        transform: "translateY(100%)",
        //translate: "0% 100%",
        pointerEvents: "none" as PointerEvents,
    }

    const openStyle: CSSProperties = {
        transform: "translateY(0%)",
        //translate: "0% 100%",
        pointerEvents: "auto" as PointerEvents
    }

    const ref = useRef<HTMLDivElement | null>(null)

    const [hoveredIndex, setHoveredIndex] = useState<null|number>(0);

    const onSelectHandler: (archiveDocument: ArchiveDocumentMetadata, rect: DOMRect) => void = (doc, rect) => {
        setState("closing")
        setLiftedFolder({
            doc,
            originRect: rect,
            phase: "spawned"
        })
        requestAnimationFrame(() => {
            setLiftedFolder(s => s && { ...s, phase: "lifting" })
        })
    }

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handler = (e: TransitionEvent) => {
            if (e.propertyName !== "transform") return

            setState(prev =>
                prev === "closing" ? "closed" :
                    prev === "opening" ? "open" : prev
            )
        }

        element.addEventListener("transitionend", handler)
        return () => element.removeEventListener("transitionend", handler)
    }, [setState])

    const changeState = () => {
        if (state === "open") setState("closing")
        else if (state === "closed") setState("opening");
    }

    return (
        <div ref={ref} style={{...(overallStyle), ...(state === "opening" || state === "open" ? openStyle : closedStyle)}}
             className={"border-gray-700 border-[0.5rem] border-r-0"}
        >
            <div onClick={changeState} className={"cursor-pointer pointer-events-auto absolute top-[-3vh] left-[2vw] border-t-[0.5rem] border-x-[0.5rem] border-gray-700 text-black bg-[#9298a2] p-[1rem]"}>
                <div className={"top-[1vh] z-6"}>{state === "open" ? <div>CLOSE</div> : <div>OPEN </div>}</div>
                <div className={"absolute top-[-2.75vh] text-gray-300"}>{state}</div>
            </div>

            {/*this part is going to be where the folders actually will be residing!*/}
            <div className={"relative w-[25vh] h-[80%] top-[4vh] perspective-midrange"}>
                {archiveDocuments.map((archiveDoc, index) => {

                    return (
                        <DocumentFolder key={index} index={index + 1} archiveDocument={archiveDoc} currentHoveredIndex={hoveredIndex} setCurrentHoveredIndex={setHoveredIndex} onSelect={onSelectHandler} liftedFolder={liftedFolder}/>
                    )
                })}
            </div>
        </div>
    )
}

//yo are we like puppets on a stage for someone's entertainment type beat
