"use client";

import {CSSProperties, Dispatch, SetStateAction, use, useEffect, useRef, useState} from "react";
import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
//import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";
import ArchiveDocumentContainer from "@/app/components/periodic-table/ArchiveDocumentContainer";
import {ArchiveDocumentMetadata} from "@/app/schema";
import {Property} from "csstype";
import PointerEvents = Property.PointerEvents;

type StageState = "closed" | "opening" | "open" | "closing"

export default function ElementPage({params} : {params: Promise<{atomicNumber: string}>}) {
    const {atomicNumber} = use(params)
    const atomicNumberAsNumber = Number(atomicNumber)

    const [activeDocument, setActiveDocument] = useState<ArchiveDocumentMetadata | null>(null)
    const [stageState, setStageState] = useState<StageState>("open")

    if (!Number.isInteger(atomicNumberAsNumber)) {
        return <div>Error! Invalid element. Maybe I have not added it yet, or maybe it is an impossible atomic number...</div>
    }

    const elementData = periodicTableElementsBasicData[atomicNumberAsNumber];
    if (!elementData) {
        return <div>Element data not found.</div>
    }

    const {archiveDocuments} = elementData;

    //refactor this iframe into a separate component at some point?
    //shadowDOM?
    //blegh

    return (
        <div className={"flex"}>
            <DocumentStage state={stageState} setState={setStageState}/>
            <div className={"relative h-[100vh] w-[100vw] z-0 flex items-center justify-center overflow-hidden"}>
                <div className={"text-gray-700 text-3xl text-center"}>
                    archive document reader
                </div>
            </div>

            {activeDocument && <ArchiveDocumentContainer data={activeDocument} atomicNumber={atomicNumberAsNumber}/>}
            {activeDocument ? <div>{activeDocument.toString()}</div> : <div>null</div>}
        </div>
    )

    /*
    return (
        <div>
            {archiveDocuments.map((archiveDoc, index) => <ArchiveDocumentContainer data={archiveDoc} key={index} atomicNumber={atomicNumberAsNumber}/>)}
            <div>{archiveDocuments.map((archiveDoc, index) => <div key={index}>{JSON.stringify(archiveDoc)}</div>)}</div>
        </div>
    )*/
}
//i need a drawer...

type DocumentStageProps = {
    state: StageState,
    setState: Dispatch<SetStateAction<StageState>>
}

function DocumentStage(props: DocumentStageProps) {
    const {state, setState} = props;

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
    }, [])

    const changeState = () => {
        console.log("changeState called")
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
        </div>
    )
}