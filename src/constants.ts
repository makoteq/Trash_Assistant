import { MobileNet } from "@tensorflow-models/mobilenet";
import { Context, createContext } from "react";

// Global application contexts
export const videoStreamCtx = createContext(null) as Context<MediaStream | null>;
export const modelCtx = createContext(null) as Context<MobileNet | null>;

//0-papier,1-metale i tworzywa sztuczne,2-szkło,3-bio,4-resztkowe
export const database: DatabaseRecord[] = [
    { AIname: ["paper"], type: "Papier", color: "#383087", colorName: "Niebieski" },
    { AIname: ["water bottle", "pill bottle"], type: "Tworzywa sztuczne", color: "rgb(255,255,0)", colorName: "Żółty" },
    { AIname: [], type: "Metale", color: "#E31E25", colorName: "Czerwony" },
    { AIname: ["iPod", "pop bottle"], type: "Szkło", color: "#009746", colorName: "Zielony" },
    { AIname: [], type: "Bio", color: "#8F7459", colorName: "Brązowy" },
    { AIname: [], type: "Zmieszane", color: "#2C2928", colorName: "Czarny" },
];

// Global constants
export const appName = "Trash Assistant";

// Global data structures
interface DatabaseRecord {
    AIname: string[];
    type: string;
    color: string;
    colorName: string;
}
