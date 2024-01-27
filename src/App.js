import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import theme from "./assets/theme";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import routes from "./routes";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "./context";
import SoftBox from "./components/SoftBox";
import DashboardNavbar from "./components/Navbars/DashboardNavbar";
import DashboardLayout from "./components/LayoutContainers/DashboardLayout";
import Sidenav from "./components/Sidenav";
import SignInSide from "./Layouts/auth/SignIn";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { userInfo, isLoggedIn } = useSelector((state) => state?.user?.value);
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        <>
          <Sidenav
            color={sidenavColor}
            brandName="MultiMedia Panal"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
              <div>
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    success: { style: { background: "#05A677", color: "#fff" } },
                    info: { style: { background: "#0948B3", color: "#fff" } },
                    error: { style: { background: "#FA5252", color: "#fff" } },
                  }}
                />
              </div>
            </SoftBox>
          </DashboardLayout>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}




// Reight side nevbar
// direction === "rtl" ? (
//   <CacheProvider value={rtlCache}>
//     <ThemeProvider theme={themeRTL}>
//       <CssBaseline />
//       {layout === "dashboard" && (
//         <>
//           <Sidenav
//             color={sidenavColor}
//             brand={brand}
//             brandName="Soft UI Dashboard"
//             routes={routes}
//             onMouseEnter={handleOnMouseEnter}
//             onMouseLeave={handleOnMouseLeave}
//           />
//           <Configurator />
//           {configsButton}
//         </>
//       )}
//       {layout === "vr" && <Configurator />}
//       <Routes>
//         {getRoutes(routes)}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </ThemeProvider>
//   </CacheProvider>
// ) :