import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

import { changePassword } from "../services/api";

export default function ChangePassword() {
  const navigate = useNavigate();

  const email =
    sessionStorage.getItem("changePasswordEmail") ?? "";

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "New password and Confirm password do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        email,
        currentPassword,
        newPassword,
        confirmPassword,
      });

      sessionStorage.removeItem(
        "changePasswordEmail"
      );

      toast.success(
        "Password changed successfully. Please login again."
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            Change Password
          </h1>

          <p className="text-slate-500 mt-2">
            Please change your temporary password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-100"
            />
          </div>

          <PasswordField
            label="Current Password"
            value={currentPassword}
            setValue={setCurrentPassword}
            show={showCurrentPassword}
            setShow={setShowCurrentPassword}
          />

          <PasswordField
            label="New Password"
            value={newPassword}
            setValue={setNewPassword}
            show={showNewPassword}
            setShow={setShowNewPassword}
          />

          <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            show={showConfirmPassword}
            setShow={setShowConfirmPassword}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-semibold"
          >
            <Lock size={18} />

            {loading
              ? "Updating..."
              : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  value: string;
  setValue: React.Dispatch<
    React.SetStateAction<string>
  >;
  show: boolean;
  setShow: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function PasswordField({
  label,
  value,
  setValue,
  show,
  setShow,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="w-full border border-slate-300 rounded-xl px-4 py-3 pr-12 focus:border-indigo-600"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500"
        >
          {show ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    </div>
  );
}