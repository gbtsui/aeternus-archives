"use client";

import {use} from "react";

export default function ElementPage({params} : {params: Promise<{atomicNumber: string}>}) {
    const {atomicNumber} = use(params)
    console.log(atomicNumber)

    return (
        <div>
            {atomicNumber}
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
