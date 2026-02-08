//"use client";

//import {ArchiveDocumentMetadata} from "@/app/schema";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";
import {PannableArea} from "@/app/components/universal/PannableArea";
import {AnimatedFolderLiftState} from "@/app/components/archive-pages/AnimatedDocumentFolder";

type ArchiveDocumentContainerProps = {
    //data: ArchiveDocumentMetadata,
    liftedFolder: AnimatedFolderLiftState,
    setLiftedFolder: Dispatch<SetStateAction<AnimatedFolderLiftState>>,
    atomicNumber: number
}

export type ArchiveDocumentContainerState = {
    phase: "opening" | "expanding" | "reading" | "closing"
}

const frameCSS = {
    position: "relative",
    overflow: "hidden",
    width: "800px",
    height: "600px"
}

export default function ArchiveDocumentContainer(props: ArchiveDocumentContainerProps) {
    const {liftedFolder, setLiftedFolder, atomicNumber} = props;
    const [htmlData, setHtmlData] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                const res = await fetch(`/elementData/${atomicNumber}/${liftedFolder?.doc.filename}`)

                if (!res.ok) {
                    throw new Error(`failed to load ${liftedFolder?.doc.filename}. check logs pls!!!`)
                }

                const text = await res.text()
                if (!cancelled) setHtmlData(text)
            } catch (err0rc0dezer0) {
                if (!cancelled) setError(String(err0rc0dezer0))
            }
        }

        load();

        return () => {
            cancelled = true
        }
    }, [atomicNumber, liftedFolder?.doc.filename])

    if (error) return <div>{error}</div>
    if (!htmlData) return null;


    //need to add good animations and stuff.
    //also panning and such
    //should just be a wrapper around ShadowDOMComponent?
    return (
        <div className={"absolute z-[201] w-[84vw] h-[85vh] flex items-center"}> {/*full container?*/}
            <div className={"relative p-[2rem] bg-gray-500 flex flex-col gap-0.5"}> {/*viewport frame - fixed size...*/}
                <div className={"text-lg text-gray-300"}>
                    aeternus document viewer - Version One
                </div>
                <div className={"text-center flex flex-row justify-between align-middle "}>
                    <div className={"justify-self-center self-center "}>
                        Current Document: <span className={"font-bold"}>{liftedFolder?.doc.title}</span>
                    </div>
                    <div
                        className={"text-center select-none self-center cursor-pointer rounded-md text-xl size-[2.67rem] bg-gray-600 hover:bg-red-500 transition-all m-[0.5rem]"}
                        onClick={() => setLiftedFolder(state => state && {...state, phase: "disappearing"})}
                    >
                        x
                    </div>
                </div>
                <PannableArea style={{
                    width: "80vw",
                    height: "80vh"
                }}>{/*camera layer! apply same translate scale to document as earlier pan+zoom logic*/}
                    <div style={{contain: "initial"}}>
                        <ShadowDOMComponent htmlContent={htmlData}/> {/*document inside should never handle pan or zoom btw*/}
                    </div>
                </PannableArea>
            </div>
        </div>
    )
}

//okay so CSS transforms really shouldnt cross shadowDOM boundaries. ts would be bad because it messes up all the internal HTML styling i will work hard on
//contain: initial should probably get things done...? plus the shadowDOMRoot itself should probably handle it
//i'll need to debug if it comes up tho.
//WHY DID I WRITE THIS????? ^^ ???????
//kyrie eleison bro what was i on that was a RANCID statement