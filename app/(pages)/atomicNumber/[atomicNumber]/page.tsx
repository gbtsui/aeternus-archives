"use client";

import {use,useState} from "react";
import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
//import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";
import ArchiveDocumentContainer from "@/app/components/periodic-table/ArchiveDocumentContainer";
import {ArchiveDocumentMetadata} from "@/app/schema";
import StickyNote from "@/app/components/aesthetic/StickyNote";
import DocumentStage, {StageState} from "@/app/components/archive-pages/DocumentStage";
import AnimatedDocumentFolder, {AnimatedFolderLiftState} from "@/app/components/archive-pages/AnimatedDocumentFolder";


export default function ElementPage({params} : {params: Promise<{atomicNumber: string}>}) {
    const {atomicNumber} = use(params)
    const atomicNumberAsNumber = Number(atomicNumber)

    const [activeDocument, setActiveDocument] = useState<ArchiveDocumentMetadata | null>(null)
    const [stageState, setStageState] = useState<StageState>("open")
    const [liftedFolder, setLiftedFolder] = useState<AnimatedFolderLiftState>(null)

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
            <StickyNote>
                whats up gang
            </StickyNote>
            <DocumentStage state={stageState} setState={setStageState} setActiveDocument={setActiveDocument} activeDocument={activeDocument} archiveDocuments={archiveDocuments} setLiftedFolder={setLiftedFolder}/>
            <div className={"relative h-[100vh] w-[100vw] z-0 flex items-center justify-center overflow-hidden"}>
                <div className={"text-gray-700 text-3xl text-center"}>
                    archive document reader
                </div>
                {
                    liftedFolder && (
                        <AnimatedDocumentFolder onDocked={() => setLiftedFolder(s => s && {...s, phase: "docked"})} onOpened={() => setLiftedFolder(state => state && {...state, phase: "opening"})} state={liftedFolder}/>
                    )
                }
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
