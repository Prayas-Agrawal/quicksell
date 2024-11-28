import "./style.css";
import { Icon } from "../icon/icon";
import { ICONS } from "../../consts/icons";

interface SubDropdownProps {
  title: string;
  items: string[];
  onSelect: (value: string) => void;
  toggle: () => void;
  isOpen: boolean;
  formatter: (v: string) => string;
}

export function SubDropdown({
  title,
  items,
  formatter,
  onSelect,
  toggle,
  isOpen,
}: SubDropdownProps) {
  return (
    <div className="subdropdown-container">
      <button className="subdropdown-toggle" onClick={toggle}>
        {title}
        <Icon url={ICONS.down} />
      </button>
      {isOpen && (
        <div className="subdropdown-menu">
          {items.map((option, index) => (
            <div
              key={index}
              className="subdropdown-item"
              onClick={() => onSelect(option)}
            >
              {formatter(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
