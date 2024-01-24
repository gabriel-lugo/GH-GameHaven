import { Box, Text } from "@mantine/core";
import React from "react";

interface ReleaseDateProps {
  releaseDates: Array<{ date: string }> | undefined;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({ releaseDates }) => {
  function isValidDate(d: any) {
    return d && !isNaN(new Date(d).getTime());
  }

  function convertTimestampToDate(timestamp: any) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  return (
    <Box className="game-release-date">
      <Text size="lg">
        Release Date:{" "}
        {releaseDates && releaseDates.length > 0
          ? isValidDate(releaseDates[0].date)
            ? convertTimestampToDate(releaseDates[0].date)
            : "No Date Available"
          : "Not available"}
      </Text>
    </Box>
  );
};

export default ReleaseDate;
