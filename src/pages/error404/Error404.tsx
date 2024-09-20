import { useEffect } from "react";
import { AppBar } from "../../components/appBar/AppBar";
import { Footer } from "../../components/footer/Footer";

import "./error404.scss";

interface error404Interface {
    pTitle: React.Dispatch<React.SetStateAction<string>>,
};

export const Error404:React.FC<error404Interface> = ({pTitle}) => {

    useEffect(() => {
        pTitle("Not Found");
    });

    return (
        <>
        <AppBar />
        <main className="main bg-dark error404">
            <h2 className="error404__title">404 - undefined path</h2>
            <a className="error404__link" href="/">Back to homepage</a>
        </main>
        <Footer />
        </>
    );
};