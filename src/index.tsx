import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { videoStreamCtx } from "./constants";

const main = async () => {
    console.log("Requesting camera access...");
    const videoStream =
        (await window.navigator.mediaDevices?.getUserMedia({ video: { facingMode: "environment" } }).catch((e) => {
            if (e instanceof DOMException) {
                console.error("Camera permission denied");
            }
            return null;
        })) ?? null;
    ReactDOM.render(
        <React.StrictMode>
            <videoStreamCtx.Provider value={videoStream}>
                <App />
            </videoStreamCtx.Provider>
        </React.StrictMode>,
        document.querySelector("#app")
    );
};

main();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
