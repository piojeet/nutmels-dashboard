import React from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

export function Panel({ title, description, action, children, className = "" }) {
  return (
    <div
      className={` ${className}`}
    >
      {(title || description || action) && (
        <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            {title ? <h2 className="text-xl font-inter-s text-white-color">{title}</h2> : null}
            {description ? (
              <p className="max-w-2xl text-xs leading-6 text-white-color/55">{description}</p>
            ) : null}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function FieldShell({ label, hint, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm font-inter-m text-white-color/65">{label}</span>
      {hint ? <span className="-mt-1 text-xs text-white-color/35">{hint}</span> : null}
      {children}
    </label>
  );
}

export function TextInput({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon ? (
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white-color/35" />
      ) : null}
      <input
        {...props}
        className={`h-9 w-full rounded-lg border border-white-color/14 bg-white-color/[3%] px-4 text-sm text-white-color outline-none transition placeholder:text-white-color/25 focus:border-yellow-color/40 focus:bg-white-color/[6%] ${
          Icon ? "pl-11" : ""
        } ${className}`}
      />
    </div>
  );
}

export function SelectInput({ options, className = "", ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`h-9 w-full appearance-none rounded-lg border border-white-color/14 bg-white-color/[3%] px-4 pr-11 text-sm text-white-color outline-none transition focus:border-yellow-color/40 focus:bg-white-color/[6%] ${className}`}
      >
        {options.map((option) => (
          <option
            key={typeof option === "string" ? option : option.value}
            value={typeof option === "string" ? option : option.value}
            className="bg-[#0d1927] text-white"
          >
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white-color/45" />
    </div>
  );
}

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex py-2 items-center justify-center gap-2 rounded-lg bg-yellow-color px-5 text-sm font-inter-s text-black-color shadow-side-bar transition hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex h-[35px] items-center justify-center gap-2 rounded-lg! border border-white-color/14 bg-white-color/[3%] px-5 text-sm font-inter-s text-white-color shadow-side-bar transition hover:border-white-color/25 hover:bg-white-color/[4%] ${className}`}
    >
      {children}
    </button>
  );
}

export function ToggleSwitch({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white-color/12 bg-white-color/[3%] p-4">
      <div className="min-w-0">
        <div className="font-inter-s text-white-color">{label}</div>
        {description ? <div className="mt-1 text-sm text-white-color/45">{description}</div> : null}
      </div>
      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-yellow-color" : "bg-white-color/12"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-black-color transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export function CheckRow({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-start gap-3 rounded-2xl border border-white-color/10 bg-white-color/[3%] p-4 text-left transition hover:border-white-color/20 hover:bg-white-color/[5%]"
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-sm transition ${
          checked
            ? "border-yellow-color bg-yellow-color text-black-color"
            : "border-white-color/20 bg-white-color/[4%] text-transparent"
        }`}
      >
        <FiCheck />
      </span>
      <span className="min-w-0">
        <span className="block font-inter-s text-white-color">{label}</span>
        {description ? <span className="mt-1 block text-sm text-white-color/45">{description}</span> : null}
      </span>
    </button>
  );
}

export function StatusPill({ tone = "default", children }) {
  const tones = {
    success: "border-emerald-300/20 bg-emerald-400/15 text-emerald-200",
    danger: "border-rose-300/20 bg-rose-400/15 text-rose-200",
    warning: "border-yellow-color/25 bg-yellow-color/15 text-yellow-color",
    info: "border-sky-300/20 bg-sky-400/15 text-sky-200",
    default: "border-white-color/15 bg-white-color/[6%] text-white-color/70",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-inter-s uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
