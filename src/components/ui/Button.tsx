import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-(--ease-out-soft) " +
  "min-h-11 select-none"; // cible tactile ≥ 44 px

const variants: Record<Variant, string> = {
  // Orange = action principale. Texte noir : le blanc sur orange tombe sous 3:1.
  primary:
    "bg-orange text-ink-on-orange hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-(--shadow-glow-orange) " +
    "focus-visible:shadow-(--shadow-glow-orange)",
  secondary:
    "border border-electric/60 text-ink hover:border-electric hover:bg-electric/10 hover:shadow-(--shadow-glow-electric)",
  ghost: "text-electric-soft hover:text-ink underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-sm",
  lg: "px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

/** Bouton du design system. Rend un <Link> si `href` est fourni, sinon un <button>. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", icon, iconPosition = "start", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon && iconPosition === "start" && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "end" && <span aria-hidden="true">{icon}</span>}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ComponentProps<"button">, "className" | "children">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
