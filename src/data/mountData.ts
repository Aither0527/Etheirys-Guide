export enum AcquireIcon {
  QUEST = "QUEST", //퀘스트
  DUNGEON = "DUNGEON", //던전
  RAID = "RAID", //레이드
  TBRAID = "TBRAID", //토벌전
  HARDRAID = "HARDRAID", //고난도 임무
  PVP = "PVP", //PvP
  EMERGENCY = "EMERGENCY", //돌발 임무
  MONSTER = "MONSTER", //마물 사냥
  DEEPDUNGEON = "DEEPDUNGEON", //딥 던전
  MAP = "MAP", //보물찾기
  CRAFT = "CRAFT", //제작
  MGP = "MGP", //골드 소서 MGP
  FRIENDSHIP = "FRIENDSHIP", //우호부족
  ISLAND = "ISLAND", //무인도
  KURONOTE = "KURONOTE", //쿠로수첩
  ACHIEVEMENT = "ACHIEVEMENT", //업적
  GIL = "GIL", //길로 구매
  CSHOP = "CSHOP", //크리스탈샵
  EVENT = "EVENT", //이벤트
  EXTRA = "EXTRA", //기타
  SPDUNGEON = "SPDUNGEON", //특수 던전 탐색
  SPFEILD = "SPFEILD", //특수 필드 탐색
}

interface AcquireRoot {
  acquire_icon: AcquireIcon;
  acquire: string;
}

export interface MountItemProps {
  id: string; //인게임내 순서
  icon: number;
  icon_id: number; //아이콘 순서
  name: string;
  pnum: number; //탑승인원
  acquire_root: AcquireRoot[];
  patch: string; //패치버전
  detail: string; //설명
  sound: string; //소리
  movement: string; //이동방식
}

// data example
// export const mountData: MountItemProps[] = [
//   {
//     id: 1,
//     icon: 1,
//     icon_id: 1,
//     name: "내 초코보",
//     pnum: 1,
//     movement: "보행",
//     patch: "2.0",
//     sound: "꾸에엑!",
//     acquire_root: [
//       {
//         acquire_icon: AcquireIcon.QUEST,
//         acquire: "퀘스트 (드디어 내 초코보를!)",
//       },
//     ],
//     detail:
//       "이슈가르드산 군용 초코보. 일반적인 라운시 종을 비롯하여, 루가딘족이 타도 버틸 수 있는 커다란 데스트리어 종과 라라펠족을 위해 품종개량된 벨라흐디아 제니트 종 등이 있다.",
//   },
// ];
