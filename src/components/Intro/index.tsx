import { FC, useState } from "react";
import { appName } from "../../constants";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { IntroPage } from "../IntroPage";
import { Link } from "../Link";
import style from "./index.module.scss";

const pages = [
    <div></div>,
    <IntroPage title={`Witaj w ${appName}`} content={<img alt="Ikona aplikacji Trash Assistant" src="logo192.png" style={{ height: "20vh", maxHeight: "192px" }} />} />,
    <IntroPage
        title="Jak to działa?"
        content={
            <p>
                Masz problem z zapamiętywaniem podstawowych zasad sortowania odpadów? Ta aplikacja jest dla Ciebie. Po prostu naceluj kamerą na obiekt, który zamierzasz wyrzucić i
                naciśnij przycisk z ikoną <Icon type="camera" size={20} /> znajdujący się u dołu ekranu.
            </p>
        }
    />,
    <IntroPage
        title="Technologia"
        content={
            <p>
                Aplikacja korzysta z nowoczesnej technologi opartej na sztucznej inteligencji. Używa ona mocy obliczeniowej urządzenia w celu rozpoznawania i klasyfikowania różnych
                typów odpadów.
            </p>
        }
    />,
    <IntroPage
        title="Informacje"
        content={
            <p>
                Aby uzyskać informacje o autorach projektu skorzystaj z przycisku <Icon type="info-circle" size={20} /> w prawym górnym rogu ekranu. Zachęcamy również do zapoznania
                się z dokumentem <Link to="https://github.com/makoteq/AI_trash#readme">README</Link> w celu uzyskania bardziej szczegółowych informacji na temat projektu. Pamiętaj,
                że aplikacja jest aktualnie w fazie prototypowej i moduł rozpoznawania obiektów może działać wolno i nieprzewidywalnie.
            </p>
        }
    />,
    <IntroPage
        title="Zaczynamy"
        content={<p>Na początek znajdź dowolony przedmiot, który nadaje się do wyrzucenia (np. plastikową butelkę po napoju) i spróbuj go zeskanować.</p>}
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
                {page !== 0 && (
                    <button
                        aria-label="Wstecz"
                        style={{ flex: 1 }}
                        onClick={() => {
                            if (page === 1) {
                                props.closeFn();
                                window.localStorage.setItem("intro", "true");
                            } else if (page - 1 >= 1) changePage(page - 1);
                        }}
                    >
                        <Icon type="arrow-left" /> {page !== 1 ? "Wstecz" : "Pomiń"}
                    </button>
                )}
                {page !== 0 && (
                    <button
                        aria-label="Dalej"
                        autoFocus
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
