import {
    createContext,
    Dispatch,
    PointerEvent,
    PointerEventHandler,
    ReactNode,
    RefObject,
    SetStateAction, useContext, useRef, useState,
    WheelEventHandler
} from "react";

type PannableAreaProps = {
    children: ReactNode;
    style?: PannableAreaPropsStyle;
}

type PannableAreaPropsStyle = {
    width?: string,
    height?: string,
}

type SillyCoordinates = { x: number, y: number }

export type usePannableAreaTypes = {
    offset: SillyCoordinates;
    setOffset: Dispatch<SetStateAction<SillyCoordinates>>,
    startRef: RefObject<SillyCoordinates>,
    offsetRef: RefObject<SillyCoordinates>,
    panning: boolean,
    setPanning: Dispatch<SetStateAction<boolean>>
    setScale: Dispatch<SetStateAction<number>>,
    scale: number,
    mouseDown: boolean,
    setMouseDown: Dispatch<SetStateAction<boolean>>,
    didDrag: boolean,
    setDidDrag: Dispatch<SetStateAction<boolean>>,
}

//THIS ONE CREATES AN INSTANCE!!!!
export const usePannable: () => usePannableAreaTypes = (): usePannableAreaTypes => {
    const [offset, setOffset] = useState<SillyCoordinates>({x: 0, y: 0});
    const startRef = useRef<SillyCoordinates>({x: 0, y: 0});
    const offsetRef = useRef<SillyCoordinates>({x: 0, y: 0});
    const [panning, setPanning] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(1)
    const [mouseDown, setMouseDown] = useState<boolean>(false)
    const [didDrag, setDidDrag] = useState<boolean>(false)

    return {
        offset,
        setOffset,
        startRef,
        offsetRef,
        panning,
        setPanning,
        setScale,
        scale,
        mouseDown,
        setMouseDown,
        didDrag,
        setDidDrag
    }
}

export const PannableContext = createContext<ReturnType<typeof usePannable> | null>(null)

//THIS ONE IS SUPPOSED TO BE USED EVERYWHERE ELSE
export const usePannableContext = () => {
    const context = useContext(PannableContext)
    if (!context) throw new Error("usePannable must be used inside PannableArea :P")
    return context
}



export const PannableArea = (props: PannableAreaProps) => {
    const pannable = usePannable()
    const {
        offset,
        setOffset,
        startRef,
        offsetRef,
        panning,
        setPanning,
        setScale,
        scale,
        mouseDown,
        setMouseDown,
        //didDrag,
        setDidDrag
    } = pannable

    const zoomOutLimit = 0.2 //how far out can you zoom?
    const zoomInLimit = 8 //how far in can you zoom?

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (event: PointerEvent<HTMLDivElement>) => {
        setPanning(false)
        setMouseDown(true)
        startRef.current = {x: event.clientX, y: event.clientY}
    }

    const onPointerMove: PointerEventHandler<HTMLDivElement> = (e: PointerEvent<HTMLDivElement>) => {
        const dx = e.clientX - startRef.current.x
        const dy = e.clientY - startRef.current.y

        if (!panning && mouseDown) {
            if (Math.hypot(dx, dy) > 1) {
                setPanning(true)
                setDidDrag(true)
            } else {
                return
            }
        }

        if (!panning) return

        setOffset({
            x: offsetRef.current.x + dx,
            y: offsetRef.current.y + dy
        })
    }

    const onPointerUp: PointerEventHandler<HTMLDivElement> = () => {
        //event.currentTarget.releasePointerCapture(event.pointerId) //only will work for onPointerUp... research difference tmr and allat
        setPanning(false)
        setMouseDown(false)
        setDidDrag(false)
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
        <PannableContext.Provider value={pannable}>
            <div
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerUp}
                onWheel={onWheel}
                style={{
                    width: props.style?.width ?? "98vw",
                    height: props.style?.height ?? "98vh",
                    overflow: "hidden",
                    border: "1px solid black",
                    cursor: panning ? "grabbing" : "grab",
                    backgroundColor: "#161625"
                }}>
                <div
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: "0 0",
                        //width:
                    }}>
                    {props.children}
                </div>

            </div>
        </PannableContext.Provider>
    )
}