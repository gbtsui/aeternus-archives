"use client";

import {periodicTableElementsBasicData} from "@/public/elementData/periodic-table";
import {ElementBasicMetadata} from "@/app/schema";
import ElementBlock from "@/app/components/periodic-table/ElementBlock";
import {PannableArea} from "@/app/components/universal/PannableArea";
import {useEffect, useMemo, useState} from "react";

type PeriodicTableProps = {
    visible: boolean;
}
/*
const initializeTable = () => {
//this function is just gonna play an animation when first loaded in with the various elements btw.
}

 */
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
    const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());

    const elements = Object.values(periodicTableElementsBasicData)
    const filledElements = elements.filter((el: ElementBasicMetadata) => {
        return el.archiveDocuments.length !== 0
    }, [])
    const shuffledElements = useMemo(() => {
        return shuffle([...filledElements]) as ElementBasicMetadata[];
    });
    const animationDuration = 2000 //in ms
    const timeBetweenElements = animationDuration / shuffledElements.length


    useEffect(() => {
        let mounted = true;
        if (shuffledElements.length && props.visible) {
            shuffledElements.forEach((el, index) => {
                setTimeout(() => {
                    if (!mounted) return;
                    setVisibleElements(prev => new Set(prev).add(el.atomicNumber));
                }, index * timeBetweenElements); // 50ms stagger, adjust for speed
            });
        }
        return () => { mounted = false; }
    }, [props.visible]);

    if (!props.visible) {
        return null
    }

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
                    return <ElementBlock elementData={element} key={element.atomicNumber}
                        visible={visibleElements.has(element.atomicNumber)}
                    />
                })}
            </div>
        </PannableArea>
    )
}
