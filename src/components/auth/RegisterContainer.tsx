import { useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from '@mui/icons-material/Key';
import axios from "axios";
import { UserContext } from "../../context/userContext";

interface Props { }

const RegisterContainer = (props: Props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');

  const { firstName, lastName, setFirstName, setLastName} = useContext(UserContext);
  const [password, setPassword] = useState('');

  const signInWithGoogle = async () => {
    setDisabled(true);
    try {
      const result = await signInWithPopup(auth, Providers.google);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log('user is ', user.displayName);
      const firstName = user.displayName?.split(' ')[0];
      const lastName = user.displayName?.split(' ')[1];
      console.log('token is ', token);

      await axios.post('http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/signup', {
        email: user.email,
        firstName,
        lastName
      });

      setDisabled(false);
      console.info('TODO: navigate to authenticated screen');
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code + ': ' + err.message);
      setDisabled(false);
    }
  };

  const signupWithEmail = async () => {
    setDisabled(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const credential = result.user;
      console.log('user credential is ', credential);
      await axios.post('http://127.0.0.1:5001/calculator-49ac2/us-central1/calculation/signup', {
        email: email,
        firstName,
        lastName
      });
      setDisabled(false);
      sendEmailVerification(credential)
      navigate("/")
    } catch (err: any) {
      setErrorMessage(err.code + ': ' + err.message);
      navigate("/login?action=login")
      setDisabled(false);
    }
  }

  return (
    <Stack>
      <div className="flex flex-row w-full justify-between gap-3">
        <TextField  label="First Name" variant="standard" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField  label="Last Name" variant="standard" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField  className="w-full" label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
        <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField type="password"  className="w-full" label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Box>
      <Button
        startIcon={<EmailIcon />}
        size="large"
        variant="contained"
        sx={{
          marginTop: '40px',
          marginBottom: '20px'
        }}
        onClick={() => signupWithEmail()}
      >
        Sign Up With Email
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
        Sign Up With Google
      </Button>

      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Stack>
  );
};

export default RegisterContainer;
