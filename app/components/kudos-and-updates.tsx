import {
  Accordion,
  Box,
  List,
  Modal,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { IWeeklyUpdate } from "../interfaces/weekly-update.interface";
import { greenHexCode } from "../constants";
import { ScrollArea } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IKudos } from "../interfaces/kudos.interface";

export const KudosAndUpdates: React.FC<{
  weeklyUpdate: IWeeklyUpdate;
}> = ({ weeklyUpdate }) => {
  const kudos = weeklyUpdate.kudos;

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedKudos, setSelectedKudos] = useState<IKudos>();

  return (
    <>
      <Modal opened={opened} onClose={close} title={selectedKudos?.kudosTitle} size="70%">
        <Textarea autosize>{selectedKudos?.kudosText}</Textarea>
      </Modal>
      <Box h={"100%"} w={"100%"}>
        <h2 style={{ marginTop: 0 }}>Kudos and Success Stories</h2>{" "}
        <List
          spacing="md"
          size="lg"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
        >
          {kudos.map((kudos, index) => {
            return (
              <List.Item
                key={index}
                onClick={() => {
                  setSelectedKudos(kudos);
                  open();
                }}
                style={{cursor: "pointer"}}
              >
                <u>{kudos.kudosTitle}</u>
              </List.Item>
            );
          })}
        </List>
      </Box>
    </>
  );
};
