"use client"

import Startup from "@/app/components/Startup";
import {useState} from "react";

type HomeState = "startup" | "standby" | "selected"

export default function Home() {
    const [homeState, setHomeState] = useState<HomeState>("startup");

    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className={"flex flex-col items-center justify-center"}>
                <Startup visible={homeState === "startup"} onFinish={() => setHomeState("standby")} />
            </div>
        </div>
    );
}
