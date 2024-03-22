import { useTheme } from '@mui/material/styles';
import { css } from '@emotion/react';

const useStyles = ({ palette = {}, typography = {}, boxShadows = {}, transitions = {}, breakpoints = {}, functions = {} }) => {
    const theme = useTheme();
    const sidebarWidth = 250;
    const transparentColor = palette && palette.transparent ? palette.transparent.main : 'transparent';
    const fontWeightMedium = typography && typography.fontWeightMedium ? typography.fontWeightMedium : 'normal';
    const xxl = boxShadows && boxShadows.xxl ? boxShadows.xxl : 'none';
    const easing = transitions && transitions.easing ? transitions.easing : {};
    const duration = transitions && transitions.duration ? transitions.duration : {};

    return {
      sidenav: css({
        boxShadow: xxl,
        border: "none",

        [theme.breakpoints.up("xl")]: {
            backgroundColor: ({ transparentSidenav }) =>
                transparentSidenav ? transparentColor : (palette ? palette.common.white : 'white'),
            boxShadow: ({ transparentSidenav }) => (transparentSidenav ? "none" : xxl),
            marginBottom: ({ transparentSidenav }) => (transparentSidenav ? 0 : "inherit"),
            left: "0",
        },
    }),

    sidenav_header: css({
        paddingTop: "15px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "10px",
        textAlign: "center",

        "& a": {
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
        },
    }),

        sidenav_logo: css({
            width: "2rem",
        }),

        sidenav_logoLabel: css({
          marginLeft: "0.25rem",
          fontWeight: fontWeightMedium,
          wordSpacing: "0.25rem",
          transition: `opacity ${easing.easeInOut || 'ease-in-out'} ${duration.standard || '0.3s'}`,

          [theme.breakpoints.up("xl")]: {
              opacity: ({ miniSidenav }) => (miniSidenav ? 0 : 1),
          },
      }),

        sidenav_title: css({
            display: "block",
            opacity: 0.6,
            paddingLeft: "1.5rem",
            margin: "1rem 0 0.5rem 0.5rem",
        }),

        marginTopNone: css({
            marginTop: 0,
        }),

        sidenav_footer: css({
            margin: "auto 1rem 1rem",
            paddingTop: "1rem",
        }),

        sidenav_open: css({
            transform: "translateX(0)",
            // transition: `transform ${transitions.easing.sharp} ${transitions.duration.shorter}`,

            [theme.breakpoints.up("xl")]: {
                width: sidebarWidth,
                transform: "translateX(0)",
                // transition: `width ${transitions.easing.sharp} ${transitions.duration.enteringScreen}`,
            },
        }),

        sidenav_close: css({
            transform: "translateX(-20rem)",
            // transition: `transform ${transitions.easing.sharp} ${transitions.duration.shorter}`,

            [theme.breakpoints.up("xl")]: {
                width: "6rem",
                overflowX: "hidden",
                transform: "translateX(0)",
                // transition: `width ${transitions.easing.sharp} ${transitions.duration.shorter}`,
            },
        }),

        sidenav_navlink: css({
            textDecoration: "none",
        }),
    };
};

export default useStyles;
