import { Context, createContext } from "react";

export const videoStreamCtx = createContext(null) as Context<MediaStream | null>;
