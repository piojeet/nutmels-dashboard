import React, { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { PrimaryButton, SelectInput, TextInput } from "./SettingUI";
import { showAppToast } from "../../utils/appToast";

const PERMISSION_ROWS = [
  { key: "dashboard", label: "Dashboard", actions: ["view"] },
  { key: "category", label: "Category", actions: ["view", "create", "edit", "delete"] },
  { key: "brand", label: "Brand", actions: ["view", "create", "edit", "delete"] },
  { key: "product", label: "Product", actions: ["view", "create", "edit", "delete"] },
  { key: "user", label: "User", actions: ["view", "create", "edit", "delete"] },
];

function createPermissionState(fill = false) {
  return {
    all: fill,
    dashboard: { view: fill },
    category: { view: fill, create: fill, edit: fill, delete: fill },
    brand: { view: fill, create: fill, edit: fill, delete: fill },
    product: { view: fill, create: fill, edit: fill, delete: fill },
    user: { view: fill, create: fill, edit: fill, delete: fill },
  };
}

function areAllPermissionsEnabled(permissions) {
  return PERMISSION_ROWS.every((row) =>
    row.actions.every((action) => permissions[row.key]?.[action])
  );
}

function normalizePermissions(permissions) {
  return {
    ...permissions,
    all: areAllPermissionsEnabled(permissions),
  };
}

function PermissionToggle({ checked, onClick, label, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl text-left text-sm transition cursor-pointer ${className}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs transition ${
          checked
            ? "border-yellow-color bg-yellow-color text-black-color"
            : "border-white-color/14 bg-white-color/[4%] text-transparent"
        }`}
      >
        <FiCheck />
      </span>
      <span className="text-white-color/78">{label}</span>
    </button>
  );
}

function RolePermissionModal({ open, editingUser, roleOptions, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: roleOptions[0] || "",
    permissions: createPermissionState(),
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm({
      name: editingUser?.name || "",
      email: editingUser?.email || "",
      role: editingUser?.role || roleOptions[0] || "",
      permissions: normalizePermissions(editingUser?.permissions || createPermissionState()),
    });
  }, [editingUser, open, roleOptions]);

  if (!open) {
    return null;
  }

  const updatePermission = (rowKey, action) => {
    setForm((previous) => {
      const next = {
        ...previous.permissions,
        [rowKey]: {
          ...previous.permissions[rowKey],
          [action]: !previous.permissions[rowKey][action],
        },
      };

      return {
        ...previous,
        permissions: normalizePermissions(next),
      };
    });
  };

  const toggleRowPermissions = (rowKey) => {
    setForm((previous) => {
      const rowActions = PERMISSION_ROWS.find((row) => row.key === rowKey)?.actions || [];
      const shouldEnable = rowActions.some((action) => !previous.permissions[rowKey][action]);
      const nextRow = rowActions.reduce((accumulator, action) => {
        accumulator[action] = shouldEnable;
        return accumulator;
      }, {});

      return {
        ...previous,
        permissions: normalizePermissions({
          ...previous.permissions,
          [rowKey]: nextRow,
        }),
      };
    });
  };

  const toggleAllPermissions = () => {
    const shouldEnable = !form.permissions.all;
    setForm((previous) => ({
      ...previous,
      permissions: createPermissionState(shouldEnable),
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      showAppToast({
        severity: "warn",
        summary: "Users",
        detail: "Please enter a role name before saving.",
      });
      return;
    }

    if (!form.email.trim() || !form.email.includes("@")) {
      showAppToast({
        severity: "warn",
        summary: "Users",
        detail: "Please enter a valid email address.",
      });
      return;
    }

    onSave({
      ...editingUser,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      permissions: normalizePermissions(form.permissions),
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#140d28]/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[920px] rounded-[10px] border border-white-color/12 bg-[#44366d]/95 px-5 py-6 shadow-[0_40px_120px_rgba(6,4,18,0.55)] backdrop-blur-xl sm:px-8 sm:py-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white-color text-xl text-[#3f2d66] transition hover:scale-105 cursor-pointer"
        >
          <FiX />
        </button>

        <div className="text-[40px] font-inter-b text-white-color">
          {editingUser ? "Edit Role" : "Add Role"}
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid gap-5 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
            <div className="font-inter-m text-white-color/68">Name</div>
            <TextInput
              value={form.name}
              onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
              className="h-[48px] rounded-xl bg-white-color/[10%] focus:bg-white-color/[12%]"
              placeholder="Enter name"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
            <div className="font-inter-m text-white-color/68">Email Address</div>
            <TextInput
              value={form.email}
              onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
              className="h-[48px] rounded-xl bg-white-color/[10%] focus:bg-white-color/[12%]"
              placeholder="Enter email address"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
            <div className="font-inter-m text-white-color/68">Roles</div>
            <SelectInput
              value={form.role}
              onChange={(event) => setForm((previous) => ({ ...previous, role: event.target.value }))}
              options={roleOptions}
              className="h-[48px] rounded-xl bg-white-color/[10%] focus:bg-white-color/[12%]"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="pt-2 font-inter-m text-white-color/68">Permissions</div>

            <div className="space-y-4">
              <PermissionToggle checked={form.permissions.all} onClick={toggleAllPermissions} label="All" />

              {PERMISSION_ROWS.map((row) => {
                const rowChecked = row.actions.every((action) => form.permissions[row.key]?.[action]);

                return (
                  <div key={row.key} className="border-b border-white-color/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="grid gap-3 md:grid-cols-[130px_repeat(4,minmax(0,1fr))] md:items-center">
                      <PermissionToggle
                        checked={rowChecked}
                        onClick={() => toggleRowPermissions(row.key)}
                        label={row.label}
                      />

                      {["view", "create", "edit", "delete"].map((action) =>
                        row.actions.includes(action) ? (
                          <PermissionToggle
                            key={`${row.key}-${action}`}
                            checked={form.permissions[row.key]?.[action]}
                            onClick={() => updatePermission(row.key, action)}
                            label={action[0].toUpperCase() + action.slice(1)}
                            className="md:justify-start"
                          />
                        ) : (
                          <span key={`${row.key}-${action}`} className="hidden md:block" />
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <PrimaryButton
            onClick={handleSubmit}
            className="h-[46px] rounded-xl bg-green-color px-10 text-white-color cursor-pointer"
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default RolePermissionModal;
