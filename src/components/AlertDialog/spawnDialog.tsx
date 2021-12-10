import { CSSProperties, ReactNode } from "react";
import ReactDOM from "react-dom";
import { AlertDialog } from "./index";

export const spawnDialog = async (elements: (close: (data: any) => void) => ReactNode, windowStyles?: CSSProperties) => {
    const container = document.createElement("div");
    const backgroundColor = "rgba(0,0,0,0.75)";
    const animationDuration = 250;

    (container.style as any) = "display: block; overflow: hidden; width: 100vw; height: 100vh; z-index: 20; position: fixed; top: 0; left: 0";

    return new Promise((resolve) => {
        const closeWindow = (value: any) => {
            container.animate([{ backgroundColor: backgroundColor }, { backgroundColor: "rgba(0,0,0,0)" }], {
                easing: "ease",
                duration: animationDuration,
                fill: "both",
            });
            window.animate(
                [
                    { transform: "scale(1)", opacity: 1 },
                    { transform: "scale(0)", opacity: 0 },
                ],
                {
                    easing: "ease",
                    duration: animationDuration,
                }
            );
            setTimeout(() => {
                ReactDOM.unmountComponentAtNode(container);
                container.remove();
                resolve(value ?? null);
            }, animationDuration);
        };

        document.body.appendChild(container);
        ReactDOM.render(<AlertDialog style={windowStyles ?? {}}>{elements(closeWindow)}</AlertDialog>, container);
        const window = container.children[0];
        container.animate([{ backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: backgroundColor }], {
            easing: "ease",
            duration: animationDuration,
            fill: "both",
        });
        window.animate(
            [
                { transform: "scale(0)", opacity: 0 },
                { transform: "scale(1)", opacity: 1 },
            ],
            {
                easing: "ease",
                duration: animationDuration,
            }
        );
    });
};
