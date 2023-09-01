import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotificitation, setActiveNotificitation] = useState();

  useEffect(() => {
    if (
      activeNotificitation &&
      (activeNotificitation.status === 'success' ||
        activeNotificitation.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotificitation(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotificitation]);

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
