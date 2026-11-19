"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Champs du formulaire, accessibles : chaque champ a son <label>, l'erreur est reliée
 * par aria-describedby, et les groupes de choix sont des <fieldset> avec <legend>.
 */

export const fieldId = (path: string) => `f-${path.replace(/\./g, "-")}`;

function Help({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return <p id={id} className="mt-1.5 text-sm text-ink-muted">{children}</p>;
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return <p id={id} className="mt-1.5 text-sm font-medium text-orange">{children}</p>;
}

const describedBy = (id: string, help?: unknown, error?: unknown) =>
  [help ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

type Option = { value: string; label: string };

type ChoiceProps = {
  path: string;
  legend: string;
  help?: string;
  options: readonly Option[];
  error?: string;
  columns?: 1 | 2 | 3 | 4;
} & (
  | { multiple: true; value: string[]; onChange: (v: string[]) => void }
  | { multiple?: false; value: string; onChange: (v: string) => void }
);

/** Groupe de cases à cocher ou de boutons radio présentés en tuiles, utilisables au doigt. */
export function ChoiceGroup(props: ChoiceProps) {
  const { path, legend, help, options, error, columns = 2 } = props;
  const id = fieldId(path);
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <fieldset id={id} tabIndex={-1} aria-describedby={describedBy(id, help, error)} className="outline-none">
      <legend className="text-base font-semibold text-ink">{legend}</legend>
      <Help id={`${id}-help`}>{help}</Help>
      <div className={cn("mt-3 grid gap-2", cols)}>
        {options.map((o) => {
          const checked = props.multiple ? props.value.includes(o.value) : props.value === o.value;
          const toggle = () => {
            if (props.multiple) props.onChange(checked ? props.value.filter((v) => v !== o.value) : [...props.value, o.value]);
            else props.onChange(o.value);
          };
          return (
            <label
              key={o.value}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-electric",
                checked ? "border-electric bg-electric/12 text-ink" : "border-line bg-surface-2 text-ink-muted hover:border-electric/50",
                error && !checked && "border-orange/50",
              )}
            >
              <input
                type={props.multiple ? "checkbox" : "radio"}
                name={path}
                value={o.value}
                checked={checked}
                onChange={toggle}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-5 shrink-0 place-items-center border transition-colors",
                  props.multiple ? "rounded-md" : "rounded-full",
                  checked ? "border-electric bg-electric text-base" : "border-ink-muted/60",
                )}
              >
                {checked && <Check size={14} strokeWidth={3} />}
              </span>
              {o.label}
            </label>
          );
        })}
      </div>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </fieldset>
  );
}

type TextProps = {
  path: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  help?: string;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
  autoComplete?: string;
  maxLength?: number;
  multiline?: boolean;
  required?: boolean;
};

export function TextField({ path, label, value, onChange, error, help, type = "text", inputMode, autoComplete, maxLength, multiline, required }: TextProps) {
  const id = fieldId(path);
  const common = {
    id,
    name: path,
    value,
    maxLength,
    required,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, help, error),
    className: cn(
      "mt-2 w-full rounded-xl border bg-surface-2 px-4 py-3 text-base text-ink placeholder:text-ink-muted/60",
      "focus:border-electric focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric",
      error ? "border-orange/70" : "border-line",
    ),
  };
  return (
    <div>
      <label htmlFor={id} className="text-base font-semibold text-ink">
        {label}
      </label>
      <Help id={`${id}-help`}>{help}</Help>
      {multiline ? (
        <textarea {...common} rows={6} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...common} type={type} inputMode={inputMode} onChange={(e) => onChange(e.target.value)} />
      )}
      {multiline && maxLength && (
        <p className="mt-1 text-right text-xs text-ink-muted" aria-hidden="true">
          {value.length} / {maxLength}
        </p>
      )}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

export function Checkbox({ path, label, checked, onChange, error, children }: { path: string; label: ReactNode; checked: boolean; onChange: (v: boolean) => void; error?: string; children?: ReactNode }) {
  const id = fieldId(path);
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-[var(--color-electric)]"
        />
        <span>{label}</span>
      </label>
      {children}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}
