"use client";

import {ArchiveDocumentMetadata} from "@/app/schema";
import {useEffect, useState} from "react";
import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";

type ArchiveDocumentContainerProps = {
    data: ArchiveDocumentMetadata,
    atomicNumber: number
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
        <div style={{contain: "initial"}} className={"h-1/2 bg-white text-black"}>
            <ShadowDOMComponent htmlContent={htmlData}/>
        </div>
    )
}