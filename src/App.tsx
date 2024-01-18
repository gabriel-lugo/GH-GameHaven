import { Container } from "@mantine/core";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ProfileImageContext } from "./context/ProfileImageContext";
import { UserContext } from "./context/UserContext";
import "./css/App.css";
import { auth, db } from "./firebase";

function App() {
  const { user, updateUser } = useContext(UserContext);
  const { updateSelectedProfileImage } = useContext(ProfileImageContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const updatedUser = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName || "",
        };

        if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
          updateUser(updatedUser);

          try {
            const userRef = doc(db, "users", authUser.uid);
            const userSnapshot = await getDoc(userRef);
            const userData = userSnapshot.data();
            if (userData && userData.profileImageId !== undefined) {
              updateSelectedProfileImage(userData.profileImageId);
            }
          } catch (error) {
            console.error("Error fetching profile image id:", error);
          }
        }
      } else {
        if (user !== null) {
          updateUser(null);
          updateSelectedProfileImage(0);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [updateUser, updateSelectedProfileImage, user]);

  return (
    <>
      <Header />
      <Container size={"xl"} className="container-layout" p={0}>
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
