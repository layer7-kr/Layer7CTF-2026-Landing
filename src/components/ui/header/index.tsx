import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Light } from "@/components/ui";
import { Link } from "@/data/link";
import {
  getRegistrationStatus,
  useRegistrationStatus,
} from "@/hooks/useRegistrationStatus";
import Button from "../button";
import { HStack } from "../stack";
import Typo from "../typo";

import s from "./style.module.scss";

export default function Header() {
  const pathname = useLocation().pathname;
  const isArticlePage = pathname === "/article" || pathname.startsWith("/article/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const registrationStatus = useRegistrationStatus();
  const registrationLabel =
    registrationStatus === "open"
      ? "참가 신청"
      : registrationStatus === "closed"
        ? "신청 마감"
        : "Coming Soon";

  const openRegistration = () => {
    if (getRegistrationStatus() === "open") {
      window.location.assign(Link.registration);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={s.header}>
        <div className={s.header_wrap}>
          <ul className={s.header_menu}>
            <li>
              <a href="/" data-active={pathname === "/"}>
                <Typo.Body>CTF</Typo.Body>
              </a>
              <a href="/winners" data-active={pathname === "/winners"}>
                <Typo.Body>Winners</Typo.Body>
              </a>
              <a href="/article" data-active={isArticlePage}>
                <Typo.Body>Notice</Typo.Body>
              </a>
            </li>
          </ul>

          <a href="/" className={s.logo_link}>
            <img
              src="/layer7.svg"
              alt="Layer7 logo"
              className={s.header_logo}
            />
          </a>

          <HStack gap={10} className={s.header_buttons}>
            <a href="/#contact">
              <Button variant="secondary" className={s.inquiry_button}>
                문의하기
              </Button>
            </a>
            {registrationStatus !== "upcoming" && (
              <a href={Link.discord} target="_blank" rel="noreferrer">
                <Button variant="secondary">디스코드</Button>
              </a>
            )}
            <Button
              className={s.ctf_button}
              disabled={registrationStatus !== "open"}
              onClick={openRegistration}
            >
              Layer7 CTF 26 {registrationLabel}
            </Button>
          </HStack>

          <div className={s.mobile_right}>
            <Button
              className={s.mobile_ctf_button}
              disabled={registrationStatus !== "open"}
              onClick={openRegistration}
            >
              {registrationLabel}
            </Button>
            <button className={s.hamburger_menu} onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 네비게이션 메뉴 */}
      <div
        className={`${s.mobile_nav} ${isMobileMenuOpen ? s.mobile_nav_open : ""}`}
      >
        <Light />
        <div className={s.mobile_nav_content}>
          <button className={s.mobile_nav_close} onClick={toggleMobileMenu}>
            <X size={24} />
          </button>

          <nav className={s.mobile_nav_menu}>
            <a href="/" className={pathname === "/" ? s.active : ""}>
              <Typo.Headline>CTF</Typo.Headline>
            </a>
            <a
              href="https://layer7.kr/"
              target="_blank"
              className={pathname === "/layer7" ? s.active : ""}
            >
              <Typo.Headline>Layer7</Typo.Headline>
            </a>
            <a
              href="/winners"
              className={pathname === "/winners" ? s.active : ""}
            >
              <Typo.Headline>Winners</Typo.Headline>
            </a>
            <a href="/article" className={isArticlePage ? s.active : ""}>
              <Typo.Headline>Notice</Typo.Headline>
            </a>
            {registrationStatus !== "upcoming" && (
              <a href={Link.discord} target="_blank" rel="noreferrer">
                <Typo.Headline>Discord</Typo.Headline>
              </a>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
