"use client";

import {ArchiveDocumentMetadata} from "@/app/schema";
import {useEffect, useState} from "react";
import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";
import {PannableArea} from "@/app/components/universal/PannableArea";

type ArchiveDocumentContainerProps = {
    data: ArchiveDocumentMetadata,
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
    const {data, atomicNumber} = props;
    const [htmlData, setHtmlData] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                const res = await fetch(`/elementData/${atomicNumber}/${data.filename}`)

                if (!res.ok) {
                    throw new Error(`failed to load ${data.filename}. check logs pls!!!`)
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
    }, [atomicNumber, data.filename])

    if (error) return <div>{error}</div>
    if (!htmlData) return null;


    //need to add good animations and stuff.
    //also panning and such
    //should just be a wrapper around ShadowDOMComponent?
    return (
        <div className={"absolute z-[201] w-[80vw] h-[80vh]"}> {/*full container?*/}
            <div className={"absolute"}> {/*viewport frame - fixed size...*/}
                <PannableArea style={{
                    width: "80vw",
                    height: "80vh"
                }}>{/*camera layer! apply same translate scale to document as earlier pan+zoom logic*/}
                    <div style={{contain: "initial"}} className={"h-[100%] bg-white text-black"}>
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