import { css } from "@emotion/react";

const footer = css`
  background-color: #f3f4f6;
  padding: 16px;
  font-size: 0.8rem;
  text-align: center;
  color: #4b5563;
`;

const Footer = () => {
  return (
    <div css={footer}>
      <div>(C) 2010 - 2023 SQUARE ENIX CO., LTD. All Rights Reserved.</div>
      <div>Published in Korea by ACTOZSOFT CO., LTD.</div>
    </div>
  );
};

export default Footer;
