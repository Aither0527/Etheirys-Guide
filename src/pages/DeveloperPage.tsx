import { css } from "@emotion/react";

const container = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const main_text = css`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const info_text = css`
  margin-bottom: 1rem;
`;

const DeveloperPage = () => {
  return (
    <div css={container}>
      <div css={main_text}>
        에오르제아를 여행하는 모험가를 위한 아이테리스 가이드
      </div>
      <div css={info_text}>🐇천천히 데이터 업데이트 중이에요</div>
      <div>
        🐇문의사항은 <a href="https://x.com/etheirys_guide">@etheirys_guide</a>{" "}
        또는 <a href="mailto:aither0527@gmail.com">이메일</a>로 보내주세요
      </div>
    </div>
  );
};

export default DeveloperPage;
