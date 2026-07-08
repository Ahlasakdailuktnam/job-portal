import api from "../axios";

export const getNotifications = (params) => api.get("/notifications", { params });

export const markNotificationAsRead = (id) => api.put(`/notifications/${id}/read`);

export const getUnreadNotificationCount = () => api.get("/notifications/unread-count");
