import { MobileNet } from "@tensorflow-models/mobilenet";
import { Context, createContext, Dispatch, SetStateAction } from "react";

// Global application contexts
export const videoDataCtx = createContext(null) as Context<VideoCtx | null>;
export const modelCtx = createContext(null) as Context<MobileNet | null>;

//0-papier,1-metale i tworzywa sztuczne,2-szkło,3-bio,4-resztkowe
export const database: DatabaseRecord[] = [
  {
    AIname: [
      "paper",
      "paper towel",
      "crossword puzzle",
      "envelope",
      "toilet tissue",
      "file",
      "jigsaw puzzle",
    ],
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
      "spatula",
      "screw",
      "can opener",
      "brass",
      "caldron",
      "chain",
      "corkscrew",
      "milk can",
    ],
    type: "Tworzywa sztuczne",
    color: "rgb(255,255,0)",
    colorName: "Kolor pojemnika: Żółty",
  },
  {
    AIname: ["pop bottle", "beer bottle", "beer glass", "red wine"],
    type: "Szkło",
    color: "#009746",
    colorName: "Kolor pojemnika: Zielony",
  },
  {
    AIname: [
      "pomegranate",
      "fig",
      "lemon",
      "strawberry",
      "banana",
      "apple",
      "honeycomb",
    ],
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
      "candle",
      "Christmas stocking",
      "cocktail shaker",
      "coffee mug",
      "dishrag",
      "cup", 
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
      "car wheel",
      "cassette player",
      "CD player",
      "computer keyboard",
      "electric guitar",
      "electric locomotive",
      "espresso maker",
      "hard disc",
      "microwave",
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
