export const unreadNotificationsFunc = (notifications) => {
  return notifications.filter((n) => n.isRead === false);
};
