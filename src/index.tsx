import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { modelCtx, videoStreamCtx } from "./constants";
import { load as loadModel } from "@tensorflow-models/mobilenet";

const main = async () => {
    console.log("Requesting camera access...");
    const videoStream =
        (await window.navigator.mediaDevices?.getUserMedia({ video: { facingMode: "environment" } }).catch((e) => {
            if (e instanceof DOMException) {
                console.error("Camera permission denied");
            }
            return null;
        })) ?? null;
    console.log("Loading AI model...");
    const model = await loadModel();
    ReactDOM.render(
        <React.StrictMode>
            <modelCtx.Provider value={model}>
                <videoStreamCtx.Provider value={videoStream}>
                    <App />
                </videoStreamCtx.Provider>
            </modelCtx.Provider>
        </React.StrictMode>,
        document.querySelector("#app")
    );
};

main();
serviceWorkerRegistration.register();
