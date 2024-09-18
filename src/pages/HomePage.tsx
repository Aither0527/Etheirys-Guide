import Header from "../components/common/Header";
import Navigation from "../components/common/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useState } from "react";
import { css } from "@emotion/react";

const layout = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const main_wrap = css`
  flex: 1;
  display: flex;
`;

const nav_wrap = (isOpen: boolean) => css`
  display: flex;
  @media (max-width: 950px) {
    position: fixed;
    top: 69px;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: white;
    transform: ${isOpen ? "translateX(0%)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
`;

const content_wrap = css`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div css={layout}>
      <Header toggleNav={toggleNav} />
      <div css={main_wrap}>
        <div css={nav_wrap(isNavOpen)}>
          <Navigation toggleNav={toggleNav} />
        </div>
        <div css={content_wrap}>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
