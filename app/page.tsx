"use client"
import { AppShell, Aside, Burger, Footer, Header, MediaQuery, Navbar, Table, useMantineTheme, Text } from '@mantine/core';
import { IProjectStatusUpdate } from './interfaces/project-status-update.interface';
import ProjectMetricsTable from './components/project-metrics-table';
import { useState } from 'react';
import RadialMetricsTable from './components/radial-metrics-breakdown';

/**
 * Escalation metric status:
 *  Green if no issues reported.
 * @returns Escala
 */
export default function Home() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Text>Application navbar</Text>
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
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
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
            <div>
                <RadialMetricsTable />
            </div>
            <div style={{ marginTop: '3rem' }}>
                <h2>Metrics Breakdown</h2>
                <ProjectMetricsTable />
            </div>
            {/* TODO: Polar grid to break down projects by program, sectors indicate the fraction that is red vs yellow vs green https://recharts.org/en-US/api/PolarGrid */}
        </AppShell>
    );

}