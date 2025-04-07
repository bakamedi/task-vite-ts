import { notification } from "ant-design-vue";
import type { NotificationArgsProps } from "ant-design-vue/lib/notification";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationOptions extends Omit<NotificationArgsProps, "type"> {
  type?: NotificationType;
}

export const useNotification = () => {
  const openNotification = (options: NotificationOptions | string) => {
    if (typeof options === "string") {
      notification.open({
        message: options,
      });
      return;
    }

    const { type = "info", ...rest } = options;

    notification[type]({
      ...rest,
    });
  };

  // Métodos directos para cada tipo
  const success = (options: Omit<NotificationOptions, "type"> | string) => {
    if (typeof options === "string") {
      openNotification({ message: options, type: "success" });
    } else {
      openNotification({ ...options, type: "success" });
    }
  };

  const error = (options: Omit<NotificationOptions, "type"> | string) => {
    if (typeof options === "string") {
      openNotification({ message: options, type: "error" });
    } else {
      openNotification({ ...options, type: "error" });
    }
  };

  const info = (options: Omit<NotificationOptions, "type"> | string) => {
    if (typeof options === "string") {
      openNotification({ message: options, type: "info" });
    } else {
      openNotification({ ...options, type: "info" });
    }
  };

  const warning = (options: Omit<NotificationOptions, "type"> | string) => {
    if (typeof options === "string") {
      openNotification({ message: options, type: "warning" });
    } else {
      openNotification({ ...options, type: "warning" });
    }
  };

  return {
    open: openNotification,
    success,
    error,
    info,
    warning,
  };
};

// Instancia global (opcional)
export const notificationService = useNotification();
