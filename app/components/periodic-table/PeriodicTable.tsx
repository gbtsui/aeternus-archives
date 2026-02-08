"use client";

import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
import {ElementBasicMetadata} from "@/app/schema";
import ElementBlock from "@/app/components/periodic-table/ElementBlock";
import {PannableArea, usePannableContext} from "@/app/components/universal/PannableArea";

type PeriodicTableProps = {
    visible: boolean;
}

const initializeTable = () => {

}
function shuffle(array: unknown[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

//periodic table will be the pannable viewport
export default function PeriodicTable(props: PeriodicTableProps) {


    if (!props.visible) {
        return null
    }

    /*
    return (
        <div className={"bg-red-800 overflow-hidden min-h-screen min-w-screen"}>
            <div>
                <div className={"bg-white p-4"}>test test one two three</div>
            </div>
        </div>
    )
    */


    const elements = Object.values(periodicTableElementsBasicData)
    const shuffledElements = shuffle(elements) as unknown as ElementBasicMetadata[];


    return (
        <PannableArea>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(18, 100px)",
                gridTemplateRows: "repeat(9, 100px)",
                gap: "5px"
            }}
                 className={"self-center"}
            >
                {shuffledElements.map((element) => {
                    return <ElementBlock elementData={element} key={element.atomicNumber}/>
                })}
            </div>
        <DidDragChecker/>
        </PannableArea>
    )
}

const DidDragChecker = () => {

    const {didDrag} = usePannableContext()
    return <div className={"text-7xl"}>{didDrag ? "true" : "false"}</div>
}