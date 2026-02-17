"use client";

import {use,useState} from "react";
import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
//import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";
import StickyNote from "@/app/components/aesthetic/StickyNote";
import DocumentStage, {StageState} from "@/app/components/archive-pages/DocumentStage";
import AnimatedDocumentFolder, {AnimatedFolderLiftState} from "@/app/components/archive-pages/AnimatedDocumentFolder";
import ArchiveDocumentContainer from "@/app/components/periodic-table/ArchiveDocumentContainer";
import {useRouter} from "next/navigation";


export default function ElementPage({params} : {params: Promise<{atomicNumber: string}>}) {
    const {atomicNumber} = use(params)
    const atomicNumberAsNumber = Number(atomicNumber)
    const router = useRouter()
    //const [activeDocument, setActiveDocument] = useState<ArchiveDocumentMetadata | null>(null)
    //might lwk deprecate since liftedFolder now includes activeDocument... it was a good run while i was using it
    const [stageState, setStageState] = useState<StageState>("open")
    const [liftedFolder, setLiftedFolder] = useState<AnimatedFolderLiftState>(null)

    const [randomStickyNote, setRandomStickyNote] = useState(() => {
        if (typeof window === "undefined") return "loading"

        const hasTutorials = sessionStorage.getItem("tutorialClicked")
        return !!hasTutorials
    })

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
            <div className={"absolute top-[1vh] left-[1vw] w-[6vw] h-[4vh] z-[1000] cursor-pointer bg-gray-800 text-center text-xl"}
                onClick={() => router.push("/")}
            >
                back
            </div>

            {
                !randomStickyNote && (
                    <>
                        <StickyNote position={{top: "20vh", right: "10vw"}} onClick={() => {
                            sessionStorage.setItem("tutorialClicked", "true")
                        }}>
                            pick a folder to get started!
                        </StickyNote>
                        <StickyNote position={{top: "10vh", right: "20vw"}} onClick={() => {
                            sessionStorage.setItem("tutorialClicked", "true")
                        }}>
                            please remove stickynotes before operating the document reader, thanks :)

                            <div className={"text-lg"}>
                                - bookkeeper
                            </div>
                        </StickyNote>
                    </>
                )
            }

            <DocumentStage state={stageState} setState={setStageState} archiveDocuments={archiveDocuments} setLiftedFolder={setLiftedFolder} liftedFolder={liftedFolder}/>
            <div className={"relative h-[100vh] w-[100vw] z-0 flex items-center justify-center overflow-hidden"}>
                <div className={"text-gray-700 text-3xl text-center"}>
                    archive document reader
                </div>
                {
                    liftedFolder && (
                        <AnimatedDocumentFolder
                            onDocked={() => {
                                setLiftedFolder(s => s && {...s, phase: "docked"});
                                console.log("docked")
                            }}
                            onOpened={() => {
                                setLiftedFolder(state => state && {...state, phase: "opening"})
                                console.log("opened")
                            }}
                            onDisappearing={() => {
                                setLiftedFolder(state => state && {...state, phase: "disappearing"})
                            }}
                            onDisappeared={() => {
                                setLiftedFolder(null);
                            }}
                            state={liftedFolder}/>
                    )
                }
                {
                    liftedFolder?.doc && (liftedFolder.phase === "opening" || liftedFolder.phase === "docked") &&
                    <ArchiveDocumentContainer atomicNumber={atomicNumberAsNumber} liftedFolder={liftedFolder} setLiftedFolder={setLiftedFolder}/>
                }
            </div>

            {/*
            {activeDocument && <ArchiveDocumentContainer data={activeDocument} atomicNumber={atomicNumberAsNumber}/>}
            {activeDocument ? <div>{activeDocument.toString()}</div> : <div>null</div>}
            */}
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
