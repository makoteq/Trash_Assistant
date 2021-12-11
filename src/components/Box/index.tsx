import { FC } from "react";

export const Box: FC<{
    direction?: "row" | "column";
    gap?: number;
    horizontalAlignment?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "space-around";
    verticalAlignment?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "space-around";
    className?: string;
}> = (props) => {
    return (
        <div
            className={props.className ?? ""}
            style={{
                display: "flex",
                alignItems: props.verticalAlignment ?? "flex-start",
                justifyContent: props.horizontalAlignment ?? "flex-start",
                columnGap: `${props.gap}px` ?? 0,
                rowGap: `${props.gap}px` ?? 0,
                flexDirection: props.direction ?? "row",
            }}
        >
            {props.children}
        </div>
    );
};
