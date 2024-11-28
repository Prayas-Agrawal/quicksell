import "./style.css";

interface IconProps {
  url: string;
}
export function Icon({ url }: IconProps) {
  return (
    <div className="icon-container">
      <img src={url} className="icon" />
    </div>
  );
}

export function Avatar({ url }: IconProps) {
  return (
    <div className="icon-container">
      <img src={url} className="user-avatar" />
    </div>
  );
}
