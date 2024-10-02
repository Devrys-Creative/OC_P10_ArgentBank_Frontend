// This component is used to :
// - show an error notification
// - show a warning notification
// - show a success notification


import "./notification.scss";

interface notificationInterface {
    message:string;
    type:"error"|"success"|"warning";
}

export const Notification:React.FC<notificationInterface> = ({message, type}) => {
    return (
        <div className={`notification notification--${type}`}>
            {message}
        </div>
    );
};