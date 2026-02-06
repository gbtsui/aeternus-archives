"use client";

import {useEffect, useRef} from "react";


export default function ShadowDOMComponent({htmlContent}: {htmlContent: string}) {
    const hostRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return

        const shadowRoot: ShadowRoot = host.shadowRoot ?? host.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = htmlContent;
    }, [htmlContent]);

    return <div ref={hostRef}/>
}