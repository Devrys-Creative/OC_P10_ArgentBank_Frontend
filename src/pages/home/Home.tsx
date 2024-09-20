import { AppBar } from "../../components/appBar/AppBar";
import { FeaturesList } from "../../components/featuresList/FeaturesList";
import { Footer } from "../../components/footer/Footer";
import { HeroHeader } from "../../components/heroHeader/HeroHeader";


export const Home = () => {

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