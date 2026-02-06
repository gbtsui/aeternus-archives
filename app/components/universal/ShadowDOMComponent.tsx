"use client";

import {ReactNode, useEffect, useRef} from "react";


export default function ShadowDOMComponent({htmlContent, children}: {htmlContent: string, children: ReactNode[] | ReactNode}) {
    const hostRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return

        const shadowRoot: ShadowRoot = host.shadowRoot ?? host.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = htmlContent;
    }, [htmlContent]);

    return <div ref={hostRef}>{children}</div>
}

//do i have to use HTMLContent?

