import React, { useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import RolePermissionModal from "./RolePermissionModal";
import { PrimaryButton, TextInput } from "./SettingUI";
import { showAppToast } from "../../utils/appToast";

const ROLE_OPTIONS = [
  "Social Media Manager",
  "Product Manager",
  "Operations Lead",
  "Finance Admin",
  "Super Admin",
];

const INITIAL_USERS = [
  {
    id: "user-1",
    name: "John Bushmill",
    role: "Social Media Manager",
    email: "johnbushmill45@nutmeals.com",
    grantedDate: "09 Jun, 2025 09:33 PM",
  },
  {
    id: "user-2",
    name: "Linda Blair",
    role: "Product Manager",
    email: "lindablair12@gmail.com",
    grantedDate: "09 Jun, 2025 09:33 PM",
  },
];

function formatGrantedDate() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .replace(",", "");
}

function UsersSection() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return users;
    }

    return users.filter((user) =>
      [user.name, user.role, user.email].some((value) =>
        value.toLowerCase().includes(normalized)
      )
    );
  }, [search, users]);

  const handleSaveUser = (payload) => {
    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...payload,
              }
            : user
        )
      );

      showAppToast({
        severity: "success",
        summary: "Users",
        detail: `${payload.name} role permissions updated.`,
      });
    } else {
      setUsers((previous) => [
        {
          ...payload,
          id: `user-${Date.now()}`,
          grantedDate: formatGrantedDate(),
        },
        ...previous,
      ]);

      showAppToast({
        severity: "success",
        summary: "Users",
        detail: `${payload.name} added successfully.`,
      });
    }

    setEditingUser(null);
    setModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    setUsers((previous) => previous.filter((user) => user.id !== userId));

    if (selectedUser) {
      showAppToast({
        severity: "warn",
        summary: "Users",
        detail: `${selectedUser.name} removed from role permissions.`,
      });
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
          <div className="w-full max-w-[360px]">
            <TextInput
              icon={FiSearch}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search roles or email"
              className="h-[52px] rounded-[16px] bg-white-color/[6%]"
            />
          </div>

          <PrimaryButton onClick={openCreateModal} className="h-[52px] rounded-[16px] px-5">
            <FiPlus />
            Add Role Permission
          </PrimaryButton>
        </div>

        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-white-color/[7%] text-sm font-inter-s text-white-color/70">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Granted Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-white-color/10 text-white-color/78">
                      <td className="px-6 py-5 font-inter-m">{user.name}</td>
                      <td className="px-6 py-5">{user.role}</td>
                      <td className="px-6 py-5">{user.email}</td>
                      <td className="px-6 py-5 whitespace-nowrap">{user.grantedDate}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-4 text-lg text-white-color/60">
                          <button
                            type="button"
                            onClick={() => openEditModal(user)}
                            className="transition hover:text-yellow-color"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            className="transition hover:text-[#ff8b8b]"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-white-color/10">
                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-white-color/45">
                      No matching users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RolePermissionModal
        open={modalOpen}
        editingUser={editingUser}
        roleOptions={ROLE_OPTIONS}
        onClose={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
      />
    </>
  );
}

export default UsersSection;
