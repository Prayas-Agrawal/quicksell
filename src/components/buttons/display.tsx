import { ICONS } from "../../consts/icons";
import { Icon } from "../icon/icon";
import "./style.css";
interface DisplayProps {
  handler: () => void;
}
export function DisplayButton({ handler }: DisplayProps) {
  return (
    <div className="display-btn" onClick={handler}>
      <Icon url={ICONS.display} />
      Display
      <Icon url={ICONS.down} />
    </div>
  );
}
