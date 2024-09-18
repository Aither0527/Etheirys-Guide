import { css } from "@emotion/react";
import MountItem from "./MountItem";
import React, { useEffect, useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import iconSprite from "/public/image/search_icon_sprites.png";
import "../../data/searchIconPos.css";
import { collection, getDocs } from "firebase/firestore";
import { AcquireIcon, MountItemProps } from "../../data/mountData";
import { db } from "../../../firebaseConfig";
import { useRecoilState } from "recoil";
import { mountDataState } from "../../store/atoms";

const list_wrap = css`
  flex: 1;
`;
const list_search = css`
  display: flex;
  align-items: center;
  margin: 15px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;
const list_header = css`
  padding: 15px 0px;
  margin: 0px 15px;
  display: grid;
  width: fill-available;
  grid-template-columns: 1fr 2fr 1fr 4fr;
  background-color: #cdd4df;
  div {
    padding: 5px;
  }
`;
const list_select = css`
  width: 10%;
  min-width: 100px;
  margin-right: 10px;
  text-align: center;
`;
const list_input = css`
  width: 100%;
  padding: 19px;
  border: 1px solid #cdd4df;
  border-radius: 5px;
  color: #25364e;
  :focus {
    outline: 2px solid #6482ad;
  }
`;
const list_icon_select = css`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  .icon_all {
    cursor: pointer;
    border: 1px solid #dee2e9;
    background-color: #dee2e9;
    padding: 4px 10px;
    margin-right: 5px;
    border-radius: 8px;
    :hover {
      background-color: #cdd4df;
    }
  }
`;
const searchIcons = css`
  width: 32px;
  height: 32px;
  margin-right: 5px;
  margin-bottom: 3px;
  background-image: url(${iconSprite});
  cursor: pointer;
  position: relative;

  .icon_tooltip {
    display: none;
    background-color: #6482ad;
    border-radius: 5px;
    padding: 5px;
    color: white;
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  :hover .icon_tooltip {
    display: block;
    ::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      border-width: 5px;
      border-style: solid;
      border-color: #6482ad transparent transparent transparent;
      transform: translateX(-50%);
    }
  }
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

// 아이콘 종류별 이름 매핑
const iconLabels: Record<AcquireIcon, string> = {
  [AcquireIcon.QUEST]: "퀘스트",
  [AcquireIcon.DUNGEON]: "던전",
  [AcquireIcon.TBRAID]: "토벌전",
  [AcquireIcon.RAID]: "레이드",
  [AcquireIcon.HARDRAID]: "고난도 임무",
  [AcquireIcon.PVP]: "PvP",
  [AcquireIcon.MGP]: "골드 소서",
  [AcquireIcon.EMERGENCY]: "돌발 임무",
  [AcquireIcon.MAP]: "보물찾기",
  [AcquireIcon.MONSTER]: "마물 사냥",
  [AcquireIcon.DEEPDUNGEON]: "딥 던전",
  [AcquireIcon.SPDUNGEON]: "특수 던전",
  [AcquireIcon.SPFEILD]: "특수 필드",
  [AcquireIcon.CRAFT]: "제작",
  [AcquireIcon.FRIENDSHIP]: "우호부족",
  [AcquireIcon.ISLAND]: "무인도",
  [AcquireIcon.KURONOTE]: "쿠로수첩",
  [AcquireIcon.ACHIEVEMENT]: "업적",
  [AcquireIcon.GIL]: "길",
  [AcquireIcon.CSHOP]: "크리스탈샵",
  [AcquireIcon.EVENT]: "이벤트",
  [AcquireIcon.EXTRA]: "기타",
};

const MountList = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("이름");
  const [selectedIcon, setSelectedIcon] = useState<AcquireIcon | null>(null);
  const [mountData, setMountData] = useRecoilState(mountDataState);
  const [filteredData, setFilteredData] = useState<MountItemProps[]>([]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearchTypeChange = (e: SelectChangeEvent) => {
    setSearchType(e.target.value);
  };

  const onIconClick = (icon: AcquireIcon) => {
    setSelectedIcon(icon);
  };

  useEffect(() => {
    const fetchMountData = async () => {
      if (mountData.length === 0) {
        const mountsCollection = collection(db, "mounts");
        const mountsSnapshot = await getDocs(mountsCollection);
        const mountList = mountsSnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as MountItemProps)
        );

        mountList.sort(function (a, b) {
          return parseInt(a.id) - parseInt(b.id);
        });

        setMountData(mountList);
      }
    };

    fetchMountData();
  }, [mountData.length, setMountData]);

  useEffect(() => {
    const filteredMounts = mountData.filter((item) => item.detail !== ""); //detail이 있는거만 보여주려고 하는 필터링.
    if (searchType === "이름") {
      //이름으로 검색하는 경우
      setFilteredData(
        search === ""
          ? filteredMounts
          : filteredMounts.filter((item) => item.name.includes(search))
      );
    } else {
      //얻는곳 아이콘을 클릭하는 경우
      setFilteredData(
        selectedIcon
          ? filteredMounts.filter((item) =>
              item.acquire_root.some(
                (icons) => icons.acquire_icon === selectedIcon
              )
            )
          : filteredMounts
      );
    }
  }, [mountData, search, searchType, selectedIcon]);

  return (
    <div css={list_wrap}>
      <div css={list_search}>
        <Select
          css={list_select}
          id="search_type_select"
          value={searchType}
          onChange={onSearchTypeChange}
          MenuProps={{
            sx: {
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "#dee2e9",
                color: "#25364e",
              },
              "& .Mui-selected": {
                backgroundColor: "#cdd4df",
                color: "#25364e",
              },
            },
          }}
          sx={{
            color: "#25364e",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6482ad",
            },
          }}
        >
          <MenuItem value={"이름"}>이름</MenuItem>
          <MenuItem value={"얻는곳"}>얻는곳</MenuItem>
        </Select>
        {searchType === "이름" ? (
          <input
            value={search}
            css={list_input}
            onChange={onChangeSearch}
            placeholder="검색어를 입력하세요"
          />
        ) : (
          <div css={list_icon_select}>
            <div className="icon_all" onClick={() => setSelectedIcon(null)}>
              전체
            </div>
            {(Object.entries(iconMap) as [AcquireIcon, string][]).map(
              ([icon, className]) => (
                <div
                  css={searchIcons}
                  className={className}
                  key={icon}
                  onClick={() => onIconClick(icon as AcquireIcon)}
                >
                  <div className="icon_tooltip">{iconLabels[icon]}</div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div css={list_header}>
        <div style={{ display: "flex", justifyContent: "center" }}>아이콘</div>
        <div>이름</div>
        <div style={{ textAlign: "center" }}>인원</div>
        <div>얻는곳</div>
      </div>
      <div>
        {filteredData.map((item) => {
          return <MountItem key={item.id} mountItem={item} />;
        })}
      </div>
    </div>
  );
};

export default MountList;
