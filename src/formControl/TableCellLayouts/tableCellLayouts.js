import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";

export function MutedCell({ title }) {
    return (
        <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="caption" fontWeight="medium" color="text">
                {title}
            </SoftTypography>
        </SoftBox>
    );
}