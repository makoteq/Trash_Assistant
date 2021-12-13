import { MobileNet } from "@tensorflow-models/mobilenet";
import { Context, createContext, Dispatch, SetStateAction } from "react";

// Global application contexts
export const videoDataCtx = createContext(null) as Context<VideoCtx | null>;
export const modelCtx = createContext(null) as Context<MobileNet | null>;

//0-papier,1-metale i tworzywa sztuczne,2-szkło,3-bio,4-resztkowe
export const database: DatabaseRecord[] = [
  {
    AIname: ["paper", "crossword puzzle", "envelope", "toilet tissue"],
    type: "Papier",
    color: "#383087",
    colorName: "Kolor pojemnika: Niebieski",
  },
  {
    AIname: [
      "plastic bag",
      "water bottle",
      "pill bottle",
      "measuring cup",
      "water jug",
      "pong ball",
      "ashcan",
      "balloon",
    ],
    type: "Tworzywa sztuczne",
    color: "rgb(255,255,0)",
    colorName: "Kolor pojemnika: Żółty",
  },
  {
    AIname: ["spatula", "screw", "beer bottle", "can opener"],
    type: "Metale",
    color: "#E31E25",
    colorName: "Kolor pojemnika: Czerwony",
  },
  {
    AIname: ["pop bottle", "coffee mug", "cup"],
    type: "Szkło",
    color: "#009746",
    colorName: "Kolor pojemnika: Zielony",
  },
  {
    AIname: ["pomegranate", "fig", "lemon", "strawberry", "banana"],
    type: "Bio",
    color: "#8F7459",
    colorName: "Kolor pojemnika: Brązowy",
  },
  {
    AIname: [
      "lighter",
      "ballpoint",
      "Band Aid",
      "barometer",
      "basketball",
      "baseball",
      "bathing cap",
      "bath towel",
      "hair spray",
      "sunglasses",
      "stretcher",
      "hair slide",
      "lipstick",
      "pencil sharpener",
      "fountain pen",
    ],
    type: "Zmieszane",
    color: "#807571",
    colorName: "Kolor pojemnika: Czarny",
  },
  {
    AIname: [
      "cellular telephone",
      "iPod",
      "mouse",
      "keyboard",
      "laptop",
      "desktop computer",
      "toaster",
      "monitor",
      "television",
      "joystick",
      "beaker",
    ],
    type: "PSZOK",
    color: "#DB3747",
    colorName: "Oddaj do punktu PSZOK",
  },
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
  stream: MediaStream;
  devices: MediaDeviceInfo[];
  device: MediaDeviceInfo;
}
export type VideoCtx = VideoData & {
  setter: Dispatch<SetStateAction<VideoCtx>>;
};
