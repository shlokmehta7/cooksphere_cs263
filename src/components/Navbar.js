// import React, { useState } from "react";
// import Link from "next/link";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import Image from "next/image";
// import { TextField, InputAdornment, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import HomeIcon from "@mui/icons-material/Home";
// import LoginIcon from "@mui/icons-material/Login";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import UploadIcon from "@mui/icons-material/Upload";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useAuth } from "../context/AuthContext";
// import { db } from "../../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import axios from "axios";
// import { useRouter } from "next/router";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   // Access the Spoonacular API key from environment variables
//   const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

//   // Handle search
//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;
  
//     try {
//       // Search Firestore for recipes
//       const recipesRef = collection(db, "recipes");
//       const q = query(recipesRef, where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"));
//       const querySnapshot = await getDocs(q);
//       const firestoreRecipes = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
  
//       // Search Spoonacular API for recipes
//       const spoonacularResponse = await axios.get(
//         `https://api.spoonacular.com/recipes/complexSearch`,
//         {
//           params: {
//             apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
//             query: searchQuery,
//             number: 10, // Number of results to fetch
//           },
//         }
//       );
//       const spoonacularRecipes = spoonacularResponse.data.results;
  
//       // Combine results from Firestore and Spoonacular
//       const allRecipes = [...firestoreRecipes, ...spoonacularRecipes];
  
//       // Navigate to the search results page with the combined results
//       router.push({
//         pathname: "/search-results",
//         query: { results: JSON.stringify(allRecipes) },
//       });
//     } catch (error) {
//       console.error("Error searching recipes:", error);
//     }
//   };

//   return (
//     <AppBar
//       position="fixed"
//       style={{
//         background: "linear-gradient(90deg, #6B8E23, #8AA63A)",
//         width: "100%",
//         zIndex: 1000,
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//         fontFamily: "'Poppins', sans-serif",
//       }}
//     >
//       <Toolbar>
//         {/* Logo */}
//         <Link href="/" passHref>
//           <div
//             style={{
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               marginRight: "auto",
//             }}
//           >
//             <div
//               style={{
//                 width: "80px",
//                 height: "80px",
//                 borderRadius: "50%",
//                 overflow: "hidden",
//                 transition: "transform 0.2s, box-shadow 0.2s",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               }}
//               className="logo-hover"
//             >
//               <Image
//                 src="/images/CookSphereLogo.png"
//                 alt="CookSphere Logo"
//                 width={80}
//                 height={80}
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//           </div>
//         </Link>

//         {/* Search Bar */}
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             margin: "0 20px",
//           }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Search recipes..."
//             size="small"
//             fullWidth
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={(e) => {
//               if (e.key === "Enter") handleSearch();
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               style: { backgroundColor: "#fff", borderRadius: "20px" },
//             }}
//             style={{ maxWidth: "500px", marginRight: "10px" }}
//           />
//           <IconButton
//             onClick={handleSearch}
//             style={{
//               backgroundColor: "#fff",
//               borderRadius: "20px",
//               padding: "8px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <SearchIcon style={{ color: "#6B8E23" }} />
//           </IconButton>
//         </div>

//         {/* Navigation Buttons */}
//         <div
//           style={{
//             marginLeft: "auto",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           {/* Home Button */}
//           <Button
//             color="inherit"
//             component={Link}
//             href="/"
//             startIcon={<HomeIcon />}
//             style={{
//               textTransform: "none",
//               margin: "0 10px",
//               color: "#fff",
//               fontFamily: "'Poppins', sans-serif",
//             }}
//           >
//             Home
//           </Button>

//           {/* Upload Button */}
//           <Button
//             color="inherit"
//             component={Link}
//             href="/upload"
//             startIcon={<UploadIcon />}
//             style={{
//               textTransform: "none",
//               margin: "0 10px",
//               color: "#fff",
//               fontFamily: "'Poppins', sans-serif",
//             }}
//           >
//             Upload
//           </Button>

//           {/* Conditional Rendering for Login/Signup or Logout */}
//           {currentUser ? (
//             <>
//               {/* Profile Button */}
//               <Button
//                 color="inherit"
//                 component={Link}
//                 href="/profile"
//                 startIcon={<AccountCircleIcon />}
//                 style={{
//                   textTransform: "none",
//                   margin: "0 10px",
//                   color: "#fff",
//                   fontFamily: "'Poppins', sans-serif",
//                 }}
//               >
//                 Profile
//               </Button>

//               {/* Logout Button */}
//               <Button
//                 color="inherit"
//                 onClick={logout}
//                 startIcon={<LogoutIcon />}
//                 style={{
//                   textTransform: "none",
//                   margin: "0 10px",
//                   color: "#fff",
//                   fontFamily: "'Poppins', sans-serif",
//                 }}
//               >
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               {/* Login Button */}
//               <Button
//                 color="inherit"
//                 component={Link}
//                 href="/login"
//                 startIcon={<LoginIcon />}
//                 style={{
//                   textTransform: "none",
//                   margin: "0 10px",
//                   color: "#fff",
//                   fontFamily: "'Poppins', sans-serif",
//                 }}
//               >
//                 Login
//               </Button>

//               {/* Signup Button */}
//               <Button
//                 color="inherit"
//                 component={Link}
//                 href="/signup"
//                 style={{
//                   textTransform: "none",
//                   margin: "0 10px",
//                   color: "#fff",
//                   fontFamily: "'Poppins', sans-serif",
//                 }}
//               >
//                 Sign Up
//               </Button>
//             </>
//           )}
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Image from "next/image";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadIcon from "@mui/icons-material/Upload";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";
import { useRouter } from "next/router";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Spoonacular API Key
  const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  // Handle GPT button click
  const handleGptClick = () => {
    console.log("GPT button clicked");
    // Add your ChatGPT functionality here
    // Example: Open a ChatGPT modal or redirect to a ChatGPT page
    router.push("/chat-gpt"); // Replace with your desired functionality
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // Search Firestore for recipes
      const recipesRef = collection(db, "recipes");
      const q = query(recipesRef, where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"));
      const querySnapshot = await getDocs(q);
      const firestoreRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Search Spoonacular API for recipes
      const spoonacularResponse = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: SPOONACULAR_API_KEY,
            query: searchQuery,
            number: 10, // Number of results to fetch
          },
        }
      );
      const spoonacularRecipes = spoonacularResponse.data.results;

      // Combine results from Firestore and Spoonacular
      const allRecipes = [...firestoreRecipes, ...spoonacularRecipes];

      // Navigate to a search results page with the combined results
      router.push({
        pathname: "/search-results",
        query: { results: JSON.stringify(allRecipes) },
      });
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      style={{
        background: "linear-gradient(90deg, #6B8E23, #8AA63A)",
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Link href="/" passHref>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              className="logo-hover"
            >
              <Image
                src="/images/CookSphereLogo.png"
                alt="CookSphere Logo"
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Link>

        {/* Search Bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 20px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search recipes..."
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { backgroundColor: "#fff", borderRadius: "20px" },
            }}
            style={{ maxWidth: "500px", marginRight: "10px" }}
          />
          <IconButton
            onClick={handleSearch}
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <SearchIcon style={{ color: "#6B8E23" }} />
          </IconButton>
        </div>

        {/* GPT Button with Circular Logo */}
        <IconButton
          onClick={handleGptClick}
          style={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            margin: "0 10px",
            padding: "0", // Remove padding to make the logo fill the button
            width: "40px", // Set button size
            height: "40px", // Set button size
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              width: "100%", // Fill the button area
              height: "100%", // Fill the button area
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/chatgptlogo.png" // Path to your GPT logo
              alt="GPT Logo"
              width={40} // Match button size
              height={40} // Match button size
              style={{ objectFit: "cover" }} // Ensure the image fits within the circle
            />
          </div>
        </IconButton>

        {/* Navigation Buttons */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Home Button */}
          <Button
            color="inherit"
            component={Link}
            href="/"
            startIcon={<HomeIcon />}
            style={{
              textTransform: "none",
              margin: "0 10px",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Home
          </Button>

          {/* Upload Button */}
          <Button
            color="inherit"
            component={Link}
            href="/upload"
            startIcon={<UploadIcon />}
            style={{
              textTransform: "none",
              margin: "0 10px",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Upload
          </Button>

          {/* Conditional Rendering for Login/Signup or Logout */}
          {currentUser ? (
            <>
              {/* Profile Button */}
              <Button
                color="inherit"
                component={Link}
                href="/profile"
                startIcon={<AccountCircleIcon />}
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Profile
              </Button>

              {/* Logout Button */}
              <Button
                color="inherit"
                onClick={logout}
                startIcon={<LogoutIcon />}
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Button
                color="inherit"
                component={Link}
                href="/login"
                startIcon={<LoginIcon />}
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Login
              </Button>

              {/* Signup Button */}
              <Button
                color="inherit"
                component={Link}
                href="/signup"
                style={{
                  textTransform: "none",
                  margin: "0 10px",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;