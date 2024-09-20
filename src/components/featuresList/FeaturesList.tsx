import { FeatureItem } from "../featureItem/FeatureItem";
import "./featuresList.scss";

export const FeaturesList = () => {

    return (
        <section className="features-list">
            <h2 className="sr-only">Features</h2>
            <FeatureItem
                title="You are our #1 priority"
                icon="icon-chat.png"
                iconAlt="Chat icon"
                content="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
            />
            <FeatureItem
                title="More savings means higher rates"
                icon="icon-money.png"
                iconAlt="Money icon"
                content="The more you save with us, the higher your interest rate will be!"
            />
            <FeatureItem
                title="Security you can trust"
                icon="icon-security.png"
                iconAlt="Security icon"
                content="We use top of the line encryption to make sure your data and money is always safe."
            />
        </section>
    );
};