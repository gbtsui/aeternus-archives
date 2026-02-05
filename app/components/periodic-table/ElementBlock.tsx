"use client"

import {ElementBasicMetadata} from "@/app/schema";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {usePannableContext} from "@/app/components/periodic-table/PeriodicTable";

type ElementBlockProps = {
    elementData: ElementBasicMetadata
}

const elementTypeColors : Record<string, string> = {
    "alkali": "#f38c8c",
    "alkalineEarth": "#f3ca8c",
    "transitionMetal": "#f3e28c",
    "postTransitionMetal": "#bef38c",
    "metalloid": "#8cf3cc",
    "nonMetal": "#8cd8f3",
    "halogen": "#ba8cf3",
    "nobleGas": "#f38ce2",
    "lanthanide": "#a96565",
    "actinide": "#80a965",
}

export default function ElementBlock(props: ElementBlockProps) {
    const {elementData} = props;
    const router = useRouter();
    const [hovering, setHovering] = useState(false);

    const hoverStyle = {
        //color: "#000000",
        backgroundColor: "#fffbeb",
        cursor: "pointer",
    }

    const hoverTextStyle = {
        color: "#000000",
    }

    const hoverBackgroundStyle = {
        backgroundColor: elementTypeColors[elementData.elementType],
        boxShadow: `0 0 10px ${elementTypeColors[elementData.elementType]}`,
    }

    const {panning, didDrag} = usePannableContext()


    const onPointerUp = () => {
        if(!panning && !didDrag){
            router.push(`/atomicNumber/${elementData.atomicNumber}`) //add more later!! need animation here
        }
    }


    return (
        <div className={"w-[100px] h-[100px] bg-gray-700 flex"}
             style={{
                 gridColumn: elementData.column,
                 gridRow: elementData.row,
                 transition: "all 0.5s ease",
                 ...(hovering ? hoverStyle : {})
        }}
             onPointerOver={() => setHovering(true)}
             onPointerLeave={() => setHovering(false)}
             onPointerUp={onPointerUp}
        > {/*container*/}
            <div className={"m-[4px] flex items-center w-full bg-gray-600 text-gray-300"}> {/*border*/}
                <div className={"flex flex-col items-center w-full m-[5px] select-none rounded-sm backdrop-blur-sm"}
                     style={{transition: "all 0.7s ease", ...(hovering ? hoverBackgroundStyle : {})}}
                    >{/*inside thingy*/}


                    <div className={"w-full ml-[10px] self-start"}>{/*top part*/}
                        <div className={"text-start"}
                             style={{transition: "all 0.7s ease", ...(hovering ? hoverTextStyle : {})}}
                        > {/*atomic number, top left*/}
                            {elementData.atomicNumber.toString()}
                        </div>
                    </div>
                    <div className={"text-center text-6xl self-center justify-self-center"}
                    style={{transition: "all 0.7s ease", ...(hovering ? hoverTextStyle : {})}}>{/*symbol*/}
                        {elementData.symbol}
                    </div>
                    <div className={"text-sm"}
                         style={{transition: "all 0.7s ease", ...(hovering ? hoverTextStyle : {})}}
                    > {/*name*/}
                        {elementData.name}
                    </div>

                </div>
            </div>
        </div>
    )
}