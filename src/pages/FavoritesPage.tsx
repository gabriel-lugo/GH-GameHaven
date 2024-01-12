import { Title } from "@mantine/core";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";

// Function to add a favorite item
async function addFavoriteItem() {
  console.log("addFavoriteItem entered");
  try {
    console.log("Before adding document");
    console.log("Firestore instance: ", db);
    const docRef = await addDoc(collection(db, "favorites"), {
      name: "Favorite Item",
      description: "Description of favorite item",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function FavoritesPage() {
  console.log("useEffect called");
  React.useEffect(() => {
    addFavoriteItem();
  }, []);

  return <Title order={2}>Favorites</Title>;
}

export default FavoritesPage;
