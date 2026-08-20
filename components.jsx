/* global React */
/* ============================================================
   Primitives — Button, Tag, Input, Avatar, Icon
   Export to window so other Babel scripts can use them.
   ============================================================ */

const { useEffect, useRef, useState } = React;

/* ---------- Icon: thin wrapper around Feather Icons CDN ----- */
function Icon({ name, size = 20, strokeWidth = 2, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.feather && ref.current) window.feather.replace({ "stroke-width": strokeWidth });
  }, [name, strokeWidth]);
  return (
    <i
      ref={ref}
      data-feather={name}
      style={{ width: size, height: size, display: "inline-flex", color: "currentColor", ...style }}
    />
  );
}

/* ---------- Button ----------------------------------------- */
function Button({
  children, variant = "primary", size = "md", iconLeft, iconRight,
  disabled, onClick, type = "button", as: As = "button", href, ...rest
}) {
  const styles = {
    base: {
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: "var(--space-200)", borderRadius: "var(--radius-button)",
      font: "var(--type-button)", cursor: disabled ? "not-allowed" : "pointer",
      border: "1px solid transparent", transition: "background var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
      whiteSpace: "nowrap", textDecoration: "none",
    },
    sizes: {
      sm: { padding: "8px 12px",  fontSize: 14, height: 32 },
      md: { padding: "12px 16px", fontSize: 16, height: 40 },
      lg: { padding: "14px 20px", fontSize: 16, height: 48 },
    },
    variants: {
      primary: { background: "var(--bg-brand)", color: "var(--text-on)", borderColor: "var(--bg-brand)" },
      neutral: { background: "var(--primitive-neutral-300)", color: "var(--text-default)", borderColor: "var(--primitive-neutral-800)" },
      subtle:  { background: "transparent", color: "var(--text-default)" },
      danger:  { background: "var(--bg-danger)", color: "var(--text-on)", borderColor: "var(--bg-danger)" },
    },
    disabled: { background: "var(--bg-disabled)", color: "var(--text-disabled)", borderColor: "var(--border-disabled)" },
  };
  const style = {
    ...styles.base,
    ...styles.sizes[size],
    ...(disabled ? styles.disabled : styles.variants[variant]),
  };
  const props = {
    style, onClick: disabled ? undefined : onClick,
    onMouseEnter: e => { if (!disabled && variant === "primary") e.currentTarget.style.background = "var(--bg-brand-hover)"; },
    onMouseLeave: e => { if (!disabled && variant === "primary") e.currentTarget.style.background = "var(--bg-brand)"; },
    ...rest,
  };
  if (As === "a") return <a href={href} {...props}>{iconLeft && <Icon name={iconLeft} size={16}/>} {children} {iconRight && <Icon name={iconRight} size={16}/>}</a>;
  return <button type={type} disabled={disabled} {...props}>{iconLeft && <Icon name={iconLeft} size={16}/>}{children}{iconRight && <Icon name={iconRight} size={16}/>}</button>;
}

/* ---------- Tag / Badge ------------------------------------ */
function Tag({ children, variant = "default", dot = false }) {
  const variants = {
    default: { bg: "var(--bg-default)",          fg: "var(--text-default)",   bd: "var(--border-default)"  },
    brand:   { bg: "var(--bg-brand)",            fg: "var(--text-on)",        bd: "var(--bg-brand)"        },
    neutral: { bg: "var(--bg-tertiary)",         fg: "var(--text-default)",   bd: "var(--bg-tertiary)"     },
    success: { bg: "var(--bg-success-tertiary)", fg: "var(--text-success)",   bd: "var(--primitive-success-200)" },
    warning: { bg: "var(--bg-warning-tertiary)", fg: "var(--text-warning)",   bd: "var(--primitive-warning-200)" },
    danger:  { bg: "var(--bg-danger-tertiary)",  fg: "var(--text-danger)",    bd: "var(--primitive-danger-200)" },
  };
  const v = variants[variant] || variants.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: "var(--radius-full)",
      background: v.bg, color: v.fg, border: `1px solid ${v.bd}`,
      font: "500 14px/1 var(--font-sans)",
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 9999, background: "currentColor" }}/>}
      {children}
    </span>
  );
}

/* ---------- Input ------------------------------------------ */
function Input({ label, hint, error, type = "text", id, iconRight, ...rest }) {
  const inputId = id || `in-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-200)" }}>
      {label && <label htmlFor={inputId} style={{ font: "var(--type-label)" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <input
          id={inputId} type={type}
          style={{
            height: 40, width: "100%", padding: "12px 16px",
            paddingRight: iconRight ? 44 : 16,
            borderRadius: "var(--radius-base)",
            border: `1px solid ${error ? "var(--border-danger)" : "var(--border-default)"}`,
            font: "var(--type-input)", color: "var(--text-default)",
            background: "var(--bg-default)", outline: "none",
            boxSizing: "border-box",
          }}
          {...rest}
        />
        {iconRight && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--icon-tertiary)" }}>
            <Icon name={iconRight} size={16}/>
          </span>
        )}
      </div>
      {error ? (
        <span style={{ font: "var(--type-caption)", color: "var(--text-danger)" }}>{error}</span>
      ) : hint ? (
        <span style={{ font: "var(--type-caption)", color: "var(--text-tertiary)" }}>{hint}</span>
      ) : null}
    </div>
  );
}

/* ---------- Avatar ----------------------------------------- */
function Avatar({ name, size = 40 }) {
  const initials = (name || "?").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "var(--radius-full)",
      background: "var(--bg-tertiary)", color: "var(--text-secondary)",
      display: "grid", placeItems: "center",
      font: `600 ${Math.round(size*0.38)}px/1 var(--font-sans)`,
    }}>{initials}</div>
  );
}

Object.assign(window, { Icon, Button, Tag, Input, Avatar });
