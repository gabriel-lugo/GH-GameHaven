// RatingSection.tsx
import { Box, Paper, Text } from "@mantine/core";
import React from "react";
import GameRating from "./RateGame";

interface RatingSectionProps {
  totalRating: number | null | undefined;
  totalRatingCount?: number;
  gameName: string;
  gameId: string;
}

const RatingSection: React.FC<RatingSectionProps> = ({
  totalRating,
  totalRatingCount = 0,
  gameName,
  gameId,
}) => {
  const getRatingClass = (rating: number) => {
    if (rating === null || rating === undefined) {
      return "rating-color-tbd";
    } else if (rating >= 75) {
      return "rating-color-high";
    } else if (rating >= 50) {
      return "rating-color-medium";
    } else {
      return "rating-color-low";
    }
  };

  return (
    <Box className="rating-section">
      <Text className={`rating-color ${getRatingClass(totalRating as number)}`}>
        {totalRating === null || totalRating === undefined
          ? "TBD"
          : Math.round(totalRating)}
      </Text>
      {totalRatingCount > 0 ? (
        <Text mt="sm" size="sm">
          Based on {totalRatingCount} ratings
        </Text>
      ) : (
        <Text mt="sm" size="sm" fs="italic">
          No ratings yet
        </Text>
      )}
      <Box style={{ marginTop: "1.5rem" }}>
        <Paper
          style={{ background: "#F9F6EE", width: "15rem" }}
          p="sm"
          shadow="sm"
        >
          <Text fw={500} mb="sm" size="sm">
            Rate {gameName}
          </Text>
          <GameRating gameId={gameId} />
        </Paper>
      </Box>
    </Box>
  );
};

export default RatingSection;
