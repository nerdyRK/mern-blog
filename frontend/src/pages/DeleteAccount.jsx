import React from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../store/authReducer";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteAccount());
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
      <button
        onClick={handleDelete}
        className="w-full p-2 bg-red-500 text-white rounded"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
