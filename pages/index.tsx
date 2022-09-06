import type { NextPage } from 'next'
import Head from "next/head";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { auth, provider } from "./components/firebase";
import { signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from "react";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //email、passwordサインアップ処理
  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/Top");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //email、passwordサインイン処理
  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/Top");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Googleログイン処理
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    await router.push("/Top");
  };

  return (
    <>
      <Head>
        <title>auth Page</title>
      </Head>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={(e) => handleSignUp(e)}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  新規登録
                </Button>
              </Stack>
            </form>
            <Button
              mx="4"
              className="mt-10"
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="220px"
              onClick={handleLogin}
            >
              ログイン
            </Button>
            <Button
              mx="4"
              className="mt-10"
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="220px"
              onClick={signInWithGoogle}
            >
              Googleログイン
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Home
