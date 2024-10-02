import { useEffect } from "react";
import { FeaturesList } from "../../components/featuresList/FeaturesList";
import { HeroHeader } from "../../components/heroHeader/HeroHeader";

interface homeInterface {
    pTitle:React.Dispatch<React.SetStateAction<string>>
}
export const Home:React.FC<homeInterface> = ({pTitle}) => {

    // set up prop allowing app component to manage the page title
    useEffect(() => {
        pTitle("Home Page");
    },[]);

    return (
        <main className="main">
            <HeroHeader />
            <FeaturesList />
        </main>
    );
};