import { makeStyles } from "@mui/styles";

export default makeStyles(
  ({ palette, typography, boxShadows, transitions, breakpoints, functions }) => {
    const sidebarWidth = 250;
    const { white, transparent } = palette;
    const { fontWeightMedium } = typography;
    const { xxl } = boxShadows;
    const { pxToRem } = functions;

    return {
      sidenav: {
        boxShadow: xxl,
        border: "none",

        [breakpoints.up("xl")]: {
          backgroundColor: ({ transparentSidenav }) =>
            transparentSidenav ? transparent.main : white.main,
          boxShadow: ({ transparentSidenav }) => (transparentSidenav ? "none" : xxl),
          marginBottom: ({ transparentSidenav }) => (transparentSidenav ? 0 : "inherit"),
          left: "0",
        },
      },

      sidenav_header: {
        paddingTop: "15px" ,
        paddingLeft: "20px" ,
        paddingRight: "20px" ,
        paddingBottom: "10px" ,
        textAlign: "center",

        "& a": {
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        },
      },

      sidenav_logo: {
        width: pxToRem(32),
      },

      sidenav_logoLabel: {
        marginLeft: pxToRem(4),
        fontWeight: fontWeightMedium,
        wordSpacing: pxToRem(-1),
        transition: transitions.create("opacity", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),

        [breakpoints.up("xl")]: {
          opacity: ({ miniSidenav }) => (miniSidenav ? 0 : 1),
        },
      },

      sidenav_title: {
        display: "block",
        opacity: 0.6,
        paddingLeft: pxToRem(24),
        margin: `${pxToRem(16)} 0 ${pxToRem(8)} ${pxToRem(8)}`,
      },

      marginTopNone: {
        marginTop: 0,
      },

      sidenav_footer: {
        margin: `auto ${pxToRem(16)} ${pxToRem(16)}`,
        paddingTop: pxToRem(16),
      },

      sidenav_open: {
        transform: "translateX(0)",
        transition: transitions.create("transform", {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),

        [breakpoints.up("xl")]: {
          width: sidebarWidth,
          transform: "translateX(0)",
          transition: transitions.create(["width", "background-color"], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
          }),
        },
      },

      sidenav_close: {
        transform: `translateX(${pxToRem(-320)})`,
        transition: transitions.create("transform", {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),

        [breakpoints.up("xl")]: {
          width: pxToRem(96),
          overflowX: "hidden",
          transform: "translateX(0)",
          transition: transitions.create(["width", "background-color"], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
        },
      },

      sidenav_navlink: {
        textDecoration: "none",
      },
    };
  }
);