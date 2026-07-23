import { useState } from "react";
import toast from "react-hot-toast";
import {
  MoreVertical,
  UserCheck,
  UserX,
  Pencil,
} from "lucide-react";

import {
  disableUser,
  enableUser,
} from "../../services/api";

interface Props {
  id: number;
  status: "ACTIVE" | "INVITED" | "DISABLED";
  refresh: () => void;
  onEdit: () => void;
}

export default function UserActionMenu({
  id,
  status,
  refresh,
  onEdit,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleDisable = async () => {
    try {
      await disableUser(id);
      toast.success("User disabled.");
      refresh();
    } catch {
      toast.error("Unable to disable user.");
    }
  };

  const handleEnable = async () => {
    try {
      await enableUser(id);
      toast.success("User enabled.");
      refresh();
    } catch {
      toast.error("Unable to enable user.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-slate-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit User
          </button>

          {status === "DISABLED" ? (
            <button
              onClick={handleEnable}
              className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50"
            >
              <UserCheck size={16} />
              Enable User
            </button>
          ) : (
            <button
              onClick={handleDisable}
              className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50"
            >
              <UserX size={16} />
              Disable User
            </button>
          )}
        </div>
      )}
    </div>
  );
}