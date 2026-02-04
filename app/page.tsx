"use client"

import Startup from "@/app/components/Startup";
import {useEffect, useState} from "react";
import PeriodicTable from "@/app/components/periodic-table/PeriodicTable";

type HomeState = "startup" | "standby" | "selected" | "loading"

export default function Home() {
    const [homeState, setHomeState] = useState<HomeState>(() => {
        if (typeof window === "undefined") return "loading"

        const hasPlayed = sessionStorage.getItem("startup-played")
        return hasPlayed ? "standby" : "startup"
    });

    /*

    useEffect(() => {
        const hasPlayed = sessionStorage.getItem("startup-played")

        if (!hasPlayed) {
            setHomeState("startup")
        } else {
            setHomeState("standby")
        }
    }, [])
    //ts will cause cascading
     */

    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className={"flex flex-col items-center justify-center"}>
                <Startup visible={homeState === "startup"} onFinish={() => setHomeState("standby")}/>
                <PeriodicTable visible={homeState === "standby"}/>

                {homeState === "loading" && <div className={"self-center items-center"}>loading...</div>}
            </div>
        </div>
    );
}
