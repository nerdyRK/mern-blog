import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToastSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const showToastError = (message) => {
  toast.error(message, toastOptions);
};
