import { useEffect } from "react";
import { AppBar } from "../../components/appBar/AppBar";
import { FeaturesList } from "../../components/featuresList/FeaturesList";
import { Footer } from "../../components/footer/Footer";
import { HeroHeader } from "../../components/heroHeader/HeroHeader";

interface homeInterface {
    pTitle:React.Dispatch<React.SetStateAction<string>>
}
export const Home:React.FC<homeInterface> = ({pTitle}) => {

    useEffect(() => {
        pTitle("Home Page");
    },[]);

    return (
        <>
        <AppBar />
        <main>
            <HeroHeader />
            <FeaturesList />
        </main>
        <Footer />
        </>
    );
};