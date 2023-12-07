import SoftBadge from "../../../components/SoftBadge";
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        {/* <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography> */}
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      {/* <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography> */}
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "Peid", align: "left" },
    { name: "Sender", align: "left" }, // sender id
    { name: "Entity", align: "left" }, // peid
    { name: "ApprovedOn", align: "center" },
    { name: "Status", align: "center" },
    { name: "action", align: "center" },
  
  ],


  // one Peid have multipaal sender ids
  rows: [
    {
      Peid: <Author name="2" email="john@creative-tim.com" />,
      Sender: <Author name="ICCSAZ" email="john@creative-tim.com" />,
      Entity: <Function job="120**********786" org="Organization" />,
      ApprovedOn: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {`${(new Date()).toISOString().split('T')[0]}`}
        </SoftTypography>
      ),
      Status: (
        <SoftBadge variant="gradient" badgeContent="Approved" color="success" size="xs" container />

      ),
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      Peid: <Author name="2" email="john@creative-tim.com" />,
      Sender: <Author name="ICCSAZ" email="john@creative-tim.com" />,
      Entity: <Function job="120**********786" org="Organization" />,
      ApprovedOn: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {`${(new Date()).toISOString().split('T')[0]}`}
        </SoftTypography>
      ),
      Status: (
        <SoftBadge variant="gradient" badgeContent="Approved" color="success" size="xs" container />

      ),
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      Peid: <Author name="2" email="john@creative-tim.com" />,
      Peid: <Author name="2" email="john@creative-tim.com" />,
      Sender: <Author name="ICCSAZ" email="john@creative-tim.com" />,
      Entity: <Function job="120**********786" org="Organization" />,
      ApprovedOn: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {`${(new Date()).toISOString().split('T')[0]}`}
        </SoftTypography>
      ),
      Status: (
        <SoftBadge variant="gradient" badgeContent="Approved" color="success" size="xs" container />

      ),
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },

  ],
};

export default authorsTableData;
