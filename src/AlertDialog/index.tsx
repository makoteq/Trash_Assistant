import { CSSProperties, FC } from "react";
import style from "./index.module.scss";

export const AlertDialog: FC<{ style: CSSProperties }> = (props) => {
    return (
        <div className={style.container}>
            <div className={style.window} style={props.style}>
                {props.children}
            </div>
        </div>
    );
};
