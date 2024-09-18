import { css } from "@emotion/react";

const container = css`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
`

const MinionsPage = () => {
  return (
    <div css={container}>
      <div>🐇 준비중입니다 🐇</div>
    </div>
  );
};

export default MinionsPage;
