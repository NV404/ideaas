export default function Anchor({
  as: As = "a",
  children,
  className = "",
  styled = true,
  ...otherProps
}) {
  return (
    <As
      className={[
        styled ? "text-blue-500" : null,
        "hover:opacity-80",
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </As>
  );
}
