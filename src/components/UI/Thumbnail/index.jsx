export default function Thumbnail({
  src,
  alt,
  className,
  size = "small",
  objectFit = "contain",
  ...props
}) {
  let width = "100px";

  switch (size) {
    case "small":
      width = "50px";
      break;
    case "medium":
      width = "100px";
      break;
    case "large":
      width = "150px";
      break;
    default:
      width = "200px";
      break;
  }

  return (
    <div
      style={{ width, objectFit }}
      className={` border-[1px] border-gray overflow-hidden rounded-md aspect-square ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        {...props}
      />
    </div>
  );
}
