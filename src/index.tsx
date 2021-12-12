import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { modelCtx } from "./constants";
import { load as loadModel } from "@tensorflow-models/mobilenet";
import { Box } from "./components/Box";
import { Icon } from "./components/Icon";
import { VideoProvider } from "./components/VideoProvider";

const main = async () => {
    try {
        const appContainer = document.querySelector("#app");
        const infoLabel = document.createElement("p");
        infoLabel.style.fontSize = "25px";
        infoLabel.style.fontFamily = "Arial, sans-serif";
        infoLabel.style.fontWeight = "100";
        infoLabel.style.margin = "5px";
        infoLabel.innerHTML = "Oczekiwanie na uprawnienia dostępu do kamery...";
        appContainer?.children[0].appendChild(infoLabel);
        const videoDevices = (await window.navigator.mediaDevices?.enumerateDevices().then((d) => d.filter((d) => d.kind === "videoinput"))) ?? [];
        const videoDeviceId =
            window.localStorage.getItem("videoDeviceId") ??
            videoDevices[0]?.deviceId ??
            (() => {
                throw new Error("Cannot access any video device");
            })();
        const videoStream =
            (await window.navigator.mediaDevices?.getUserMedia({ video: { deviceId: videoDeviceId } }).catch((e) => {
                if (e instanceof DOMException) {
                    return null;
                }
            })) ??
            (await window.navigator.mediaDevices?.getUserMedia({ video: { facingMode: "environment" } }).catch((e) => {
                if (e instanceof DOMException) {
                    return null;
                }
            })) ??
            (() => {
                throw new Error("Video stream not found");
            })();
        infoLabel.innerHTML = "Wczytywanie aplikacji...";
        if (videoDevices.length === 0) {
            throw new Error("No video devices found");
        }
        const model = await loadModel();
        ReactDOM.render(
            <React.StrictMode>
                <modelCtx.Provider value={model}>
                    <VideoProvider
                        devices={videoDevices}
                        device={videoDevices.find((d) => d.deviceId === videoDeviceId || d.deviceId === videoStream.getVideoTracks()[0].getSettings().deviceId) as MediaDeviceInfo}
                        stream={videoStream}
                    >
                        <App />
                    </VideoProvider>
                </modelCtx.Provider>
            </React.StrictMode>,
            appContainer
        );
    } catch (e) {
        console.error(e);
        ReactDOM.render(
            <React.StrictMode>
                <Box verticalAlignment="center" horizontalAlignment="center" gap={3} direction="column">
                    <Icon type={"x-circle"} color={"#ff0000"} size={120}></Icon>
                    <h1 style={{ color: "#ff0000" }}>Podczas ładowania aplikacji wystąpił błąd</h1>
                    <h2 style={{ color: "#ff0000" }}>Upewnij się, że przyznałeś stronie odpowiednie uprawnienia oraz że twoje urządzenie obsługuje wymagane funkcje</h2>
                    <p style={{ color: "#666666" }}>{(e as Error).message}</p>
                </Box>
            </React.StrictMode>,
            document.querySelector("#app")
        );
    }
};

main();
serviceWorkerRegistration.register();
