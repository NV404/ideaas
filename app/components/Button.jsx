const PADDINGS = {
  small: "px-2 py-1",
  medium: "px-4 py-2",
};

const THEMES = {
  none: "",
  monochrome: "bg-black text-neutral-100",
  white: "bg-white",
  plain: "text-black underline hover:no-underline",
};

export default function Button({
  as: As = "button",
  children,
  theme = "monochrome",
  size = "medium",
  round = true,
  className = "",
  ...otherProps
}) {
  return (
    <As
      className={[
        PADDINGS[size],
        round ? "rounded-lg" : "",
        "flex flex-row items-center justify-center gap-2",
        "font-bold leading-none",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        THEMES[theme],
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </As>
  );
}
