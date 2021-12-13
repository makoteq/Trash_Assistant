import { FC } from "react";
import style from "./index.module.scss";

export const Link: FC<{ to: string }> = (props) => (
    <a className={style.link} rel="noreferrer" target={"_blank"} href={props.to}>
        {props.children}
    </a>
);
