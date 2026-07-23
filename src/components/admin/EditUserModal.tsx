import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import { updateUser } from "../../services/api";
import { User } from "../../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export default function EditUserModal({
  open,
  onClose,
  onSuccess,
  user,
}: Props) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EMPLOYEE">("EMPLOYEE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setDepartment(user.department);
      setRole(user.role);
    }
  }, [user]);

  if (!open || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser(user.id, {
        name,
        department,
        role,
      });

      toast.success("User updated successfully.");

      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Unable to update user."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-xl font-black">
            Edit Employee
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          <div>
            <label className="text-sm font-semibold">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              Department
            </label>

            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-2 w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value as
                    "ADMIN" | "EMPLOYEE"
                )
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option value="EMPLOYEE">
                Employee
              </option>

              <option value="ADMIN">
                Admin
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-emerald-500 text-white"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}