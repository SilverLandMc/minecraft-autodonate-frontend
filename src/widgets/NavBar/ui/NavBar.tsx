import React from "react";
import { Link } from "react-router-dom";

import {
  AppRoutes as AppRoute,
  RoutePath,
} from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./NavBar.module.scss";

interface NavBarProps {
  className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
  return (
    <div className={classNames(styles.navBar, {}, [className])}>
      <Link to={RoutePath[AppRoute.MAIN]}>Главная</Link>
      <Link to={RoutePath[AppRoute.RANKS]}>Ранги</Link>
      <Link to={RoutePath[AppRoute.RANKS]}>Бустеры</Link>
      <Link to={RoutePath[AppRoute.RANKS]}>Сундуки</Link>
      <Link to={RoutePath[AppRoute.RANKS]}>Ресурсы</Link>
    </div>
  );
};
