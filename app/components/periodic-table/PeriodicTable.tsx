"use client";

import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
import {ElementBasicMetadata} from "@/app/schema";
import {
    MouseEventHandler,
    MouseEvent,
    useRef,
    useState,
    ReactNode,
    WheelEventHandler
} from "react";
import ElementBlock from "@/app/components/periodic-table/ElementBlock";

type PeriodicTableProps = {
    visible: boolean;
}

const initializeTable = () => {

}

type PannableAreaProps = {
    children: ReactNode;
}

type SillyCoordinates = { x: number, y: number }

function PannableArea(props: PannableAreaProps) {
    const [offset, setOffset] = useState<SillyCoordinates>({x: 0, y: 0});
    const startRef = useRef<SillyCoordinates>({x: 0, y: 0});
    const offsetRef = useRef<SillyCoordinates>({x: 0, y: 0});
    const [panning, setPanning] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(1)

    const zoomOutLimit = 0.2 //how far out can you zoom?
    const zoomInLimit = 8 //how far in can you zoom?

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

    const onWheel: WheelEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()

        const rect = e.currentTarget.getBoundingClientRect()
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top

        const wx = (mx - offset.x) / scale
        const wy = (my - offset.y) / scale

        const zoomFactor = 0.001
        const next = Math.min(zoomInLimit, Math.max(zoomOutLimit, scale - e.deltaY * zoomFactor))
        //note for self later: clamps zoom to max zoom zoomInLimit and min zoom zoomOutLimit
        //im probably gonna forget afterwards lmao

        //setScale(Math.min(4, Math.max(0.25, next)))
        setOffset({
            x: mx - wx * next,
            y: my - wy * next
        })
        setScale(next)
    }

    //TODO: zoom+pan is kinda bugged... will need to look at later

    return (
        <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onWheel}
            style={{
                width: "98vw",
                height: "98vh",
                overflow: "hidden",
                border: "1px solid black",
                cursor: panning ? "grabbing" : "grab",
                backgroundColor: "#161625"
            }}
        >
            <div
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale}`,
                    transformOrigin: "0 0"
                    //width:
                }}
            >
                {props.children}
            </div>

        </div>
    )
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
                display:"grid",
                gridTemplateColumns: "repeat(18, 100px)",
                gridTemplateRows: "repeat(9, 100px)",
                gap: "5px"
            }}>
                {shuffledElements.map((element, index) => {
                    return <ElementBlock elementData={element} key={element.atomicNumber}/>
                })}
            </div>
        </PannableArea>
    )
}
