import { useState } from "react";
import toast from "react-hot-toast";
import { X, UserPlus } from "lucide-react";

import { inviteUser } from "../../services/api";
import { InviteUserRequest } from "../../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InviteUserModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);



  const [form, setForm] = useState<InviteUserRequest>({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    role: "EMPLOYEE",
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      employeeId: "",
      department: "",
      role: "EMPLOYEE",
    });
  };

  const handleInvite = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.employeeId ||
      !form.department
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
  setLoading(true);

  await inviteUser(form);

  toast.success("Employee invited successfully.");

  resetForm();

  onSuccess();

  onClose();

} catch (err: any) {
  toast.error(
    err?.response?.data?.message ??
      "Unable to invite employee."
  );
} finally {
  setLoading(false);
}
  };

  

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-7 border-b">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-500">
                Administration
              </p>

              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Invite Employee
              </h2>
            </div>

            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="p-2 rounded-xl hover:bg-slate-100"
            >
              <X />
            </button>
          </div>

          {/* Form */}
          <div className="p-7 space-y-5">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label="Employee ID"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
            />

            <Input
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-emerald-500 outline-none"
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-7 border-t bg-slate-50">
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-6 py-3 rounded-xl border border-slate-300 font-semibold"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleInvite}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-bold"
            >
              <UserPlus size={18} />

              {loading ? "Sending..." : "Invite Employee"}
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

interface InputProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function Input({
  label,
  name,
  value,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-emerald-500 outline-none"
      />
    </div>
  );
}