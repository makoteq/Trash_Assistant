import { MobileNet } from "@tensorflow-models/mobilenet";
import { Context, createContext } from "react";

// Global application contexts
export const videoDataCtx = createContext(null) as Context<VideoData | null>;
export const modelCtx = createContext(null) as Context<MobileNet | null>;

//0-papier,1-metale i tworzywa sztuczne,2-szkło,3-bio,4-resztkowe
export const database: DatabaseRecord[] = [
    { AIname: ["paper"], type: "Papier", color: "#383087", colorName: "Niebieski" },
    { AIname: ["water bottle", "pill bottle", "measuring cup", "water jug", "hair spray"], type: "Tworzywa sztuczne i Metale", color: "rgb(255,255,0)", colorName: "Żółty" },
    { AIname: [], type: "Metale", color: "#E31E25", colorName: "Czerwony" },
    { AIname: ["pop bottle"], type: "Szkło", color: "#009746", colorName: "Zielony" },
    { AIname: [], type: "Bio", color: "#8F7459", colorName: "Brązowy" },
    { AIname: ["lighter"], type: "Zmieszane", color: "#2C2928", colorName: "Czarny" },
    { AIname: ["cellular telephone", "iPod"], type: "PSZOK", color: "#2C2928", colorName: "Czarny" },
];

// Global constants
export const appName = "Trash Assistant";
export const accentColor = "#1A77AA";

// Global data structures
export interface DatabaseRecord {
    AIname: string[];
    type: string;
    color: string;
    colorName: string;
}
export interface VideoData {
    devices: MediaDeviceInfo[];
    device: MediaDeviceInfo;
    stream: MediaStream;
    setter: Function;
}
