"use client";

import {CSSProperties, ReactNode, useEffect, useState} from "react";
import "@/app/stylesheets/stickyNote.css"

type StickyNoteProps = {
    children?: ReactNode,
    tilt?: number; //if unprovided, will be randomized
}


export default function StickyNote(props: StickyNoteProps) {
    const {children} = props;
    const [tilt, setTilt] = useState(props.tilt || 0);
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const funny_async_function = async () =>  {if (!props.tilt) setTilt(Math.round((Math.random() - 0.5) * 20))}

        funny_async_function();
        return () => {}
    }, [setTilt, props.tilt]);

    const harryStyles: CSSProperties = {
        transform: `rotate(${tilt}deg)`,
        animationDuration: "300ms",
        cursor: "pointer",
        overflow: "hidden",
    }

    if (!mounted) return null;

    return (
        <div className={`absolute font-nothing-you-could-do bg-amber-200 text-blue-900 w-[200px] h-[200px] text-center justify-center p-[25px] flex flex-col cursor-pointer pointer-events-auto z-10 ${visible ? "" : "exit"} `} style={harryStyles} onClick={() => setVisible(false)} onAnimationEnd={() => setMounted(false)}>

            {children}
            <div className={"cursor-pointer"}>
                {tilt}deg
            </div>
        </div>
    )
}