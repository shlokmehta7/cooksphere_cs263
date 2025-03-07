import React from "react";
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
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <AppBar position="fixed" style={{ background: 'linear-gradient(90deg, #6B8E23, #8AA63A)', width: '100%', zIndex: 1000, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        <Link href="/" passHref>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Image src="/images/CookSphereLogo.png" alt="CookSphere Logo" width={80} height={80} style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </Link>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 20px' }}>
          <TextField variant="outlined" placeholder="Search recipes..." size="small" fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>, style: { backgroundColor: '#fff', borderRadius: '20px' } }} style={{ maxWidth: '500px', marginRight: '10px' }} />
          <IconButton onClick={() => console.log('Search')} style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <SearchIcon style={{ color: '#6B8E23' }} />
          </IconButton>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} href="/" startIcon={<HomeIcon />} style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }}>Home</Button>
          <Button color="inherit" component={Link} href="/upload" startIcon={<UploadIcon />} style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }}>Upload</Button>
          {currentUser ? (
            <Button color="inherit" component={Link} href="/profile" startIcon={<AccountCircleIcon />} style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }}>Profile</Button>
          ) : (
            <Button color="inherit" component={Link} href="/login" startIcon={<LoginIcon />} style={{ textTransform: 'none', margin: '0 10px', color: '#fff' }}>Login</Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;