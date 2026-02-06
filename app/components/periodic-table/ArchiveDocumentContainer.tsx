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

    useEffect(() => {
        fetch(`/elementData/${atomicNumber}/${data.filename}`)
            .then(res => res.text())
            .then(result => setHtmlData(result))
    }, [atomicNumber, data.filename])

    if (!htmlData) return null;

    return (
        <div style={{contain: "initial"}} className={"h-1/2 bg-white text-black"}>
            <ShadowDOMComponent htmlContent={htmlData}/>
        </div>
    )
}