"use client";
import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Table,
  useMantineTheme,
  Text,
  Box,
  Blockquote,
  Grid,
  ColProps,
  Collapse,
  Button,
  Card,
} from "@mantine/core";
import { IProjectStatusUpdate } from "./interfaces/project-status-update.interface";
import {ProjectMetricsTable} from "./components/project-metrics-table";
import { useState } from "react";
import RadialMetricsTable from "./components/radial-metrics-breakdown";
import {BarGraphBreakdown} from "./components/bar-graph-breakdown";
import { DateInput } from "@mantine/dates";
import {
  grayHexCode,
  grayTextHexCode,
  greenHexCode,
  weeklyUpdates,
} from "./constants";
import { useDisclosure } from "@mantine/hooks";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "autoprefixer";
import { HealthOverTimeGraph } from "./components/health-over-time-graph";
import { KudosAndUpdates } from "./components/kudos-and-updates";

function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

type pages = "EAS Projects Dashboard" | "Project Health Timeline";

/**
 * Escalation metric status:
 *  Green if no issues reported. *
 */
/** TODO: Change to use router and sync to url */
export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [dashboardName, setDashboardName] = useState("EAS Projects Dashboard");

  const currentWeeklyUpdate = weeklyUpdates[0];
  const projectStatuses: IProjectStatusUpdate[] =
    currentWeeklyUpdate.projectUpdates;
  const kudos = currentWeeklyUpdate.kudos;

  const [statusUpdatesOpened, { toggle }] = useDisclosure(false);
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(true);

  const [currentPage, setCurrentPage] = useState<pages>(
    "EAS Projects Dashboard"
  );

  return (
    <SafeHydrate>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Dashboards</Text>
            <Button
              variant="outline"
              color="green"
              onClick={() => setCurrentPage("EAS Projects Dashboard")}
            >
              EAS Projects Dashboard
            </Button>
            <Text mt="lg">Timelines</Text>
            <Button
              variant="outline"
              color="green"
              onClick={() => setCurrentPage("Project Health Timeline")}
            >
              Projects Timelines
            </Button>
          </Navbar>
        }
        // aside={
        //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        //         <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //             <Text>Application sidebar</Text>
        //         </Aside>
        //     </MediaQuery>
        // }
        // footer={
        //     <Footer height={60} p="md">
        //         Application footer
        //     </Footer>
        // }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                style={{ height: "38px" }}
                src="/usda-symbol.svg"
                alt="USDA Logo"
              />
              <Text ml={10} sx={{ fontSize: "1.5rem" }}>
                EAS Project Monitoring System
              </Text>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
            </div>
          </Header>
        }
      >
        {currentPage === "EAS Projects Dashboard" && (
          <>
            <Box mb={'sm'} style={{display: 'flex', alignItems: 'center'}}>
              <h1 style={{ marginBottom: "5px", marginTop: 0 }}>
                {dashboardName}
              </h1>
              <DateInput
                ml="auto"
                valueFormat="YYYY MMM DD"
                label="Dashboard Date"
                placeholder="Latest Data before this date"
              />
            </Box>
            <Grid>
              <Grid.Col span={12} md={4} style={{ display: "block" }}>
                <Card style={{ height: "100%" }} shadow="lg" mx="auto">
                  <Box sx={{ display: "flex" }}>
                    <h2 style={{marginTop: 0}}>Program health</h2>
                  </Box>
                  <BarGraphBreakdown weeklyUpdate={weeklyUpdates[0]} />
                </Card>
              </Grid.Col>
              <Grid.Col span={12} md={4}>
                <Card style={{ display: "flex", height: '100%' }} shadow="lg" mx="auto">
                  <Box mx="auto">
                    <h2 style={{marginTop: 0}}>Projects by overall health</h2>
                    <RadialMetricsTable weeklyUpdate={weeklyUpdates[0]}/>
                  </Box>
                </Card>
              </Grid.Col>
              <Grid.Col span={12} md={4}>
                <Card style={{ display: "flex", height: '100%' }} shadow="lg" mx="auto">
                  <KudosAndUpdates weeklyUpdate={weeklyUpdates[0]} />
                </Card>
              </Grid.Col>
            </Grid>

            <Card style={{ marginTop: "1rem" }} shadow="lg">
              <div>
                <Collapse in={statusUpdatesOpened}>
                  <Grid mt="md">
                    
                    {projectStatuses
                      .filter(
                        (statusUpdate) =>
                          statusUpdate.projectUpdateNotes !== undefined
                      )
                      .map((statusUpdate) => (
                        <Grid.Col
                          key={statusUpdate.projectId}
                          span={12}
                          md={6}
                          xl={4}
                        >
                          <Blockquote
                            style={{ border: `2px solid ${grayHexCode}` }}
                          >
                            <b>{statusUpdate.projectName}</b> (
                            {statusUpdate.programName})
                            <br />
                            {statusUpdate.projectUpdateNotes}
                          </Blockquote>
                        </Grid.Col>
                      ))}
                  </Grid>
                </Collapse>
              </div>
              <h2 style={{marginTop: 0}}>Metrics Breakdown</h2>
              <ProjectMetricsTable weeklyUpdate={weeklyUpdates[0]} />
            </Card>
          </>
        )}
        {currentPage === "Project Health Timeline" && <HealthOverTimeGraph />}
      </AppShell>
    </SafeHydrate>
  );
}
