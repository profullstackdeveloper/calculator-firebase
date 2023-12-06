import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Button, Divider, Stack, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import Center from "../utils/Center";

interface Props { }

const RegisterContainer = (props: Props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithGoogle = async () => {
    setDisabled(true);
    try {
      const result = await signInWithPopup(auth, Providers.google);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log('user is ', user);
      console.log('token is ', token);
      setDisabled(false);
      console.info('TODO: navigate to authenticated screen');
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code + ': ' + err.message);
      setDisabled(false);
    }
  };

  const signinWithEmail = async () => {
    setDisabled(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const credential = result.user;
      console.log('user credential is ', credential);
    } catch (err: any) {
      setErrorMessage(err.code + ': ' + err.message);
      setDisabled(false);
    }
  }

  return (
    <Stack>
      <Button
        startIcon={<EmailIcon />}
        size="large"
        variant="contained"
        sx={{
          marginTop: '20px'
        }}
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
