import { toast } from "react-toastify";

function toastMessage(type, message) {
  if (type === "error") {
    return toast.error(message, { className: "toast-error" });
  } else if (type === "success") {
    return toast.success(message, { className: "toast-success" });
  }
}

export { toastMessage };
