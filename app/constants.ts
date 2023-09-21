import { data_09_01_2023 } from "./data_09_01_2023";
import { data_09_08_2023 } from "./data_09_08_2023";
import { data_09_15_2023 } from "./data_09_15_2023";
import { IMetricStatusLiteral } from "./interfaces/metric-status.interface";
import { IProjectStatusOverTime } from "./interfaces/project-status-over-time.interface";
import {
  IProjectStatusUpdate,
  ISubMetricsLiteral,
} from "./interfaces/project-status-update.interface";
import { IStatusCounts } from "./interfaces/status-counts.interface";
import { IWeeklyUpdate } from "./interfaces/weekly-update.interface";

// Colors:
export const redHexCode = "#D75553";
export const yellowHexCode = "#F68D4B";
export const yellowHexCodeText = "#F68D4B";
export const greenHexCode = "#5EBC58";
export const grayHexCode = "#D3D3D3";
export const grayTextHexCode = "#3D3D3D";

export const colorToHexCodeMap: { [key in IMetricStatusLiteral]: string } = {
  Green: greenHexCode,
  Yellow: yellowHexCode,
  Red: redHexCode,
};

export const metricToSortLevelMap: { [key in IMetricStatusLiteral]: number } = {
  Green: 30,
  Yellow: 20,
  Red: 10,
};


export const metricKeyToDisplayNameMap: {
  [key in ISubMetricsLiteral]: string;
} = {
  agileMetricStatus: "Agile",
  escalationMetricStatus: "Risk",
  modernizationMetricStatus: "Tech",
  staffingMetricStatus: "Staff",
};

const oneWeekAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 7);
export const testProjectTimelineRaw: {
  updateDate: Date;
  statusUpdates: IProjectStatusUpdate[];
}[] = [
  {
    updateDate: new Date(),
    statusUpdates: [
      {
        projectId: "1",
        projectName: "FEMA CIS",
        programName: "FEMA",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Yellow",
        overallStatus: "Yellow",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
        projectUpdateNotes:
          "UAT kickoff successful. Over 40 concurrent users in system without performance issue",
      },
      {
        projectId: "2",
        projectName: "WFDSS",
        programName: "Forest Service",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Yellow",
        overallStatus: "Yellow",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "3",
        projectName: "PSAS",
        programName: "USDA",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Yellow",
        escalationMetricStatus: "Green",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "4",
        projectName: "SUDS",
        programName: "Forest Service",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "5",
        projectName: "ACWS Example #1",
        programName: "ACWS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "6",
        projectName: "CON-IT Example #1",
        programName: "CON-IT",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },

      {
        projectId: "7",
        projectName: "CONEXUS Example #1",
        programName: "GSA CONEXUS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Red",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Yellow",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "8",
        projectName: "NSOBS Example #1",
        programName: "GSA NSOBS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Yellow",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "9",
        projectName: "VMDI",
        programName: "Infrastructure",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "10",
        projectName: "Jira",
        programName: "Infrastructure",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "11",
        projectName: "Bamboo",
        programName: "Infrastructure",
        agileMetricStatus: "Yellow",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Yellow",
        overallStatus: "Yellow",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "12",
        projectName: "BitBucket",
        programName: "Infrastructure",
        agileMetricStatus: "Red",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "13",
        projectName: "Example Infra project",
        programName: "Infrastructure",
        agileMetricStatus: "Red",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Red",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "14",
        projectName: "ACWS Example #2",
        programName: "ACWS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
    ],
  },
  {
    updateDate: oneWeekAgo,
    statusUpdates: [
      {
        projectId: "1",
        projectName: "FEMA CIS",
        programName: "FEMA",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Yellow",
        overallStatus: "Yellow",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
        projectUpdateNotes:
          "UAT kickoff successful. Over 40 concurrent users in system without performance issue",
      },
      {
        projectId: "2",
        projectName: "WFDSS",
        programName: "Forest Service",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Yellow",
        overallStatus: "Yellow",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "3",
        projectName: "PSAS",
        programName: "USDA",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Yellow",
        escalationMetricStatus: "Green",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "4",
        projectName: "SUDS",
        programName: "Forest Service",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "5",
        projectName: "ACWS Example #1",
        programName: "ACWS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "6",
        projectName: "CON-IT Example #1",
        programName: "CON-IT",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },

      {
        projectId: "7",
        projectName: "CONEXUS Example #1",
        programName: "GSA CONEXUS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Red",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Yellow",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "8",
        projectName: "NSOBS Example #1",
        programName: "GSA NSOBS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Yellow",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "9",
        projectName: "VMDI",
        programName: "Infrastructure",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "10",
        projectName: "Jira",
        programName: "Infrastructure",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "11",
        projectName: "Bamboo",
        programName: "Infrastructure",
        agileMetricStatus: "Yellow",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Yellow",
        overallStatus: "Yellow",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "12",
        projectName: "BitBucket",
        programName: "Infrastructure",
        agileMetricStatus: "Red",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "13",
        projectName: "Example Infra project",
        programName: "Infrastructure",
        agileMetricStatus: "Red",
        staffingMetricStatus: "Green",
        modernizationMetricStatus: "Green",
        escalationMetricStatus: "Red",
        overallStatus: "Green",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
      {
        projectId: "14",
        projectName: "ACWS Example #2",
        programName: "ACWS",
        agileMetricStatus: "Green",
        staffingMetricStatus: "Yellow",
        modernizationMetricStatus: "Red",
        escalationMetricStatus: "Red",
        overallStatus: "Red",
        dateOfLastMetricStatusUpdate: new Date(),
        contact: "no-reply@usda.gov",
      },
    ],
  },
];

// TODO: Replace testproject timeline raw with following:
// This is the main piece of app data
export const weeklyUpdates: IWeeklyUpdate[] = [
  {
    dateOfUpdate: new Date('2023/09/01'),
    kudos: [{
      kudosTitle: "Success Story - Budget Line of Business Migration",
      kudosText: `Update on the Budget Line of Business (27 partner agency users) migration - we're in Production!  

      A successful migration begins months in advance, ending with several days of long hours to achieve Production status.  From a Complex Solutions perspective, we continue to have the right people from various teams (across OMB and DISC) assisting us every step of the way.  Even through another migration weekend, we knew we always had the ‘phone a friend’ option if we needed it.  With everyone’s willingness to support the success of the MAX transition, we have yet again achieved a monumental challenge.
      
      A lot, if not all of us, may feel that it is merely part of our job to remain at the table; meaning, 'what is there to be surprised at?'  It really is the acknowledgement of true teamwork and how amazing that feels when it comes time to celebrate our accomplishments.  We’ve had challenging moments along the way, but we got through them with a great sense of humor - Brady Bunch video calls with so many coffee mugs, cats/dogs, and fun t-shirts on display.
      
      I’m sure that there are others not on this thread that have contributed to the cause; the group think that happens across the teams.  Please forward this note of thanks!  We will figure out a way to celebrate this initiative shortly after the November migration is complete, a time when we can slow down and really have some fun.
      
      Seriously though, it’s a pleasure to have you all at the table.  I’m not saying this because there’s more work to come!  Truly, it’s about the teamwork.
      
      Enjoy a fabulous week ahead,
      `},{
        kudosTitle: "Kudos to Conexus for ICAM Launch",
        kudosText: "Conexus successfully conducted a coordinated release of ICAM’s launch of Login.gov on 9/11/2023."
      },
      {
        kudosTitle: "Kudos to Whitney Hubbard for tracking budget projections",
        kudosText: "Whitney Hubbard, Business Management team for tracking projections for the application development business line. A $60M budget came in under 1%."
      }],
    projectUpdates: data_09_01_2023,
  },
  {
    dateOfUpdate: new Date('2023/09/08'),
    kudos: [],
    projectUpdates: data_09_08_2023,
  },
  {
    dateOfUpdate: new Date('2023/09/15'),
    kudos: [],
    projectUpdates: data_09_15_2023,
  },  
];
weeklyUpdates.forEach((update, index) => {
  if(index === 0 && weeklyUpdates.length > 1){
    update.nextWeeklyUpdate = weeklyUpdates[1]
    return
  }

  if(index === weeklyUpdates.length - 1 && weeklyUpdates.length > 1){
    update.previousWeeklyUpdate = weeklyUpdates[index - 1]
    return
  }

  update.nextWeeklyUpdate = weeklyUpdates[index + 1]
  update.previousWeeklyUpdate = weeklyUpdates[index - 1]

})

const defaultCounts: IStatusCounts = {
  Green: 0,
  Yellow: 0,
  Red: 0,
  total: 0,
};

export const projectStatusOverTime: IProjectStatusOverTime[] =
  weeklyUpdates.map((rawData) => ({
    dateOfUpdate: +rawData.dateOfUpdate,
    ...rawData.projectUpdates.reduce<IStatusCounts>(
      (prev, current) => {
        prev[current.overallStatus]++;
        prev.total++;

        return prev;
      },
      { ...defaultCounts }
    ),
  }));
