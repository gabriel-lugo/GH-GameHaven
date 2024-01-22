import { Box, Rating, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { User } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import { auth, db } from "../firebase";

interface GameRatingProps {
  gameId: string;
}

function GameRating({ gameId }: GameRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [gameId]);

  const fetchRatings = async () => {
    const ratingsRef = collection(db, "games", gameId, "ratings");
    const querySnapshot = await getDocs(ratingsRef);
    let totalRating = 0;
    let count = 0;
    querySnapshot.forEach((doc) => {
      totalRating += doc.data().rating;
      count++;
    });
    const averageRating = count > 0 ? totalRating / count : 0;
    setRating(averageRating);
    setRatingCount(count);
  };

  const handleRatingChange = async (value: number) => {
    if (user) {
      const ratingRef = doc(db, "games", gameId, "ratings", user.uid);
      await setDoc(ratingRef, { rating: value });
      fetchRatings();
    } else {
      showNotification({
        title: "Sign In Needed",
        message: "You need to sign in to rate a game",
        color: "red",
        icon: <MdOutlineError />,
      });
    }
  };

  return (
    <Box>
      <Rating size="lg" value={rating} onChange={handleRatingChange} />
      <Text size="sm" mt="xs">
        {rating > 0
          ? `Average Rating: ${rating.toFixed(1)} out of 5`
          : "No ratings yet"}
      </Text>
      <Text size="xs" mt="xs">
        Based on {ratingCount} ratings from the GH community
      </Text>
    </Box>
  );
}

export default GameRating;
