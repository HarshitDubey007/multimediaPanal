import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import { useSoftUIController } from "context";
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";
import SoftButton from "../SoftButton";
import { card, cardContent, cardIcon, cardIconBox } from "./styles/sidenavCard";

function SidenavCard() {
  const [controller] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;

  return (
    <Card sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        <SoftBox
          bgColor="white"
          width="2rem"
          height="2rem"
          borderRadius="md"
          shadow="md"
          mb={2}
          sx={cardIconBox}
        >
          <Icon fontSize="medium" sx={(theme) => cardIcon(theme, { sidenavColor })}>
            star
          </Icon>
        </SoftBox>
        <SoftBox lineHeight={1}>
          <SoftTypography variant="h6" color="white">
            Need help?
          </SoftTypography>
          <SoftBox mb={1.825} mt={-1}>
            <SoftTypography variant="caption" color="white" fontWeight="medium">
              Please check our docs
            </SoftTypography>
          </SoftBox>
          <SoftButton
            component={Link}
            href="https://www.creative-tim.com/learning-lab/react/quick-start/soft-ui-dashboard/"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth
          >
            documentation
          </SoftButton>
        </SoftBox>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;
