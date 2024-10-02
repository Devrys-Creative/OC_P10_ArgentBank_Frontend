import { useEffect } from "react";

import "./error404.scss";
import { Link } from "react-router-dom";

// 
interface error404Interface {
    pTitle: React.Dispatch<React.SetStateAction<string>>,
};

export const Error404:React.FC<error404Interface> = ({pTitle}) => {

    // set up prop allowing app component to manage the page title
    useEffect(() => {
        pTitle("Not Found");
    });

    return (
        <main className="main bg-dark error404">
            <h2 className="error404__title">404 - undefined path</h2>
            <Link className="error404__link" to="/">Back to homepage</Link>
        </main>
    );
};