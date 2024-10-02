// This component helps avoid code duplication in the home page

import "./featureItem.scss";


interface FeatureItemProps {
    title: string;
    icon: string;
    iconAlt: string;
    content: string;
  }

export const FeatureItem:React.FC<FeatureItemProps> = ({icon,iconAlt,title,content}) => {
    return (
        <div className="feature-item">
            <img src={`/icons/${icon}`} alt={iconAlt} className="feature-item__icon" />
            <h3 className="feature-item__title">{title}</h3>
            <p>{content}</p>
        </div>
    )
};