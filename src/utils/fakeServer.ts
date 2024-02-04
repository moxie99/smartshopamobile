type Path = "/details";
export type Details = {
  bvn?: string;
  customerName?: string;
  screeningStatus?: string;
  screeningStatusOutcome: string;
  requestDate: string;
  isOpened: boolean;
  accountNumber: string;
  wasTerminated: boolean;
  numberSent: boolean;
};
const details: Details[] = [
  {
    accountNumber: "00545665454",
    bvn: "22210978646798",
    customerName: "ADESUWA IDIAKHEOWA AGBI",
    isOpened: false,
    numberSent: false,
    requestDate: "22-01-10",
    screeningStatus: "Incomplete",
    screeningStatusOutcome: "Failed",
    wasTerminated: false,
  },
  {
    accountNumber: "00545662454",
    bvn: "22210978646798",
    customerName: "ROLLINGS ANN",
    isOpened: true,
    numberSent: true,
    requestDate: "22-04-14",
    screeningStatus: "Completed",
    screeningStatusOutcome: "Passed",
    wasTerminated: false,
  },
  {
    accountNumber: "34545662454",
    bvn: "22900978646798",
    customerName: "JOHN BOSCO ADE",
    isOpened: true,
    numberSent: false,
    requestDate: "22-04-14",
    screeningStatus: "Completed",
    screeningStatusOutcome: "Passed",
    wasTerminated: false,
  },
  {
    accountNumber: "00545662454",
    bvn: "2221098996798",
    customerName: "ABRAHAM LIONEL",
    isOpened: true,
    numberSent: true,
    requestDate: "22-04-14",
    screeningStatus: "Completed",
    screeningStatusOutcome: "Passed",
    wasTerminated: true,
  },
];
const nill = undefined;

export const fakeServer = {
  get: async (path: Path): Promise<Details[] | undefined> => {
    switch (path) {
      case "/details":
        return new Promise((resolve) => {
          setTimeout(() => resolve(details), 2000);
        });
      default:
        return nill;
    }
  },
};
