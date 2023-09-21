import { Accordion, Box, Text } from "@mantine/core";
import { IWeeklyUpdate } from "../interfaces/weekly-update.interface";
import { greenHexCode } from "../constants";
import { ScrollArea } from "@mantine/core";

export const KudosAndUpdates: React.FC<{
  weeklyUpdate: IWeeklyUpdate;
}> = ({ weeklyUpdate }) => {
  const kudos = weeklyUpdate.kudos;

  return (
    <Box h={"100%"} w={"100%"}>
      <h2 style={{ marginTop: 0 }}>Kudos and Success Stories</h2>{" "}
      <Accordion style={{ width: "100%" }}>
        {kudos.map((kudos) => {
          return (
            <Accordion.Item value={"test"}>
              <Accordion.Control>
                <Text
                  variant="gradient"
                  ta="center"
                  fz="xl"
                  fw={700}
                  gradient={{ from: "green", to: "cyan", deg: 45 }}
                >
                  {kudos.kudosTitle}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <ScrollArea type="auto" h={250}>{kudos.kudosText}</ScrollArea>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Box>
  );
  //   return (
  //     <Accordion>

  //         <Accordion.Panel>
  //           <Accordion.Item value="kudos">
  //             <Accordion.Control>Kudos</Accordion.Control>
  //             {/* {kudos?.length > 0 && (<></>
  //             <b>Kudos received</b>
  //             <br />
  //             {kudos.map((kudos) => (
  //               <>
  //                 {kudos}
  //                 <br />
  //               </>
  //             ))}
  //             )} */}
  //             </Accordion.Item>
  //           </Accordion.Panel>
  //     </Accordion>
  //   );
};
