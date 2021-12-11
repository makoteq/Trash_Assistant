import { MobileNet } from "@tensorflow-models/mobilenet";
import { Context, createContext } from "react";

export const videoStreamCtx = createContext(null) as Context<MediaStream | null>;
export const modelCtx = createContext(null) as Context<MobileNet | null>;

//0-papier,1-metale i tworzywa sztuczne,2-szkło,3-bio,4-resztkowe
export const database = [
    { AIname: "water bottle", type: "_0" },
    { AIname: "cash machine", type: "_1" },
    { AIname: "iPod", type: "_2" },
    { AIname: "cash machine", type: "_3" },
    { AIname: "cash machine", type: "_4" },
    { AIname: "cash machine", type: "_5" },
];
