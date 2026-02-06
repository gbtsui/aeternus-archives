"use client";

import {CSSProperties, use, useState} from "react";
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
            <DocumentStage open={stageState==="open"} setOpening={() => setStageState("opening")} setClosing={()=>setStageState("closing")}/>
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
    open: boolean,
    setOpening: () => void,
    setClosing: () => void,
}

function DocumentStage(props: DocumentStageProps) {
    const {open, setOpening, setClosing} = props;

    const overallStyle: CSSProperties = {
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        height: "70vh",
        backgroundColor: "white"
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

    return (
        <div style={{...(overallStyle), ...(open ? openStyle : closedStyle)}}>

        </div>
    )
}