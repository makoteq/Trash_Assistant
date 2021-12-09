import { MobileNet } from "@tensorflow-models/mobilenet";
import { Context, createContext } from "react";

export const videoStreamCtx = createContext(null) as Context<MediaStream | null>;
export const modelCtx = createContext(null) as Context<MobileNet | null>;
