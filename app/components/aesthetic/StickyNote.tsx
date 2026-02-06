"use client";

import {CSSProperties, ReactNode, useEffect, useState} from "react";

type StickyNoteProps = {
    children?: ReactNode,
    tilt?: number; //if unprovided, will be randomized
}

export default function StickyNote(props: StickyNoteProps) {
    const {children} = props;
    const [tilt, setTilt] = useState(props.tilt || 0);

    useEffect(() => {
        const funny_async_function = async () =>  {if (!props.tilt) setTilt(Math.round((Math.random() - 0.5) * 20) ?? 3)}

        funny_async_function();
        return () => {}
    }, [setTilt, props.tilt]);

    const harryStyles: CSSProperties = {
        rotate: `${tilt}deg`,
    }

    return (
        <div className={"absolute font-nothing-you-could-do bg-amber-200 text-blue-900 w-[200px] h-[200px] text-center justify-center p-[25px] flex flex-col"} style={harryStyles}>
            {children}
            <div>
                {tilt}deg
            </div>
        </div>
    )
}