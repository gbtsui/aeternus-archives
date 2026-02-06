"use client";

import {use} from "react";
import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
//import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";
import ArchiveDocumentContainer from "@/app/components/periodic-table/ArchiveDocumentContainer";



export default function ElementPage({params} : {params: Promise<{atomicNumber: string}>}) {
    const {atomicNumber} = use(params)
    const atomicNumberAsNumber = Number(atomicNumber)

    if (!Number.isInteger(atomicNumberAsNumber)) {
        return <div>Error! Invalid element. Maybe I have not added it yet, or maybe it is an impossible atomic number...</div>
    }

    const elementData = periodicTableElementsBasicData[atomicNumberAsNumber];
    if (!elementData) {
        return <div>Element data not found.</div>
    }

    const archiveDocuments = elementData.archiveDocuments

    //refactor this iframe into a separate component at some point?
    //shadowDOM?
    //blegh

    /*
    return (
        <div>
            {archiveDocuments.map((archiveDoc, index) => <iframe src={archiveDoc.path} title={archiveDoc.title} key={index}></iframe>)}
        </div>
    )

     */
    return (
        <div>
            {archiveDocuments.map((archiveDoc, index) => <ArchiveDocumentContainer data={archiveDoc} key={index} atomicNumber={atomicNumberAsNumber}/>)}
            <div>{archiveDocuments.map((archiveDoc, index) => <div key={index}>{JSON.stringify(archiveDoc)}</div>)}</div>
        </div>
    )
}

/*"use server";

export default async function ElementPage({params}: {params: Promise<{atomic_number: string}>}) {
    const {atomic_number} = await params
    return <div>{atomic_number}</div>
}*/

/*"use client";

import {useRouter} from "next/navigation";

export default function ElementPage() {
    const router = useRouter()

    return (
        <div>
            {router.query.atomicNumber}
        </div>
    )
}*/

//general structure
//lwk just have it blank...? and then have an array of iframes or something
//i want it to be like card previews or sm
//like actual archive files in a drawer
