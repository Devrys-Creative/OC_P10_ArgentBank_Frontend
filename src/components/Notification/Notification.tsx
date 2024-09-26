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