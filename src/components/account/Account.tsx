
// Component used to display account data

import "./account.scss";

interface accountInterface {
    title:string,
    amount:string,
    amountDescription:string,
}

export const Account:React.FC<accountInterface> = ({title,amount,amountDescription}) => {

    return (
        <section className="account">
            <div className="account__content-wrapper">
                <h3 className="account__title">{title}</h3>
                <p className="account__amount">{amount}</p>
                <p className="account__amount-description">{amountDescription}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="button account__transaction-button">View transactions</button>
            </div>
        </section>
    );
};