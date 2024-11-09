import React, { useEffect } from "react";
import { taskForStage } from "./OrderService/requestItem";
import { Box, Stepper, Step, Tooltip, StepIndicator, useSteps } from "@chakra-ui/react";
import { FaCheck, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

interface stageLineProps{
    tasks: taskForStage[] | undefined
}

export const StageLine: React.FC<stageLineProps> = ({ tasks }) => {
    useEffect(()=> {
        console.log(tasks)
    })
    
    const { activeStep } = useSteps({
        index: 0
      });

    if (!tasks){
        <></>
    }
    return (
      <Box width="100%" display="flex" justifyContent={{ base: "center", lg: "flex-start" }}>
        <Stepper index={activeStep} size="lg">
          <Box
            display="grid"
            gridTemplateColumns={{ base: "repeat(4, 1fr)", sm: "repeat(6, 1fr)", md: "repeat(8, 1fr)", lg: "repeat(11, 1fr)" }}
            gap="10px"
          >
            {tasks?.map((e, index) => (
              <Step key={index}>
                <Tooltip label={e.key} placement="top">
                  <Box
                    as="span"
                    fontSize="sm"
                    fontWeight="bold"
                    padding="10px"
                    minWidth="40px"
                    minHeight="40px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="full"
                    backgroundColor={e.value ? "green.500" : "blue.500"}
                    color="white"
                    cursor="pointer"
                    _hover={e.value ? { backgroundColor: "green.300" } : { backgroundColor: "blue.300" }}
                  >
                    {e.value ? <FaCheck /> : <FaRegCircle />}
                  </Box>
                </Tooltip>
              </Step>
            ))}
          </Box>
        </Stepper>
      </Box>
    );
    
}
