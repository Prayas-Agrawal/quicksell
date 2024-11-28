import { useContext } from "react";
import { ICONS_PRIORITY, ICONS_STATUS } from "../../consts/icons";
import { CardModel } from "../../helpers/data";
import { Chip } from "../chips/feature";
import { Icon } from "../icon/icon";
import "./style.css";
import { KanbanContext } from "../../helpers/contexts";

export function Card({
  id,
  user,
  title,
  tags,
  status,
  userAvatarUrl,
  priority,
}: CardModel) {
  const { statusIcon, priorityIcon, avatar } = useContext(KanbanContext);
  console.log("Ava", avatar)
  return (
    <div className="card">
      <div className="header">
        <div className="id">{id}</div>
        {avatar && (
          <img src={userAvatarUrl} alt="User Avatar" className="user-avatar" />
        )}
      </div>
      <div className="title-container">
        {statusIcon && <Icon url={ICONS_STATUS[status]} />}
        <div className="title">{title}</div>
      </div>
      <div className="bottom">
        {priorityIcon && (
          <div className="status">
            <Icon url={ICONS_PRIORITY[priority]} />
          </div>
        )}
        <div className="tags">
          {tags.map((tag, index) => (
            <Chip key={index} tag={`⬤ ${tag}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
