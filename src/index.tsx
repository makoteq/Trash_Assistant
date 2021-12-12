import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { modelCtx } from "./constants";
import { load as loadModel } from "@tensorflow-models/mobilenet";
import { Box } from "./components/Box";
import { Icon } from "./components/Icon";
import { Video } from "./components/Video";

const main = async () => {
    try {
        const appContainer = document.querySelector("#app");
        const [videoData, model] = await Promise.all([Video.initialize(), loadModel()]);
        ReactDOM.render(
            <React.StrictMode>
                <modelCtx.Provider value={model}>
                    <Video.Provider data={videoData}>
                        <App />
                    </Video.Provider>
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
                    <h3 style={{ color: "#ff0000" }}>
                        Upewnij się, że strona posiada odpowiednie uprawnienia a urządzenie obsługuje wymagane funkcje. W przypadku niektórych urządzeń wymagane będzie również
                        połączenie HTTPS.
                    </h3>
                    <p style={{ color: "#666666" }}>{(e as Error).message}</p>
                </Box>
            </React.StrictMode>,
            document.querySelector("#app")
        );
    }
};

main();
serviceWorkerRegistration.register();
