import { FC, useState } from "react";
import { appName } from "../../constants";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { IntroPage } from "../IntroPage";
import style from "./index.module.scss";

const pages = [
    <div></div>,
    <IntroPage title={`Witaj w ${appName}`} content={<img alt="application logo" src="logo192.png" />} />,
    <IntroPage
        title="Jak to działa?"
        content={
            <p>
                Masz problem przy zapamiątaniu podstawowych zasad sortowania odpadów? Ta aplikacja ci w tym pomoże. To bardzo proste. Naceluj kamerą na objekt, który zamierzasz
                wyrzucić i naciśnij przycisk z ikoną <Icon type="camera" size={20} /> u dołu ekranu.
            </p>
        }
    />,
    <IntroPage
        title="Technologia"
        content={
            <p>
                Aplikacja korzysta z nowoczesnej technologi opartej na sztucznej inteligencji, która używa mocy obliczeniowej urządzenia w celu rozpoznawania i klasyfikowania
                różnych typów odpadów.
            </p>
        }
    />,
    <IntroPage
        title="Więcej"
        content={
            <p>
                Aby uzyskać informacje o autorach projektu skorzystaj z przycisku <Icon type="info-circle" size={20} /> w prawym górnym rogu ekranu.
            </p>
        }
    />,
];

export const Intro: FC<{ closeFn: (data?: any) => void }> = (props) => {
    const [page, setPage] = useState(1);
    const changePage = (i: number) => {
        setPage(0);
        setTimeout(() => {
            setPage(i);
        }, 0);
    };

    return (
        <div className={style.container}>
            <div>{pages[page]}</div>
            <Box direction="row" verticalAlignment="center" gap={10}>
                {page !== 0 && page !== 1 && (
                    <button
                        style={{ flex: 1 }}
                        onClick={() => {
                            if (page - 1 >= 1) changePage(page - 1);
                        }}
                    >
                        <Icon type="arrow-left" /> Wstecz
                    </button>
                )}
                {page !== 0 && (
                    <button
                        onClick={() => {
                            if (page + 1 < pages.length) changePage(page + 1);
                            else if (page + 1 === pages.length) {
                                props.closeFn();
                                window.localStorage.setItem("intro", "true");
                            }
                        }}
                        style={{ flex: 1 }}
                        className="btn-inverse"
                    >
                        <Icon type="arrow-right" /> {page === pages.length - 1 ? "Rozpocznij korzystanie" : "Dalej"}
                    </button>
                )}
            </Box>
        </div>
    );
};
