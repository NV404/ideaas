export default function Field({
  as: As = "input",
  id,
  label = null,
  className = "",
  disabled = false,
  postfixText = null,
  widthFull = false,
  ...otherProps
}) {
  return (
    <fieldset
      className={[
        "flex flex-col items-stretch justify-start gap-1 disabled:opacity-60 disabled:cursor-not-allowed",
        widthFull ? "w-full" : "",
      ].join(" ")}
      disabled={disabled}
    >
      {label ? (
        <label htmlFor={id} className="font-medium text-sm">
          {label}
        </label>
      ) : null}
      <div className="flex items-center gap-3">
        <As
          id={id}
          className={[
            "bg-neutral-100 w-full font-medium px-4 py-2 rounded-lg text-black",
            className,
          ].join(" ")}
          {...otherProps}
        />
        {postfixText && <p className="font-medium text-lg">{postfixText}</p>}
      </div>
    </fieldset>
  );
}
