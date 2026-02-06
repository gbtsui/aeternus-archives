"use client";

import {use} from "react";
import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
//import ShadowDOMComponent from "@/app/components/universal/ShadowDOMComponent";
import ArchiveDocumentContainer from "@/app/components/periodic-table/ArchiveDocumentContainer";



export default function ElementPage({params} : {params: Promise<{atomicNumber: number}>}) {
    const {atomicNumber} = use(params)
    const elementData = periodicTableElementsBasicData[atomicNumber]
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
            {archiveDocuments.map((archiveDoc, index) => <ArchiveDocumentContainer data={archiveDoc} key={index} atomicNumber={atomicNumber}/>)}
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
