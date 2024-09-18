import { css } from "@emotion/react";
import { FaBars } from "react-icons/fa";

const header = css`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  z-index: 1000;
  align-items: center;
  padding: 16px;
`;
const menubutton = css`
  height: 36px;
  align-items: center;
  padding: 0px 10px;
  margin-right: 20px;
  cursor: pointer;
  @media (min-width: 950px) {
    display: none;
  }
`;
const logo_img = css`
  height: 2rem;
  margin-right: 10px;
`;
const logo_text = css`
  font-size: 24px;
  font-weight: 800;
  color: #6482ad;

  -ms-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
const Header = (props: { toggleNav: () => void }) => {
  return (
    <div css={header}>
      <FaBars css={menubutton} onClick={props.toggleNav} />
      <img
        draggable="false"
        css={logo_img}
        src={`${import.meta.env.BASE_URL}image/logo.png`}
      />
      <div css={logo_text}>아이테리스 가이드</div>
    </div>
  );
};

export default Header;
