"use client";

import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
import {ElementBasicMetadata} from "@/app/schema";
import {MouseEventHandler, MouseEvent, useRef, useState, ReactNode} from "react";

type PeriodicTableProps = {
    visible: boolean;
}

const initializeTable = () => {

}

type PannableAreaProps = {
    children: ReactNode;
}

type SillyCoordinates = {x: number, y: number}

function PannableArea(props: PannableAreaProps) {
    const [offset, setOffset] = useState<SillyCoordinates>({x: 0, y: 0});
    const startRef = useRef<SillyCoordinates>({x: 0, y: 0});
    const offsetRef = useRef<SillyCoordinates>({x: 0, y: 0});
    const [panning, setPanning] = useState(false);

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (event: MouseEvent) => {
        setPanning(true)
        startRef.current = {x: event.clientX, y: event.clientY}
    }

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e: MouseEvent) => {
        if (!panning) return

        const dx = e.clientX - startRef.current.x
        const dy = e.clientY - startRef.current.y

        setOffset({
            x: offsetRef.current.x + dx,
            y: offsetRef.current.y + dy
        })
    }

    const onMouseUp: MouseEventHandler<HTMLDivElement> = () => {
        setPanning(false)
        offsetRef.current = offset
    }

    return (
        <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                border: "1px solid black",
                cursor: panning ? "grabbing" : "grab",
            }}
        >
            <div
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                    //width:
                }}
            >
                {props.children}
            </div>

        </div>
    )
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

    return <PannableArea><div className={"select-none"}>test one two three</div></PannableArea>
}