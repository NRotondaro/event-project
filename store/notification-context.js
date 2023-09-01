import { createContext, useState } from 'react';

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotificitation, setActiveNotificitation] = useState();

  function showNotificationHandler(notificationData) {
    setActiveNotificitation(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotificitation(null);
  }

  const context = {
    notification: activeNotificitation,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
