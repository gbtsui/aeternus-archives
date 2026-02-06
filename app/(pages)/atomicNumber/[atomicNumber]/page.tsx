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
        <div>
            <DocumentStage state={stageState} setState={setStageState}/>
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
        backgroundColor: "white",
        transitionDuration: "0.67s",
        transitionProperty: "all"
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

        const onTransitionEnd = (e: Event) => {
            console.log("transition end")
        }

        element.addEventListener("transitionend", onTransitionEnd)
    })

    return (
        <div ref={ref} style={{...(overallStyle), ...(state === "opening" || state === "open" ? openStyle : closedStyle)}}>
            <div className={"top-1vh text-black"}>
                <button onClick={state === "open" ? () => setState("closing") : (state === "closed" ? () => setState("opening") : () => {})}>{state === "open" ? <div>close</div> : <div>open</div>}</button>
            </div>
        </div>
    )
}