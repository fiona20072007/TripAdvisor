import React from "react";
import LocationIndex from "./location";
import LocationDetail from "./locationDetail";
import ScheduleIndex from "./schedule";
import MemberIndex from "./member";
import NoMatch from "./NoMatch";
import Profile from "./member/profile";
import styles from "./scss/App.module.scss";
import icon from "./image/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAsia,
  faMapMarkedAlt,
  faUserCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.lastScrollTop = 0;
    this.state = {
      hidden: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > this.lastScrollTop) {
      this.lastScrollTop = currentScrollTop;
      this.setState({ hidden: true });
    } else {
      this.lastScrollTop = currentScrollTop;
      this.setState({ hidden: false });
    }
  };
  handleShowEditNav = () => {
    if (window.location.pathname.substring(0, 9) === "/schedule") {
      window.location.replace("/schedule");
    } else {
      return;
    }
  };
  render() {
    return (
      <Router>
        <div className={styles.loading} id="loading">
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.alert} id="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <div> 無法拖曳重複的景點卡片哦！</div>
        </div>
        <div className={styles.app}>
          <nav className={this.state.hidden ? styles.hide : styles.active}>
            <div className={styles.flexWrap}>
              <Link to="/" className={styles.icon}>
                <img src={icon} alt="icon" />
                <div id="MainTitle">Travel Advisor</div>
              </Link>

              <nav className={styles.menu}>
                <input
                  type="checkbox"
                  href="#"
                  className={styles["menu-open"]}
                  name="menu-open"
                  id="menu-open"
                />
                <label
                  className={styles["menu-open-button"]}
                  htmlFor="menu-open"
                >
                  <span
                    className={`${styles.hamburger} ${styles["hamburger-1"]}`}
                  ></span>
                  <span
                    className={`${styles.hamburger} ${styles["hamburger-2"]}`}
                  ></span>
                  <span
                    className={`${styles.hamburger} ${styles["hamburger-3"]}`}
                  ></span>
                </label>

                <Link
                  to="/member"
                  className={styles["menu-item"]}
                  data-title="會員"
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </Link>

                <Link
                  to="/schedule"
                  onClick={this.handleShowEditNav}
                  className={styles["menu-item"]}
                  data-title="行程"
                >
                  <FontAwesomeIcon icon={faMapMarkedAlt} />
                </Link>

                <Link to="/" className={styles["menu-item"]} data-title="搜尋">
                  <FontAwesomeIcon icon={faGlobeAsia} />
                </Link>
              </nav>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="shadowed-goo">
                    <feGaussianBlur
                      in="SourceGraphic"
                      result="blur"
                      stdDeviation="10"
                    />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                      result="goo"
                    />
                    <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                    <feColorMatrix
                      in="shadow"
                      mode="matrix"
                      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
                      result="shadow"
                    />
                    <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                    <feComposite in2="shadow" in="goo" result="goo" />
                    <feComposite in2="goo" in="SourceGraphic" result="mix" />
                  </filter>
                  <filter id="goo">
                    <feGaussianBlur
                      in="SourceGraphic"
                      result="blur"
                      stdDeviation="10"
                    />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                      result="goo"
                    />
                    <feComposite in2="goo" in="SourceGraphic" result="mix" />
                  </filter>
                </defs>
              </svg>
            </div>
          </nav>
          <div className={styles.mobileNav} id="mobileNav">
            <Link to="/" id="mobileNav1">
              <FontAwesomeIcon icon={faGlobeAsia} />
              搜尋
            </Link>
            <Link
              to="/schedule"
              onClick={this.handleShowEditNav}
              id="mobileNav2"
            >
              <FontAwesomeIcon icon={faMapMarkedAlt} />
              行程
            </Link>
            <Link to="/member" id="mobileNav3">
              <FontAwesomeIcon icon={faUserCircle} />
              會員
            </Link>
          </div>

          <Switch>
            <Route exact path="/" component={LocationIndex} />
            <Route
              exact
              path="/locationDetail/:tags"
              component={LocationDetail}
            />
            <Route path="/schedule" component={ScheduleIndex} />
            <Route path="/member" component={MemberIndex} />
            <Route path="/profile" component={Profile} />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
