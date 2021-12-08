import { FC } from "react";

export const Icon: FC<{ type: string; color?: string; size?: number }> = (props) => {
    return <i style={{ color: props.color ?? "inherit", fontSize: props.size ? `${props.size}px` : "inherit" }} className={`bi bi-${props.type}`}></i>;
};
