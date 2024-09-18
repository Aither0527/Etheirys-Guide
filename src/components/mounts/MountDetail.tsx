import { css } from "@emotion/react";
import { FaArrowLeft, FaCode, FaUsers } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import iconSprite from "/public/image/search_icon_sprites.png";
import "../../data/searchIconPos.css";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AcquireIcon, MountItemProps } from "../../data/mountData";
import { db } from "../../../firebaseConfig";

const container = css`
  flex: 1;
  padding-top: 2rem;
  margin: 0px 4rem;
  @media (min-width: 950px) {
    margin: 0px 6rem;
  }
`;
const back_btn = css`
  align-items: center;
  display: flex;
  color: #6482ad;
  cursor: pointer;
  border: none;
  background: none;
  margin-bottom: 1rem;
  &:hover {
    color: #7fa1c3;
  }
`;
const card_wrap = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const card = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  @media (min-width: 950px) {
    flex-direction: row;
  }
`;

const image_wrap = css`
  max-width: 350px;
  max-height: 350px;
`;
const info_wrap = css`
  margin-left: 3rem;
`;
const text_name = css`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 6px;
`;
const text_detail = css`
  max-width: 600px;
  word-break: keep-all;
  margin-bottom: 20px;
`;
const acquire_wrap = css`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const acquire_icon = css`
  height: 32px;
  width: 32px;
  margin-right: 10px;
`;
const icon_scale = css`
  width: 32px;
  height: 32px;
  background-image: url(${iconSprite});
  background-repeat: no-repeat;
`;
const text_acquire = css`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;
const text_pnum = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;
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

const MountDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mount, setMount] = useState<MountItemProps | null>(null);
  const [loading, setLoading] = useState(true);

  // const mount = mountData.find((item) => item.icon_id === Number(id));

  const imagePath = `${import.meta.env.BASE_URL}image/mount_detail/${String(
    id
  ).padStart(3, "0")}.png`;

  useEffect(() => {
    const fetchMount = async () => {
      try {
        if (!id) throw new Error("Mount ID is undefined");

        const mountRef = collection(db, "mounts");
        const sameId = query(mountRef, where("icon_id", "==", parseInt(id)));
        const querySnapshot = await getDocs(sameId);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setMount({
            ...data,
          } as MountItemProps);
        } else {
          console.log("Mount not found");
        }
      } catch (err) {
        console.log("Error fetching mount data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMount();
  }, [id]);

  if (loading)
    return (
      <div css={container}>
        <div css={card_wrap}>Loading...</div>
      </div>
    );
  if (!mount) {
    return <div>페이지를 찾을 수 없습니다</div>;
  }
  return (
    <div css={container}>
      <button css={back_btn} onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: "5px" }} />
        목록으로
      </button>
      <div css={card_wrap}>
        <div css={card}>
          <img src={imagePath} css={image_wrap} />
          <div css={info_wrap}>
            <div css={text_name}>{mount.name}</div>
            <div css={text_detail}>{mount.detail}</div>

            <div css={text_acquire}>얻는 방법</div>
            {mount.acquire_root.map((item, index) => (
              <div key={index} css={acquire_wrap}>
                <div css={acquire_icon}>
                  <div
                    css={icon_scale}
                    className={iconMap[item.acquire_icon]}
                  ></div>
                </div>
                <div>{item.acquire}</div>
              </div>
            ))}

            <div css={text_pnum}>
              <FaUsers style={{ marginRight: "5px" }} />
              <div style={{ fontWeight: "600", marginRight: "8px" }}>
                탑승 인원 :
              </div>
              <div>{mount.pnum}</div>
            </div>
            <div css={text_pnum}>
              <FaCode style={{ marginRight: "5px" }} />
              <div style={{ fontWeight: "600", marginRight: "8px" }}>
                패치 버전 :
              </div>
              <div>{mount.patch}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MountDetail;
