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
  SimpleGrid,
  useDisclosure,
  Switch,
  Text
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon, StarIcon, TriangleDownIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [elemId, setElemId] = useState()
  const [chickens, setChickens] = useState([]);
  const [chickenElem, setChickenElem] = useState();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenPatch,
    onOpen: onOpenPatch,
    onClose: onClosePatch,
  } = useDisclosure();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [weight, setWeight] = useState(0);
  const [steps, setSteps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isRunningDb, setIsRunningDb] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/chicken");
    setChickens(response.data);
  };

  const deleteElement = async (id) => {
    await axios.delete(`http://localhost:8080/chicken/${id}`);
    window.location.reload();
  };
  
  const runElement = async (id) => {
    await axios.get(`http://localhost:8080/chicken/run/${id}`);
    window.location.reload();
  }

  const listItems = chickens.map((item) => (
    <SimpleGrid columns={1} spacingX="20px" spacingY="20px" key={item.id}>
      <Box bg="whitesmoke" height="60px" margin="10px">
        {item.name.toString()}{" | "}
        {new Date(item.birthday).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" | "}
        {item.weight} {" | "} {item.steps} {" | "} {item.isRunning.toString()}
        <Button margin="10px" onClick={() => deleteElement(item.id)}>
          <DeleteIcon />
        </Button>
        <Button
          onClick={() => {
            onOpenUpdate();
            getElementId(item.id);
          }}
        >
          <RepeatIcon />
        </Button>
        <Button
          onClick={() => {
            onOpenPatch();
            getElementId(item.id);
          }}
        >
          <TriangleDownIcon />
        </Button>
        <Button margin="10px" onClick={() => runElement(item.id)} >
          <StarIcon />
        </Button>
      </Box>
    </SimpleGrid>
  ));

  const getElementId = async (id) => {
    setElemId(id)
    const response = await axios.get(`http://localhost:8080/chicken/${id}`);
    setIsRunningDb(response.data.isRunning);
    setChickenElem(response.data);
  };

  const handleClick = async () => {
    const data = {
      name: name,
      birthday: startDate,
      weight: Number(weight),
      steps: Number(steps),
      isRunning: isRunning,
    };
    await axios.post("http://localhost:8080/chicken", data);
    window.location.reload();
  };

  const updateComponent = async (id) => {
    const data = {
      name: name,
      birthday: startDate,
      weight: Number(weight),
      steps: Number(steps),
      isRunning: isRunningDb,
    };
    await axios.put(`http://localhost:8080/chicken/${id}`, data);
    window.location.reload();
  };

  const patchComponent = async (id) => {
    const data = {
      name: name,
      birthday: startDate,
      weight: Number(weight),
      steps: Number(steps),
      isRunning: isRunningDb,
    };
    await axios.patch(`http://localhost:8080/chicken/${id}`, data);
    window.location.reload();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Button onClick={onOpen} padding='10px'>Create Chicken</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
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
                  placeholder="Name"
                  onChange={(name) => setName(name.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Weight</FormLabel>
                <Input
                  placeholder="Weight"
                  onChange={(weight) => setWeight(weight.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Steps</FormLabel>
                <Input
                  placeholder="Steps"
                  onChange={(steps) => setSteps(steps.target.value)}
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
                  handleClick();
                  onClose();
                }}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpenUpdate}
          onClose={onCloseUpdate}
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
                  placeholder={chickenElem ? chickenElem.name : ''}
                  onChange={(name) => setName(name.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={chickenElem ? new Date(chickenElem.birthday) : null}
                  onChange={(date) => setStartDate(date)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Weight</FormLabel>
                <Input
                  placeholder={chickenElem ? chickenElem.weight: ''}
                  onChange={(weight) => setWeight(weight.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Steps</FormLabel>
                <Input
                  placeholder={chickenElem ? chickenElem.steps: ''}
                  onChange={(steps) => setSteps(steps.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>isRunning</FormLabel>
                <Switch onChange={() => setIsRunningDb(!isRunningDb)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  updateComponent(elemId);
                  onCloseUpdate();
                }}
              >
                Save
              </Button>
              <Button onClick={onCloseUpdate}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpenPatch}
          onClose={onClosePatch}
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
                  placeholder={chickenElem ? chickenElem.name : ''}
                  onChange={(name) => setName(name.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={chickenElem ? new Date(chickenElem.birthday) : null}
                  onChange={(date) => setStartDate(date)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Weight</FormLabel>
                <Input
                  placeholder={chickenElem ? chickenElem.weight: ''}
                  onChange={(weight) => setWeight(weight.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Steps</FormLabel>
                <Input
                  placeholder={chickenElem ? chickenElem.steps: ''}
                  onChange={(steps) => setSteps(steps.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>isRunning</FormLabel>
                <Switch isChecked={isRunningDb ? true : false}  onChange={() => setIsRunningDb(!isRunningDb)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  patchComponent(elemId);
                  onClosePatch();
                }}
              >
                Save
              </Button>
              <Button onClick={onClosePatch}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Text padding='10px'>Name | Date | Weight | steps | isRunning</Text>
        <ul>{listItems}</ul>
      </Box>
    </ChakraProvider>
  );
}

export default App;
