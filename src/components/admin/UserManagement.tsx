import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  UserPlus,
  Users,
  UserCheck,
  UserX,
  Mail,
} from "lucide-react";

import InviteUserModal from "./InviteUserModal";
import EditUserModal from "./EditUserModal";
import { getUsers } from "../../services/api";
import { User } from "../../types";
import UserActionMenu from "./UserActionMenu";


export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      setUsers(response.data.data);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const value = search.toLowerCase();

      return (
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value) ||
        u.employeeId.toLowerCase().includes(value)
      );
    });
  }, [users, search]);

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "ACTIVE").length,
    invited: users.filter((u) => u.status === "INVITED").length,
    disabled: users.filter((u) => u.status === "DISABLED").length,
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-end">

        <div>

          <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">
            Administration
          </p>

          <h1 className="text-3xl font-black text-slate-900">
            Employee Management
          </h1>

          <p className="text-slate-500 mt-2">
            Invite and manage employees.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold"
        >
          <UserPlus size={18} />
          Invite Employee
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value={stats.total}
          icon={<Users size={18} />}
        />

        <StatCard
          title="Active"
          value={stats.active}
          icon={<UserCheck size={18} />}
        />

        <StatCard
          title="Invited"
          value={stats.invited}
          icon={<Mail size={18} />}
        />

        <StatCard
          title="Disabled"
          value={stats.disabled}
          icon={<UserX size={18} />}
        />

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-400"
        />

        <input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 pl-11 pr-4 py-3 focus:border-emerald-500 outline-none"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left">

              <th className="p-5">Employee</th>

              <th>Department</th>

              <th>Role</th>

              <th>Status</th>

              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={5}
                  className="p-10 text-center text-slate-400"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="p-10 text-center text-slate-400"
                >
                  No Employees Found
                </td>

              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <div className="h-11 w-11 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-700">

                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}

                      </div>

                      <div>

                        <h3 className="font-bold">
                          {user.name}
                        </h3>

                        <p className="text-xs text-slate-500">
                          {user.employeeId}
                        </p>

                        <p className="text-xs text-slate-500">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>{user.department}</td>

<td>{user.role}</td>

<td>
  <StatusBadge
    status={user.status}
  />
</td>

<td className="text-center">
  <UserActionMenu
    id={user.id}
    status={user.status}
    refresh={loadUsers}
    onEdit={() => {
        setSelectedUser(user);
        setEditOpen(true);
    }}
/>
</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <InviteUserModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadUsers}
      />
      <EditUserModal
    open={editOpen}
    onClose={() => setEditOpen(false)}
    onSuccess={loadUsers}
    user={selectedUser}
/>

    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: User["status"];
}) {
  const styles = {
    ACTIVE:
      "bg-emerald-100 text-emerald-700",

    INVITED:
      "bg-amber-100 text-amber-700",

    DISABLED:
      "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <div className="flex justify-between items-center">

        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {title}
        </p>

        {icon}

      </div>

      <h2 className="text-4xl font-black mt-4">
        {value}
      </h2>

    </div>
  );
}