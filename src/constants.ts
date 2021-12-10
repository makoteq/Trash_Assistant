import { MobileNet } from "@tensorflow-models/mobilenet";
import { Context, createContext } from "react";

export const videoStreamCtx = createContext(null) as Context<MediaStream | null>;
export const modelCtx = createContext(null) as Context<MobileNet | null>;

//0-papier,1-metale i tworzywa sztuczne,2-szkło,3-bio,4-resztkowe
export const database = [
    { AIname: "water bottle", type: 1 },
    { AIname: "cash machine", type: 0 },
    { AIname: "iPod", type: 0 },
    { AIname: "cash machine", type: 0 },
    { AIname: "cash machine", type: 0 },
    { AIname: "cash machine", type: 0 },
];
