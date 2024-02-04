import axios from 'axios';

const accountBaseUrl = 'http://localhost:8000/account-opening';

const apiHelper = async (function_: any) => {
  try {
    const { data } = await function_;
    return data;
  } catch (error: any) {
    if (error.toJSON() && !error.toJSON().status) {
      // throw "Network error!";
    } else if (error?.response) {
      // throw error?.response?.data?.error;
    } else if (error?.request) {
      // throw "Request not processed!";
    } else {
      // throw error.message;
    }
  }
};

export const loginService = (data: any) =>
  apiHelper(
    axios.post('http://localhost:8000/account-opening/authenticate', data)
  );

export const branchService = (data: any) =>
  apiHelper(
    axios.get('http://localhost:8000/account-opening/get-branches', {})
  );

export const checkBVNService = (data: any) =>
  apiHelper(
    axios.get(
      `${accountBaseUrl}/account-availability-by-bvn?bvn=${data.bvn}&sapId=${data.sap}`
    )
  );

export const verifyBVNService = (data: any) =>
  apiHelper(
    axios.get(
      `${accountBaseUrl}/get-bvn-details?bvn=${data.bvn}&sapId=${data.sap}`
    )
  );

export const verifyIDService = (data: any) =>
  apiHelper(
    axios.post('https://appsgw.stanbicibtc.com:4443/smileidentity/verify', data)
  );

export const verifyIDServiceBackup = (data: any) =>
  apiHelper(
    axios.post(
      'https://appsgw.stanbicibtc.com:4443/uat/redbox/services/identity/verify',
      data
    )
  );

export const employmentStatusService = (data: any) =>
  apiHelper(axios.get(`${accountBaseUrl}/get-employment-status`));
export const occupationsService = (data: any) =>
  apiHelper(axios.get(`${accountBaseUrl}/get-occupation`));

export const rmAgentsService = () =>
  apiHelper(
    axios.get(
      'https://appsgw.stanbicibtc.com:4443/account-opening-requests/getAllAgents'
    )
  );
export const createTierOneService = (data: any) =>
  apiHelper(axios.post(`http://localhost:8000/account-opening/tier-one`));
export const createTierThreeService = (data: any) =>
  apiHelper(axios.post(`http://localhost:8000/account-opening/tier-three`));

export const sendOTPService = (data: any) =>
  apiHelper(
    axios.post(
      'https://appsgw.stanbicibtc.com:4443/account-opening-requests/send_otp',
      data
    )
  );

export const verifyOTPService = (data: any) =>
  apiHelper(
    axios.post(
      'https://appsgw.stanbicibtc.com:4443/account-opening-requests/verify_otp',
      data
    )
  );

export const getSuccessAccounts = (data: any) =>
  apiHelper(
    axios.get(
      `http://localhost:8000/account-opening/get-successful-accounts?sapId=${data.username}`
    )
  );

export const getPendingAccounts = (data: any) =>
  apiHelper(
    axios.get(
      `http://localhost:8000/account-opening/get-pending-accounts?sapId=${data.username}`
    )
  );

export const getFailedAccounts = (data: any) =>
  apiHelper(
    axios.get(
      `http://localhost:8000/account-opening/get-failed-accounts?sapId=${data.username}`
    )
  );

export const sendOTPToCustomers = (data: object) =>
  apiHelper(
    axios.post(
      'https://appsgw.stanbicibtc.com:4443/uat/redbox/services/request-manager',
      data
    )
  );

export const validateOTP = (data: object) =>
  apiHelper(
    axios.post(
      'https://appsgw.stanbicibtc.com:4443/uat/redbox/services/request-manager',
      data
    )
  );

export const postCustomersConsent = (data: any) =>
  apiHelper(
    axios.post(
      'https://appsgw.stanbicibtc.com:4443/uat/redbox/services/api/consent/lead-consent/create',
      data
    )
  );

export const getCustomersConsentStatusService = () =>
  apiHelper(
    axios.get(
      'https://appsgw.stanbicibtc.com:4443/uat/redbox/services/api/consent/lead-consent/by-code/024'
    )
  );
