export default function Button({
  children, variant = "primary", size = "md", iconLeft, iconRight,
  disabled, onClick, type = "button", as: As = "button", href, ...rest
}) {
  const styles = {
    base: {
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      gap: "var(--space-200)", borderRadius: "var(--radius-base)",
      font: "var(--type-button)", cursor: disabled ? "not-allowed" : "pointer",
      border: "1px solid transparent",
      transition: "background var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
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
