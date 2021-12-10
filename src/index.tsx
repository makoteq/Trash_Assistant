import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { modelCtx, videoStreamCtx } from "./constants";
import { load as loadModel } from "@tensorflow-models/mobilenet";

const main = async () => {
    const appContainer = document.querySelector("#app");
    const infoLabel = document.createElement("p");
    infoLabel.style.fontSize = "25px";
    infoLabel.style.fontFamily = "Arial, sans-serif";
    infoLabel.style.fontWeight = "100";
    infoLabel.style.margin = "5px";
    infoLabel.innerHTML = "Oczekiwanie na uprawnienia dostępu do kamery...";
    appContainer?.children[0].appendChild(infoLabel);
    const videoStream =
        (await window.navigator.mediaDevices?.getUserMedia({ video: { facingMode: "environment" } }).catch((e) => {
            if (e instanceof DOMException) {
                console.error("Camera permission denied");
            }
            return null;
        })) ?? null;
    infoLabel.innerHTML = "Wczytywanie aplikacji...";
    const model = await loadModel();
    ReactDOM.render(
        <React.StrictMode>
            <modelCtx.Provider value={model}>
                <videoStreamCtx.Provider value={videoStream}>
                    <App />
                </videoStreamCtx.Provider>
            </modelCtx.Provider>
        </React.StrictMode>,
        appContainer
    );
};

main();
serviceWorkerRegistration.register();
