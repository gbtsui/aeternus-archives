"use client";

import {useEffect, useMemo, useState} from "react";

type StartupProps = {
    visible: boolean;
    onFinish: () => void;
};

const message =
    "A play is driven by its actors, a game of chess by its pieces, a life by its actions.";
const message_2 =
    "What was - is not, " +
    "what will be - is not, " +
    "only what is now - is.";

const useTypewriter = (
    text: string,
    speed = 40,
    cooldownOnFinish = 500,
    onFinish: () => void
) => {
    const [index, setIndex] = useState(0);
    const displayText = useMemo(() => text.slice(0, index), [index]);
    useEffect(() => {
        if (index >= text.length)
            return;

        const timeoutId = setTimeout(() => {
            setIndex(i => i + 1);
        }, speed);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [index, text, speed]);

    useEffect(() => {
        if (displayText === text) {
            const timer = setTimeout(() => onFinish(), cooldownOnFinish);
            return () => clearTimeout(timer); // cleanup
        }
    }, [displayText, cooldownOnFinish, onFinish]);

    return displayText;
};


export default function Startup(props: StartupProps) {
    const typedMessage = useTypewriter(message, 40, 500, props.onFinish);

    if (!props.visible) {
        return null
    }

    return (
        <div className="bg-white text-black w-3/4 h-3/4 flex items-center justify-center absolute">
            <span className="text-lg">{typedMessage}</span>
        </div>
    );
}