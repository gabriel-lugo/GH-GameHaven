import { Divider } from "@mantine/core";

interface DetailsDividerProps {
  isMobile: boolean;
}

const DetailsDivider: React.FC<DetailsDividerProps> = ({ isMobile }) => {
  return (
    <Divider
      mt="sm"
      mb="sm"
      className={isMobile ? "divider-h" : ""}
      orientation={isMobile ? "horizontal" : "vertical"}
      color="var(--nav-text-color)"
    />
  );
};

export default DetailsDivider;
