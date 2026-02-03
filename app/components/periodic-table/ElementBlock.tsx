"use client"

import {ElementBasicMetadata} from "@/app/schema";

type ElementBlockProps = {
    elementData: ElementBasicMetadata
}

export default function ElementBlock(props: ElementBlockProps) {
    const {elementData} = props;

    return (
        <div className={"w-[100px] h-[100px] bg-gray-700 flex"}> {/*container*/}
            <div className={"m-[4px] flex items-center w-full bg-gray-600"}> {/*border*/}
                <div className={"flex flex-col items-center w-full select-none"}>{/*inside thingy*/}
                    <div className={"w-full ml-[10px] self-start"}>{/*top part*/}
                        <div className={"text-start"}> {/*atomic number, top left*/}
                            {elementData.atomicNumber.toString()}
                        </div>
                    </div>
                    <div className={"text-center text-6xl self-center justify-self-center"}>{/*symbol*/}
                        {elementData.symbol}
                    </div>
                    <div className={"text-sm"}> {/*name*/}
                        {elementData.name}
                    </div>
                </div>
            </div>
        </div>
    )
}