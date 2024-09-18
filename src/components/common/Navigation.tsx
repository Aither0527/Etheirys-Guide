import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const NavBar = css`
  background-color: #6482ad;
  width: 250px;
  padding: 20px 8px;
`;

const NavItem = css`
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #7fa1c3;
  }
`;

const Navigation = (props: { toggleNav: () => void }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth <= 950) {
      props.toggleNav();
    }
  };

  return (
    <div css={NavBar}>
      <div css={NavItem} onClick={() => handleNavigation("/mount")}>
        탈것
      </div>
      <div css={NavItem} onClick={() => handleNavigation("/minion")}>
        꼬마친구
      </div>
      <div css={NavItem} onClick={() => handleNavigation("/madeby")}>
        Made by
      </div>
    </div>
  );
};

export default Navigation;
