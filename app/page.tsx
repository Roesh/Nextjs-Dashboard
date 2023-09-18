"use client"
import { AppShell, Aside, Burger, Footer, Header, MediaQuery, Navbar, Table, useMantineTheme, Text } from '@mantine/core';
import { IProjectStatusUpdate } from './interfaces/project-status-update.interface';
import ProjectMetricsTable from './components/project-metrics-table';
import { useState } from 'react';
import RadialMetricsTable from './components/radial-metrics-breakdown';
import BarGraphBreakdown from './components/bar-graph-breakdown';

function SafeHydrate({ children }: any) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

/**
 * Escalation metric status:
 *  Green if no issues reported. * 
 */
/** TODO: Change to use router and sync to url */
export default function Home() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [dashboardName, setDashboardName] = useState('EAS Projects Dashboard')

    return (
        <SafeHydrate>
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
                        <Text>EAS Projects Dashboard</Text>
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
                            <img style={{height: '38px'}} src="/usda-symbol.svg" alt="USDA Logo"/>
                            <Text ml={10} sx={{fontSize: '1.5rem', }}>EAS Project Monitoring System</Text>
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
                <h1>{dashboardName}</h1>
                <div style={{ display: 'flex' }}>
                    <div>
                        <h2>Projects by overall health</h2>
                        <RadialMetricsTable />
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <h2>Program health breakdown</h2>
                        <BarGraphBreakdown />
                    </div>
                </div>
                <div style={{ marginTop: '3rem' }}>
                    <h2>Metrics Breakdown</h2>
                    <ProjectMetricsTable />
                </div>
                {/* TODO: Polar grid to break down projects by program, sectors indicate the fraction that is red vs yellow vs green https://recharts.org/en-US/api/PolarGrid */}
            </AppShell>
        </SafeHydrate>
    );

}