import { Button, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const ProfilePage = ({ setRedirect }) => {
  const { user, setUser, isUserReady, setIsUserReady } =
    useContext(UserContext);
  const toast = useToast();

  const handleUserLogout = async () => {
    try {
      const response = await axios.post('/auth/logout');

      toast({
        title: response.data.message,
        status: 'success',
        isClosable: true,
        duration: 3000,
      });

      setUser(null);
      setIsUserReady(true);
      setRedirect('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!isUserReady) {
    return (
      <Flex h='40vh' alignItems='center' justifyContent='center'>
        <Spinner size='md' />
      </Flex>
    );
  }

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      flexDir='column'
      padding='40px'
      gap='20px'
    >
      <Text>
        Logged in as {user?.name} ({user?.email})
      </Text>

      <Button colorScheme='teal' px='50px' onClick={handleUserLogout}>
        Log out
      </Button>
    </Flex>
  );
};

export default ProfilePage;
