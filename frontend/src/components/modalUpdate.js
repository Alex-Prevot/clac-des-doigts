import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  FormLabel,
  ModalOverlay,
  Input,
  ModalFooter,
  FormControl,
  theme,
  Button,
  useDisclosure,
  Switch,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ModalUpdate(props) {
  console.log(props.id)
  const [chickens, setChickens] = useState();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [weight, setWeight] = useState(0);
  const [steps, setSteps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const getElementId = async () => {
    const response = await axios.get(
      `http://localhost:8080/chicken/${props.id}`
    );
    setChickens(response.data);
    setIsRunning(response.data.isRunning);
  };

  useEffect(() => {
    getElementId();
    console.log("aaaaaaaa")
  });

  const updateComponent = async () => {
    const data = {
      name: name,
      birthday: startDate,
      weight: Number(weight),
      steps: Number(steps),
      isRunning: isRunning,
    };
    await axios.put(`http://localhost:8080/chicken/${props.id}`, data);
  };
  console.log("aaaaaaa")

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder={chickens.name}
                  onChange={(name) => setName(name.nativeEvent.data)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={chickens.birthday}
                  onChange={(date) => setStartDate(date)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Weight</FormLabel>
                <Input
                  placeholder={chickens.weight}
                  onChange={(weight) => setWeight(weight.nativeEvent.data)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Steps</FormLabel>
                <Input
                  placeholder={chickens.steps}
                  onChange={(steps) => setSteps(steps.nativeEvent.data)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>isRunning</FormLabel>
                <Switch onChange={() => setIsRunning(!isRunning)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  updateComponent();
                  onClose();
                }}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default ModalUpdate;
