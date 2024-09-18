import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import mountIconSprite from "/public/image/mount_icon_sprites.png";
import searchIconSprite from "/public/image/search_icon_sprites.png";
import "../../data/mountIconPos.css";
import "../../data/searchIconPos.css";
import { AcquireIcon, MountItemProps } from "../../data/mountData";

const item_style = css`
  margin: 0px 15px;
  display: grid;
  width: fill-available;
  width: -webkit-fill-content;
  grid-template-columns: 1fr 2fr 1fr 4fr;
  align-items: center;
  border-bottom: 1px solid #d2d2d2;
  padding: 10px 0px;
  cursor: pointer;
  :hover {
    background-color: #dee2e9;
  }
`;
const icon_style = css`
  width: 40px;
  height: 40px;
  padding: 0 !important;
  background-image: url(${mountIconSprite});
  background-repeat: no-repeat;
`;
const item_text = css`
  padding: 5px;
`;
const acquire_wrap = css`
  display: flex;
  align-items: center;
`;
const acquire_icon = css`
  width: 32px;
  height: 32px;
  background-image: url(${searchIconSprite});
  background-repeat: no-repeat;
  flex-shrink: 0;
`;
const acquire_text = css`
  padding: 10px;
`;

//아이콘 종류별 매핑
const iconMap = {
  [AcquireIcon.QUEST]: "icon-001",
  [AcquireIcon.DUNGEON]: "icon-006",
  [AcquireIcon.TBRAID]: "icon-007",
  [AcquireIcon.RAID]: "icon-005",
  [AcquireIcon.HARDRAID]: "icon-014",
  [AcquireIcon.PVP]: "icon-009",
  [AcquireIcon.MGP]: "icon-020",
  [AcquireIcon.EMERGENCY]: "icon-012",
  [AcquireIcon.MAP]: "icon-025",
  [AcquireIcon.MONSTER]: "icon-015",
  [AcquireIcon.DEEPDUNGEON]: "icon-010",
  [AcquireIcon.SPDUNGEON]: "icon-030",
  [AcquireIcon.SPFEILD]: "icon-032",
  [AcquireIcon.CRAFT]: "icon-019",
  [AcquireIcon.FRIENDSHIP]: "icon-017",
  [AcquireIcon.ISLAND]: "icon-026",
  [AcquireIcon.KURONOTE]: "icon-016",
  [AcquireIcon.ACHIEVEMENT]: "icon-003",
  [AcquireIcon.GIL]: "icon-002",
  [AcquireIcon.CSHOP]: "icon-036",
  [AcquireIcon.EVENT]: "icon-035",
  [AcquireIcon.EXTRA]: "icon-027",
};

const MountItem = (props: { mountItem: MountItemProps }) => {
  const navigate = useNavigate();

  const toDetailPage = () => {
    navigate(`/mount/${props.mountItem.icon_id}`);
  };

  const mountIconClassName = `bg-${props.mountItem.icon_id
    .toString()
    .padStart(3, "0")}`;

  return (
    <div css={item_style} onClick={toDetailPage}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div css={icon_style} className={mountIconClassName}></div>
      </div>
      <div css={item_text}>{props.mountItem.name}</div>
      <div style={{ textAlign: "center" }}>{props.mountItem.pnum}</div>
      <div>
        {props.mountItem.acquire_root.map((item, index) => (
          <div key={index} css={acquire_wrap}>
            <div
              css={acquire_icon}
              className={iconMap[item.acquire_icon]}
            ></div>
            <div css={acquire_text}>{item.acquire}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MountItem;
