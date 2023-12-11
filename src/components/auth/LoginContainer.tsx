import { useContext, useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from '@mui/icons-material/Key';
import { UserContext } from "../../context/userContext";
import { getUserInfo } from "../../api";

interface Props { }

const LoginContainer = (props: Props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setFirstName, setLastName } = useContext(UserContext);

  /// @name signInWithGoogle
  /// @author Daniel Lee
  /// @desc This function will be called when user click "Sign In With Google" button
  const signInWithGoogle = async () => {
    setDisabled(true);
    try {
      await signInWithPopup(auth, Providers.google);
      const idToken = await auth.currentUser?.getIdToken();
      const userInfo: any = await getUserInfo(idToken);
      if (userInfo.data.firstName || userInfo.data.lastName) {
        setFirstName(userInfo.data.firstName);
        setLastName(userInfo.data.lastName);
      }
      setDisabled(false);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code + ': ' + err.message);
      setDisabled(false);
    }
  };

  /// @name signinWithEmail
  /// @author Daniel Lee
  /// @desc This function will be called when user click "Sign In With Email" button
  const signinWithEmail = async () => {
    setDisabled(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const idToken = await auth.currentUser?.getIdToken();
      const userInfo: any = await getUserInfo(idToken);
      if (userInfo.data.firstName || userInfo.data.lastName) {
        setFirstName(userInfo.data.firstName);
        setLastName(userInfo.data.lastName);
      }
      navigate("/")
    } catch (err: any) {
      setErrorMessage(err.code + ': ' + err.message);
      setDisabled(false);
    }
  }

  return (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField type="password" label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Box>
      <Button
        startIcon={<EmailIcon />}
        size="large"
        variant="contained"
        sx={{
          marginTop: '40px',
          marginBottom: '20px'
        }}
        onClick={() => signinWithEmail()}
      >
        Sign In With Email
      </Button>
      <Divider variant="middle">OR</Divider>
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        disabled={disabled}
        variant="contained"
        onClick={signInWithGoogle}
        sx={{
          marginTop: '20px'
        }}
      >
        Sign In With Google
      </Button>

      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Stack>
  );
};

export default LoginContainer;
