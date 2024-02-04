import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
// @ts-ignore
import { QueryClient, useMutation, useQuery } from 'react-query';

import { states } from '../constants/states';
import { resetNavigation } from '../navigation/ResetNavigator';
import {
  branchService,
  checkBVNService,
  createTierOneService,
  createTierThreeService,
  employmentStatusService,
  getCustomersConsentStatusService,
  getFailedAccounts,
  getPendingAccounts,
  getSuccessAccounts,
  loginService,
  occupationsService,
  postCustomersConsent,
  rmAgentsService,
  sendOTPService,
  verifyBVNService,
  verifyIDService,
  verifyIDServiceBackup,
  verifyOTPService,
} from '../services/services';
import {
  checkCardExpiryStatus,
  formatDateOfBirth,
  showToast,
} from '../utils/helpers';

import useStore from '../store/useStore';

const queryClient = new QueryClient();

function isDateLessThan18YearsAgo(inputDate: string): boolean {
  const givenDate = new Date(inputDate);
  const today = new Date();
  const yearsDifference =
    (today.getTime() - givenDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const result = !(yearsDifference < 18);
  return result;
}

const maritalStatusCodes: any = {
  Divorced: '004',
  'Live-In Relationship': '009',
  Married: '002',
  'Not Given': '008',
  Separated: '003',
  Single: '001',
  Widow: '005',
  Widowed: '005',
};

const idCodes = {};
export const useLogin = () => {
  const { setUserData, setAccountOpeningData, accountOpeningData } = useStore(
    (state) => state
  );
  const mutation = useMutation((payload) => loginService(payload), {
    onError: (error, payload) => {
      resetNavigation('HomeScreen');
    },
    onSuccess: async (res, payload: any) => {
      if (res?.data) {
        setUserData({ token: res?.data, username: payload?.sapIdOrEmail });
        resetNavigation('HomeScreen');
      } else {
        showToast({
          message:
            'Incorrect username or password, kindly enter your staff ID and system password',
          type: 'danger',
        });
        return false;
      }
    },
  });

  const { isLoading, error, data, reset } = mutation;

  function capitalizeFirstLetter(inputString: string) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  const handleLogin = async (value: any) => {
    const sentSapID = capitalizeFirstLetter(value?.sapid);

    // const payload: any = {
    //   hashedPassword: base64.encode(value?.password),
    //   sapId: sentSapID,
    // };

    const payload: any = {
      password: value?.password,
      sapIdOrEmail: sentSapID,
    };
    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  return { data, error, handleLogin, isLoading, reset };
};

export const useCheckBVN = () => {
  const { handleVerifyBVN } = useVerifyBVN();
  const { accountOpeningData, userData } = useStore((state) => state);
  const navigation = useNavigation();
  const mutation = useMutation((payload) => checkBVNService(payload), {
    onError: (error, payload) => {
      showToast({
        message: 'Request on BVN cannot be completed right now',
        type: 'danger',
      });
    },
    onSuccess: async (res, payload: any) => {
      if (res?.responseCode === '000') {
        if (res?.content?.cif) {
          showToast({ message: 'An account exist already', type: 'danger' });
        } else {
          await handleVerifyBVN({
            bvn: accountOpeningData?.bvn,
            sap: userData.username,
            token: userData.token,
          });
        }
      } else {
        showToast({ message: res?.content, type: 'danger' });
      }
    },
  });
  const { error, data, reset } = mutation;
  const isLoadingCheckBVN = mutation.isLoading;

  const handleCheckBVN = async (value: any) => {
    if (!accountOpeningData?.accountType) {
      return showToast({ message: 'Select account tier', type: 'danger' });
    }

    // if (
    //   accountOpeningData?.accountType === "Tier One" &&
    //   !accountOpeningData?.schemename
    // ) {
    //   return showToast({ message: "Select account type", type: "danger" });
    // }

    if (!value) {
      return showToast({ message: 'Enter bvn', type: 'danger' });
    }
    if (!accountOpeningData?.bankBranch) {
      return showToast({ message: 'Select a branch name', type: 'danger' });
    }
    if (value?.bvn?.length !== 11) {
      return showToast({
        message: 'Bvn must be 11 characters',
        type: 'danger',
      });
    }
    if (accountOpeningData.accountType === 'Tier Three') {
      // if(!accountOpeningData?.requiredDocuments?.identityType) {
      //     return showToast('Select identity type')
      // }
      // if(!accountOpeningData?.idNumber) {
      //     return showToast('Enter id number')
      // }
      // if(!accountOpeningData?.idIssueDate) {
      //     return showToast('Select id issue date')
      // }

      // if (
      //   (accountOpeningData?.currencyCode === "EUR" ||
      //     accountOpeningData?.currencyCode === "USD" ||
      //     accountOpeningData?.currencyCode === "GBP") &&
      //   !accountOpeningData?.cashInflow
      // ) {
      //   return showToast({
      //     message: "Select cash only or inflow",
      //     type: "danger",
      //   });
      // }

      if (!accountOpeningData?.schemeCode) {
        return showToast({ message: 'Account type', type: 'danger' });
      }

      if (!accountOpeningData?.subSegment) {
        return showToast({ message: 'Select sub segment', type: 'danger' });
      }
      if (
        accountOpeningData?.currencyCode === 'EUR' ||
        accountOpeningData?.currencyCode === 'USD' ||
        accountOpeningData?.currencyCode === 'GBP'
      ) {
        if (!accountOpeningData?.cumulativeBalance) {
          return showToast({
            message: 'Enter Cumulative Balance',
            type: 'danger',
          });
        }
        if (!accountOpeningData?.fxSource) {
          return showToast({ message: 'Source Of Fx', type: 'danger' });
        }
        if (!accountOpeningData?.accountPurpose) {
          return showToast({
            message: 'Enter purpose of account',
            type: 'danger',
          });
        }
      }
      // if(!accountOpeningData?.rnAgent) {
      //     return showToast('Select customer relationship manager')
      // }
    }
    // if(!accountOpeningData?.soL_Id) {
    //     return showToast('Select Branch')
    // }

    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(value);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };
  return { data, error, handleCheckBVN, isLoadingCheckBVN, reset };
};

export const useVerifyBVN = () => {
  const { setAccountOpeningData, accountOpeningData, setBvnData, userData } =
    useStore((state) => state);
  const navigation = useNavigation();
  const { handleSendOTP, handleSentOTPTOUsers } = useSendOTP();
  const { handleCustomerConsent } = useCustomerConsent();
  const mutation = useMutation((payload) => verifyBVNService(payload), {
    onError: (error, payload) => {
      showToast({
        message:
          'Request could not be completed at the moment, please try again.',
        type: 'danger',
      });
    },
    onSuccess: async (res, payload) => {
      const customerAge = res?.data?.dateOfBirth;
      const isCustAgeLessThan18YearsAgo1 =
        isDateLessThan18YearsAgo(customerAge);
      if (!isCustAgeLessThan18YearsAgo1) {
        return showToast({
          message: 'Customer cannot be a minor - below 18 years',
          type: 'danger',
        });
      }
      if (res?.responseCode === '00') {
        const set = new Set([
          res?.data?.phoneNumber,
          res?.data?.phoneNumber1,
          res?.data?.phoneNumber2,
        ]);
        const newArray = [...set].filter(Boolean);
        setBvnData(res?.data);

        if (newArray?.length > 1) {
          setAccountOpeningData({
            ...accountOpeningData,
            ...res?.data,
            accountType: accountOpeningData.accountType,
            arrayPhoneKeys: newArray,
            bnvStatus: 'success',
            phoneModal: true,
          });
        } else {
          setAccountOpeningData({
            ...accountOpeningData,
            ...res?.data,
            accountType: accountOpeningData.accountType,
            bnvStatus: 'success',
            phoneToSendOtp: newArray[0],
          });
          handleSentOTPTOUsers(res?.data);
        }
      } else {
        showToast({ message: 'Invalid BVN Number', type: 'danger' });
        // setAccountOpeningData({...accountOpeningData, ...res?.data, bnvStatus: 'success', phoneModal: true, accountType: accountOpeningData.accountType, arrayPhoneKeys: ['07032838024']})
      }
    },
  });
  const { isLoading, error, data, reset } = mutation;

  const handleVerifyBVN = async (value: any) => {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      mutation.mutate(value);
    } else {
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  return { data, error, handleVerifyBVN, isLoading, reset };
};

export const useVerifyID = () => {
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );
  const { handleVerifyIDBackup } = useVerifyIDBackUp();
  const navigation = useNavigation();
  const mutation = useMutation((payload) => verifyIDService(payload), {
    onError: (error, payload) => {
      showToast({
        message:
          'ID validation service is temporarily unavailable. Please try again later.',
        type: 'danger',
      });
      handleVerifyIDBackup();
    },
    onSuccess: async (res, payload) => {
      if (res?.IsFinalResult) {
        const data = res?.FullData;

        let result = true;
        const firstNameID = data?.FirstName?.trim()
          ? data?.FirstName?.trim()
          : data?.firstName?.trim()
          ? data?.firstName?.trim()
          : data?.firstname?.trim();
        const lastNameID = data?.LastName?.trim()
          ? data?.LastName?.trim()
          : data?.lastName?.trim()
          ? data?.lastName?.trim()
          : data?.surname?.trim();
        const DOBID = res?.DOB
          ? res?.DOB
          : data?.dob
          ? data?.dob
          : data?.dateOfBirth;
        const bvnFirstName = accountOpeningData?.firstName?.trim();
        const bvnLastName = accountOpeningData?.lastName?.trim();
        const bvnDOB = moment(accountOpeningData?.dateOfBirth).format(
          'YYYY-MM-DD'
        );
        const firstNameEquality = firstNameID === bvnFirstName;
        const lastNameEquality = lastNameID === bvnLastName;

        const arrayError: { title: string; desc: string }[] = [];
        if (firstNameID !== bvnFirstName) {
          const errorDesc = `First Name on BVN (${bvnFirstName}) does not match First Name on ID (${firstNameID})`;
          arrayError.push({
            desc: errorDesc,
            title: 'First name on BVN does not match First Name on ID card',
          });
          result = false;
        }
        if (lastNameID !== bvnLastName) {
          const errorDesc = `Last Name on BVN (${bvnLastName}) does not match Last Name on ID (${lastNameID})`;
          arrayError.push({
            desc: errorDesc,
            title: 'Last name on BVN does not match Last Name on ID card',
          });
          result = false;
        }

        if (DOBID !== moment(bvnDOB).format('YYYY-MM-DD')) {
          arrayError.push({
            desc: `Date Of Birth on BVN (${moment(bvnDOB).format(
              'YYYY-MM-DD'
            )}) does not match Date Of Birth on ID (${DOBID})`,
            title:
              'Date Of Birth on BVN does not match Date Of Birth on ID card',
          });
          result = false;
        }

        if (res?.ExpirationDate || data?.expiryDate) {
          if (
            checkCardExpiryStatus(res?.ExpirationDate) ===
              'Card has already expired' ||
            checkCardExpiryStatus(data?.expiryDate) ===
              'Card has already expired'
          ) {
            arrayError.push({
              desc: `ID expired on (${moment(
                res?.ExpirationDat ?? data?.expiryDate
              ).format('YYYY-MM-DD')}), and not valid for use.`,
              title: 'ID Card has expired!',
            });
            result = false;
          }
          if (
            checkCardExpiryStatus(res?.ExpirationDate) ===
              'Card will expire in 3 months' ||
            checkCardExpiryStatus(data?.expiryDate) ===
              'Card will expire in 3 months'
          ) {
            arrayError.push({
              desc: `ID will expire on (${moment(
                res?.ExpirationDate ?? data?.expiryDate
              ).format('YYYY-MM-DD')}), and not valid for use.`,
              title: 'ID Card will expire in 3 months!',
            });
            result = false;
          }
        }

        if (!result) {
          setTimeout(() => {
            setAccountOpeningData({
              ...accountOpeningData,
              idDetails: data,
              idValidationError: arrayError,
              isIdError: true,
            });
          }, 500);
        } else {
          setAccountOpeningData({
            ...accountOpeningData,
            idDetails: data,
          });
          setTimeout(() => {
            navigation.navigate('BvnUploadScreen');
            // navigation.navigate("BvnInfoScreen")
          }, 1000);
        }

        // {
        //     "content": {
        //     "consent": false,
        //         "description": "Request Processed Successfully",
        //         "details": {
        //         "birthCountry": "nigeria",
        //             "birthLGA": "Esan West",
        //             "birthState": "Edo",
        //             "businessId": null,
        //             "country": "NG",
        //             "createdAt": "2022-08-24T07:08:35.675+00:00",
        //             "dataValidation": false,
        //             "dateOfBirth": "1988-04-04",
        //             "firstName": "Sarah",
        //             "gender": "female",
        //             "id": null,
        //             "idNumber": "11111111111",
        //             "image": null,
        //             "lastModifiedAt": "2022-08-24T07:08:35.675+00:00",
        //             "lastName": "Doe",
        //             "middleName": "Jane",
        //             "mobile": "08000000000",
        //             "nokState": "Niger",
        //             "religion": "christianity",
        //             "requestedAt": null,
        //             "requestedBy": null,
        //             "selfieValidation": false,
        //             "status": "found",
        //             "type": "nin"
        //     },
        //     "isConsent": false,
        //         "responseCode": "000"
        // },
        //     "error": null,
        //     "isSuccess": true,
        //     "requestId": "",
        //     "responseCode": "000",
        //     "responseTime": "2022-08-24T07:08:34.633867Z"
        // }

        // setTimeout(() => {
        //     navigation.navigate("BvnInfoScreen")
        // }, 500)
        // @ts-ignore
        // const arrayPhoneKeys = Object.keys(payload).filter(k => k.startsWith('phoneNumber'))
        // if(arrayPhoneKeys.length > 1) {
        //     // @ts-ignore
        //     return  setAccountOpeningData({...payload, bnvStatus: 'success', phoneModal: true, accountType: accountOpeningData.accountType, arrayPhoneKeys: arrayPhoneKeys})
        //
        // }
        // // @ts-ignore
        // setAccountOpeningData({...payload, bnvStatus: 'success', accountType: accountOpeningData.accountType, phoneToSendOtp: payload?.phoneNumber})
        // @ts-ignore
        // handleSendOTP({phoneNumber: payload?.phoneNumber})
      } else {
        showToast({
          message:
            JSON.stringify(res) ??
            'ID validation service is temporarily unavailable. Please try again later.',
          type: 'danger',
        });
      }
    },
  });
  const { error, data, reset } = mutation;
  const isLoadingVerifyID = mutation.isLoading;

  const handleVerifyID = async () => {
    const oldDate = accountOpeningData?.dateOfBirth;
    const dateParts = oldDate.split('-');
    const month = dateParts[1];
    const day = dateParts[0];
    const year = dateParts[2];

    function getMonthNumber(month: any) {
      const months = {
        Apr: '04',
        Aug: '08',
        Dec: '12',
        Feb: '02',
        Jan: '01',
        Jul: '07',
        Jun: '06',
        Mar: '03',
        May: '05',
        Nov: '11',
        Oct: '10',
        Sep: '09',
      };

      return months[month];
    }

    const newDate = `${year}-${getMonthNumber(month)}-${day}`;
    const payload: any = {
      channel: 'MOBILE_APP',
      country: 'NG',
      dob: newDate,
      // processingOfficer: accountOpeningData?.rnAgentId,
      firstName: accountOpeningData?.firstName,

      idNumber: accountOpeningData?.idNumber,

      idType:
        accountOpeningData?.requiredDocuments?.identityType === 'NIN'
          ? 'NIN'
          : accountOpeningData?.requiredDocuments?.identityType === 'Voter ID'
          ? 'VOTER_ID'
          : accountOpeningData?.requiredDocuments?.identityType ===
            'Drivers Licence'
          ? 'DRIVERS_LICENSE'
          : accountOpeningData?.requiredDocuments?.identityType === 'V NIN'
          ? 'V_NIN'
          : accountOpeningData?.requiredDocuments?.identityType,

      lastName: accountOpeningData?.lastName,
      // lastNameOnId: accountOpeningData?.lastName,
      moduleId: 'QTIxMjY2MTow',
    };

    // @ts-ignore

    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  return { data, error, handleVerifyID, isLoadingVerifyID, reset };
};

export const useVerifyIDBackUp = () => {
  const { setAccountOpeningData, accountOpeningData, setBvnData, userData } =
    useStore((state) => state);
  const navigation = useNavigation();
  const mutation = useMutation((payload) => verifyIDServiceBackup(payload), {
    onError: (error, payload) => {
      showToast({
        message:
          'ID validation service is temporarily unavailable. Please try again later.',
        type: 'danger',
      });
    },
    onSuccess: async (res, payload) => {
      if (res?.responseCode === '000') {
        const data = res?.details;
        let result = true;
        const arrayError: { title: string; desc: string }[] = [];
        const firstNameID = data?.FirstName?.trim()
          ? data?.FirstName?.trim()
          : data?.firstName?.trim();
        const lastNameID = data?.LastName?.trim()
          ? data?.LastName?.trim()
          : data?.lastName?.trim();

        const bvnFirstName = accountOpeningData?.firstName?.trim();

        const bvnLastName = accountOpeningData?.lastName?.trim();

        if (firstNameID !== bvnFirstName) {
          const errorDesc = `First Name on BVN (${bvnFirstName}) does not match First Name on ID (${firstNameID})`;
          arrayError.push({
            desc: errorDesc,
            title: 'First name on BVN does not match First Name on ID card',
          });
          result = false;
        }

        if (lastNameID !== bvnLastName) {
          const lastNameID = data?.lastName || data?.surname || 'N/A';
          const errorDesc = `Last Name on BVN (${bvnLastName}) does not match Last Name on ID (${lastNameID})`;
          arrayError.push({
            desc: errorDesc,
            title: 'Last name on BVN does not match Last Name on ID card',
          });
          result = false;
        }
        if (
          data?.dateOfBirth !==
          moment(accountOpeningData?.dateOfBirth).format('YYYY-MM-DD')
        ) {
          arrayError.push({
            desc: `Date Of Birth on BVN (${moment(
              accountOpeningData?.dateOfBirth
            ).format('YYYY-MM-DD')}) does not match Date Of Birth on ID (${
              data?.dateOfBirth
            })`,
            title:
              'Date Of Birth on BVN does not match Date Of Birth on ID card',
          });
          result = false;
        }

        if (data?.expiredDate) {
          if (
            checkCardExpiryStatus(data?.expiredDate) ===
            'Card has already expired'
          ) {
            arrayError.push({
              desc: `ID expired on (${moment(data?.expiredDate).format(
                'YYYY-MM-DD'
              )}), and not valid for use.`,
              title: 'ID Card has expired!',
            });
            result = false;
          }
          if (
            checkCardExpiryStatus(data?.expiredDate) ===
            'Card will expire in 3 months'
          ) {
            arrayError.push({
              desc: `ID will expire on (${moment(data?.expiredDate).format(
                'YYYY-MM-DD'
              )}), and not valid for use.`,
              title: 'ID Card will expire in 3 months!',
            });
            result = false;
          }
        }
        if (
          data?.issuedDate &&
          moment(data?.issuedDate).format('YYYY-MM-DD') !==
            moment(accountOpeningData?.idIssueDate).format('YYYY-MM-DD')
        ) {
          arrayError.push({
            desc: `ID Issue date selected (${moment(
              accountOpeningData?.idIssueDate
            ).format('YYYY-MM-DD')}) does not match issue date on ID (${moment(
              data?.issuedDate
            ).format('YYYY-MM-DD')})`,
            title:
              'Issue Date on inputted does not match issue date on ID card',
          });
          result = false;
        }

        if (data?.gender && data?.gender !== accountOpeningData?.gender) {
          arrayError.push({
            desc: `Gender of customer ${accountOpeningData?.idIssueDate} does not match gender on ID (${data?.gender})`,
            title: 'Customers gender does not match gender on the ID',
          });
          result = false;
        }

        if (data?.country && data?.country !== 'NG') {
          arrayError.push({
            desc: `Contry of birth of customer ${accountOpeningData?.countryOfBirth} does not match country of birth on ID (${data?.country})`,
            title:
              'Customers country of birth does not match country of birth on the ID',
          });
          result = false;
        }
        if (!result) {
          setTimeout(() => {
            setAccountOpeningData({
              ...accountOpeningData,
              idValidationError: arrayError,
              isIdError: true,
            });
          }, 500);
        } else {
          setAccountOpeningData({
            ...accountOpeningData,
            idDetails: res?.details,
          });
          setTimeout(() => {
            navigation.navigate('BvnUploadScreen');
          }, 1000);
        }
      } else {
        showToast({
          message:
            'ID validation service is temporarily unavailable. Please try again later.',
          type: 'danger',
        });
      }
    },
  });
  const { isLoading, error, data, reset } = mutation;

  const handleVerifyIDBackup = async () => {
    const netInfoState = await NetInfo.fetch();

    const payload: any = {
      idNumber: accountOpeningData?.idNumber,
      idType:
        accountOpeningData?.requiredDocuments?.identityType === 'Voter ID'
          ? "VOTER'S CARD"
          : accountOpeningData?.requiredDocuments?.identityType === 'NIN'
          ? 'NIN'
          : accountOpeningData?.requiredDocuments?.identityType ===
            'Drivers Licence'
          ? "DRIVER'S LICENSE"
          : accountOpeningData?.requiredDocuments?.identityType ===
            'International Passport'
          ? 'INTERNATIONAL PASSPORT'
          : accountOpeningData?.requiredDocuments?.identityType === 'V NIN'
          ? 'VNIN'
          : accountOpeningData?.requiredDocuments?.identityType,
      lastNameOnId: accountOpeningData?.lastName,
      processingOfficer: accountOpeningData?.rnAgentId,
      returnImages: 'false',
    };
    if (netInfoState.isConnected) {
      mutation.mutate(payload);
    } else {
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  return { data, error, handleVerifyIDBackup, isLoading, reset };
};

export const useSendOTP = () => {
  const { setAccountOpeningData, accountOpeningData } = useStore(
    (state) => state
  );

  const mutation = useMutation((payload) => sendOTPService(payload), {
    onError: (error, payload) => {
      showToast({ message: 'Network error, try again later', type: 'danger' });
    },
    onSuccess: async (res, payload: any) => {
      if (res.otpReference) {
        setAccountOpeningData({
          ...accountOpeningData,
          OTPValue: '',
          otpReference: res?.otpReference,
          phoneModal: false,
          phoneToSendOtp:
            accountOpeningData.phoneToSendOtp !== '' ||
            accountOpeningData.phoneToSendOtp !== undefined ||
            accountOpeningData.phoneToSendOtp !== null
              ? accountOpeningData.phoneToSendOtp
              : payload?.phoneNumber,
          showOtpModal: true,
        });
      } else {
        showToast({
          message: 'An error occur, try again later',
          type: 'danger',
        });
      }
    },
  });
  const { error, data, reset } = mutation;
  const isLoadingSendOtp = mutation.isLoading;

  const handleSendOTP = async (value: any) => {
    setAccountOpeningData({
      ...accountOpeningData,
      OTPValue: '',
      otpReference: 'opopopo=pl',
      phoneModal: false,
    });
    setTimeout(() => {
      setAccountOpeningData({
        ...accountOpeningData,
        phoneModal: false,
      });
    }, 500);
    return;

    const payload: any = { phoneNumber: value?.phoneToSendOtp };

    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  const handleSentOTPTOUsers = async (value: any) => {
    let payload: any = {};

    const phoneNumber =
      value?.phoneToSendOtp !== '' ||
      (undefined && !value.phoneToSendOtp.includes('234'))
        ? `${value?.phoneToSendOtp?.replace('0', '234')}`
        : `${value?.phoneNumber}`;
    const phoneNumber1 = `234${value?.phoneNumber?.slice(1)}`;
    const phoneNumber2 = `234${value?.phoneNumber1?.slice(1)}`;
    const phoneNumber3 = `234${value?.phoneNumber2?.slice(1)}`;

    payload =
      phoneNumber?.length > 10
        ? {
            email: value.email,
            phoneNumber,
          }
        : {
            email: value.email,
            phoneNumber: phoneNumber1,
          };

    setAccountOpeningData({
      ...accountOpeningData,
      ...value,
      phoneModal: false,
    });

    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  return {
    data,
    error,
    handleSendOTP,
    handleSentOTPTOUsers,
    isLoadingSendOtp,
    reset,
  };
};

export const useReSendOTP = () => {
  const { setAccountOpeningData, accountOpeningData } = useStore(
    (state) => state
  );
  const mutation = useMutation((payload) => sendOTPService(payload), {
    onError: (error, payload) => {
      showToast({ message: 'Network error, try again later', type: 'danger' });
    },
    onSuccess: async (res, payload) => {
      if (res.otpReference) {
        setAccountOpeningData({
          ...accountOpeningData,
          OTPValue: '',
          otpReference: res?.otpReference,
        });
        showToast({ message: 'OTP sent successfully', type: 'success' });
      } else {
        showToast({ message: 'An error occur, again later', type: 'danger' });
      }
    },
  });
  const { error, data, reset } = mutation;
  const isLoadingReSendOtp = mutation.isLoading;

  const handleReSendOTP = async (value: any) => {
    const phoneNumber = value?.phoneToSendOtp;
    const phoneNumber1 = `234${value?.phoneNumber?.slice(1)}`;
    const phoneNumber2 = `234${value?.phoneNumber1?.slice(1)}`;
    const phoneNumber3 = `234${value?.phoneNumber2?.slice(1)}`;

    const payload: any = {
      email: value.email,
      phoneNumber: phoneNumber || phoneNumber1 || phoneNumber2 || phoneNumber3,
    };

    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  return { data, error, handleReSendOTP, isLoadingReSendOtp, reset };
};

export const useGetCustomersConsentStatus = () => {
  const res = useQuery('customers-consent', () =>
    getCustomersConsentStatusService()
  );
  const customerConsentArr = res.data;
  return { customerConsentArr };
};

export const useCustomerConsent = () => {
  const { setAccountOpeningData, accountOpeningData } = useStore(
    (state) => state
  );
  const mutation = useMutation((payload) => postCustomersConsent(payload), {
    onError: (error, payload) => {
      // showToast({
      //   message: "Customer agreement to consent fails",
      //   type: "danger",
      // });
    },
    onSuccess: async (res, payload) => {
      // if (res.responseCode === "000") {
      //   showToast({ message: res?.responseDescription, type: "success" });
      // }
    },
  });
  const { error, data, reset } = mutation;
  const isLoadingCustomerConsent = mutation.isLoading;

  const handleCustomerConsent = (value: any) => {
    const payload: any = {
      accountName: `${value?.firstName} ${value?.lastName} ${value?.middleName}`,
      approved: 'yes',
      channelId: 'Pent',
      consentCode: '024',
      email:
        value?.email !== '' || null || undefined
          ? value?.email
          : value?.bvnDetails?.email,
      phone: value?.phoneNumber,
      staffId: accountOpeningData?.rnAgentId,
    };
    mutation.mutate(payload);
  };

  return {
    data,
    error,
    handleCustomerConsent,
    isLoadingCustomerConsent,
    reset,
  };
};

export const useVerifyOTP = () => {
  const navigation = useNavigation();
  const { setAccountOpeningData, accountOpeningData } = useStore(
    (state) => state
  );
  // const { verifyID } = useVerifyID();
  const { isValidateNINLoading, handleValidateNIN } = useValidateNIN();
  const mutation = useMutation((payload) => verifyOTPService(payload), {
    onError: (error, payload) => {
      // showToast({
      //   message: "OTP Validation failed - Unable to validate OTP",
      //   type: "danger",
      // });
      alert('OTP Validation failed - Unable to validate OTP');
    },
    onSuccess: async (res, payload) => {
      const response = JSON.stringify(res);
      if (response) {
        setAccountOpeningData({
          ...accountOpeningData,
          OTPValue: '',
          email: '',
          phoneToSendOtp: '',
          showOtpModal: false,
        });
        showToast({ message: 'OTP validated successfully', type: 'success' });
        // if (
        //   accountOpeningData?.accountType === "Tier Three" &&
        //   accountOpeningData?.bvnDetails?.nin
        // ) {
        //   handleValidateNIN();
        //   if (!isValidateNINLoading) {
        //     setTimeout(() => {
        //       navigation.navigate("BvnInfoScreen");
        //     }, 2000);
        //   }
        // }
        setTimeout(() => {
          navigation.navigate('BvnInfoScreen');
        }, 1000);
      } else {
        setAccountOpeningData({
          ...accountOpeningData,
        });
        alert(
          'Incorrect OTP entered, kindly enter the right OTP, or request another'
        );
      }
    },
  });
  const { error, data, reset } = mutation;
  const isLoadingVerifyOTP = mutation.isLoading;

  const handleVerifyOTP = (value: any) => {
    // setAccountOpeningData({
    //   ...accountOpeningData,
    //   OTPValue: "",
    //   email: "",
    //   phoneToSendOtp: "",
    //   showOtpModal: false,
    // });

    const payload: any = {
      otp: value.OTPValue,
      otpReference: value.otpReference,
      phoneNumber:
        value?.phoneToSendOtp?.length > 10
          ? value?.phoneToSendOtp?.replace('0', '234')
          : value?.phoneNumber?.replace('0', '234'),
    };

    mutation.mutate(payload);
  };

  return { data, error, handleVerifyOTP, isLoadingVerifyOTP, reset };
};

const hasRepeatedCharsOrSpecialSymbols = (str: string) =>
  /(\w)\1{2,}|[^\dA-Za-z]/.test(str);

const hasRepeatedCharsOrNumOrSpecialSymbols = (str: string) =>
  /(\w)\1{2,}|[^ A-Za-z]/.test(str);

const hasRepeatedCharacter = (str: string) =>
  /(.)\1{2,}/.test(str.replace(/\s+/g, ' '));

const handleInputChange = (text: string) => /[^A-Za-z]/.test(text);

// function disallowSpacesBetweenWords(text) {
//   const splitted = text.split(" ");
//   for (let i = 0; i < splitted.length; i++) {
//     if(splitted[i].length > 1) {
//
//     } else {
//
//     }
//   }
// }

// disallowSpacesBetweenWords("Ademola David a")

function disallowSpaceBetweenLetters(text: string): boolean {
  const splitted: string[] = text.trim().split(' ');
  let hasShortWord = false;

  splitted.some((word: string) => {
    if (word.length < 2 && !/^\d+$/.test(word)) {
      hasShortWord = true;
      return true; // Stop iteration
    }
    return false; // Continue iteration
  });

  return hasShortWord;
}

export const useCreateTierOne = () => {
  const { setTierOneSuccess, userData } = useStore((state) => state);
  const mutation = useMutation(
    (payload: any) =>
      createTierOneService({
        ...payload,
        sap: userData.username,
        token: userData.token,
      }),
    {
      onError: (error, payload) => {
        showToast({
          message:
            error?.message ||
            error?.data?.message ||
            'There seems to be an issue, try again later' ||
            'Request could not be completed at the moment, please try again.',
          type: 'danger',
        });
      },
      onSuccess: async (res, payload) => {
        if (res?.responseCode === '000') {
          setTierOneSuccess({ content: res, isSuccess: true });
          await queryClient.invalidateQueries(['success-accounts']);
          await queryClient.invalidateQueries(['pending-accounts']);
          await queryClient.invalidateQueries(['failed-accounts']);
        } else {
          showToast({ message: res?.responseMessage, type: 'success' });
        }
      },
    }
  );
  const { isLoading, error, data, reset } = mutation;

  const handleCreateTierOne = async (value: any) => {
    // if (!value?.title) {
    //   return showToast("Select title");
    // }
    if (!value?.title) {
      return showToast({ message: 'Select title', type: 'danger' });
    }

    if (!value?.stateOfResidence) {
      return showToast({
        message: 'Select state of residence',
        type: 'danger',
      });
    }

    const targetState = value?.stateOfResidence;
    const stateOfOrigin = value?.stateOfOrigin;
    const stateExists = states.some(
      (state) => state.STATE.toLowerCase() === targetState.toLowerCase()
    );

    const stateOrgExists = states.some(
      (state) => state.STATE.toLowerCase() === stateOfOrigin.toLowerCase()
    );

    const dateToCheck1 = value?.bvnDetails?.dateOfBirth;
    const isCustAgeLessThan18YearsAgo1 = isDateLessThan18YearsAgo(dateToCheck1);

    const dateToCheck2 = value?.nokDob;
    const isNokAgeLessThan18YearsAgo2 = isDateLessThan18YearsAgo(dateToCheck2);

    if (!isCustAgeLessThan18YearsAgo1) {
      return showToast({
        message:
          'Account cannot be opened for a minor - BVN holder is less than 18 years',
        type: 'danger',
      });
    }

    if (!stateExists) {
      return showToast({
        message:
          'Select state of residence from the dropdown, value not supported',
        type: 'danger',
      });
    }
    if (!stateOrgExists) {
      return showToast({
        message:
          'Select state of origin from the dropdown, value not supported',
        type: 'danger',
      });
    }

    if (!value?.lgaOfResidence) {
      return showToast({ message: 'Select lga of residence', type: 'danger' });
    }
    if (!value?.residentialAddress) {
      return showToast({ message: 'Enter address', type: 'danger' });
    }
    if (value?.residentialAddress.length < 10) {
      return showToast({
        message: 'Customers address should not be less than 10 characters',
        type: 'danger',
      });
    }

    if (value?.residentialAddress.split(' ').length < 4) {
      return showToast({
        message:
          'Kindly enter a descriptive address. Address must have at least four words. ',
        type: 'danger',
      });
    }
    if (!value?.maritalStatus) {
      return showToast({ message: 'Select Marital Status', type: 'danger' });
    }
    if (!value?.phoneToSendOtp) {
      return showToast({ message: 'Enter phone number', type: 'danger' });
    }
    if (
      value.phoneToSendOtp?.length !== 11 &&
      value.phoneToSendOtp?.slice(0, 1) === '0'
    ) {
      return showToast({ message: 'Enter valid phone number', type: 'danger' });
    }
    if (
      value.phoneToSendOtp?.length !== 10 &&
      value.phoneToSendOtp?.slice(0, 1) !== '0'
    ) {
      return showToast({ message: 'Enter valid phone number', type: 'danger' });
    }

    if (value?.schemename === 'Bluedge Lite Savings Account (Tier 1)') {
      if (!value?.email) {
        return showToast({ message: 'Enter email', type: 'danger' });
      }
      if (
        value?.email?.trim() &&
        !/^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/.test(
          value.email?.trim()
        )
      ) {
        return showToast({ message: 'Enter valid email', type: 'danger' });
      }
    }

    // if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.email)) {
    //     return  showToast('Enter valid email');
    // }
    if (!value?.nokFullName) {
      return showToast({
        message: 'Enter next of kin full name',
        type: 'danger',
      });
    }

    if (disallowSpaceBetweenLetters(value.nokFullName)) {
      return showToast({
        message: 'Next of kin name format is not accepted',
        type: 'danger',
      });
    }
    if (value?.nokFullName.length < 5) {
      return showToast({
        message: 'Next of kin name is too short',
        type: 'danger',
      });
    }

    if (hasRepeatedCharsOrNumOrSpecialSymbols(value?.nokFullName)) {
      return showToast({
        message: 'Next of kin name contains invalid or repeated charactrers',
        type: 'danger',
      });
    }

    // if (handleInputChange(value?.nokFullName)) {
    //   return showToast(
    //     "Next of kin name contains invalid or repeated charactrers",
    //   );
    // }
    if (!value?.nokPhone) {
      return showToast({
        message: 'Enter next of kin phone number',
        type: 'danger',
      });
    }
    if (
      value?.nokPhone?.length !== 11 &&
      value?.nokPhone?.slice(0, 1) === '0'
    ) {
      return showToast({
        message: 'Enter valid next of kin phone number',
        type: 'danger',
      });
    }
    if (
      value?.nokPhone?.length !== 10 &&
      value?.nokPhone?.slice(0, 1) !== '0'
    ) {
      return showToast({
        message: 'Enter valid next of kin phone number',
        type: 'danger',
      });
    }
    if (!value?.nokGender) {
      return showToast({
        message: 'Select next of kin gender',
        type: 'danger',
      });
    }
    if (!value?.nokStateOfResidenceCode) {
      return showToast({ message: 'Select next of kin state', type: 'danger' });
    }
    if (!value?.nokLgaOfResidenceCode) {
      return showToast({ message: 'Select next of kin LGA', type: 'danger' });
    }
    if (!value?.nokRelationship) {
      return showToast({
        message: 'Select next of kin relationship',
        type: 'danger',
      });
    }
    if (hasRepeatedCharacter(value?.nokAddress)) {
      return showToast({
        message: 'Address has repeated characters',
        type: 'danger',
      });
    }

    if (disallowSpaceBetweenLetters(value?.nokAddress)) {
      return showToast({
        message: 'Next of kin address format is not accepted',
        type: 'danger',
      });
    }
    if (value?.nokAddress.length < 10) {
      return showToast({
        message: 'Address must be more than 10 characters',
        type: 'danger',
      });
    }

    if (value?.nokAddress.split(' ').length < 4) {
      return showToast({
        message:
          'Kindly enter a descriptive address. Address must have at least four words. ',
        type: 'danger',
      });
    }
    if (!value?.nokAddress) {
      return showToast({
        message: 'Enter next of kin address',
        type: 'danger',
      });
    }
    if (!value?.nokDob) {
      return showToast({
        message: 'Enter next of kin date of birth',
        type: 'danger',
      });
    }
    // if (!isNokAgeLessThan18YearsAgo2) {
    //   return showToast("Next of kin cannot be a minor - under 18 years");
    // }
    if (!value?.requiredDocuments?.passportPhotograph) {
      return showToast({
        message: 'Upload passport photograph',
        type: 'danger',
      });
    }
    if (!value?.requiredDocuments?.signature) {
      return showToast({ message: 'Upload signature', type: 'danger' });
    }
    const countryCodeNok = value?.nokCountryCode
      ? value?.nokCountryCode
      : '+234';

    // const maritalStatusCodes = {
    //   Divorced: "004",
    //   "Live-In Relationship": "009",
    //   Married: "002",
    //   "Not Given": "008",
    //   Separated: "003",
    //   Single: "001",
    //   Widow: "005",
    //   Widowed: "005",
    // };

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it's zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const dateString = `${year}-${month}-${day}`;

    const payload: any = {
      AccountTypeRequested: '1',
      BvnDetails: {
        BVN: value?.bvnDetails?.bvn,
        Base64Image: value?.bvnDetails?.base64Image,
        DateOfBirth: value?.bvnDetails?.dateOfBirth,
        Email: value?.bvnDetails?.email?.trim(),
        EnrollmentBank: value?.bvnDetails?.enrollmentBank,
        EnrollmentBranch: value?.bvnDetails?.enrollmentBranch,
        FirstName: value?.bvnDetails?.firstName,
        Gender: value?.bvnDetails?.gender,
        LastName: value?.bvnDetails?.lastName,
        LevelOfAccount: value?.bvnDetails?.levelOfAccount,
        LgaOfOrigin: value?.bvnDetails?.lgaOfOrigin,
        LgaOfResidence: value?.bvnDetails?.lgaOfResidence,
        MaritalStatus: value?.bvnDetails?.maritalStatus,
        MiddleName: value?.bvnDetails?.middleName,
        NIN: value?.bvnDetails?.nin,
        NameOnCard: value?.bvnDetails?.nameOnCard,
        Nationality: value?.bvnDetails?.nationality,
        PhoneNumber: value?.bvnDetails?.phoneNumber,
        PhoneNumber1: value?.bvnDetails?.phoneNumber1,
        PhoneNumber2: value?.bvnDetails?.phoneNumber2,
        RegistrationDate: value?.bvnDetails?.registerationDate,
        ResidentialAddress: value?.bvnDetails?.residentialAddress,
        ResponseCode: value?.bvnDetails?.responseCode,
        ResponseMessage: value?.bvnDetails?.responseMessage,
        StateOfOrigin: value?.bvnDetails?.stateOfOrigin,
        StateOfResidence: value?.bvnDetails?.stateOfResidence,
        Title:
          value?.bvnDetails?.title === null || '' || undefined
            ? String(value?.title)
            : value?.bvnDetails?.title,
        WatchListed: value?.bvnDetails?.watchListed,
      },
      Documents: {
        // placed to check
        idImage: '',
        idImageExtension: '',
        // idImage: "",
        // idImageExtension: "",
        idIssueDate: new Date().toISOString(),
        idIssueDateString: '',
        // idIssueDate: "",
        idNumber: '',
        // idNumber: "",
        identityType: '',
        // identityType: "",
        // ends here to check iof account gets created
        passportPhotograph: value?.requiredDocuments?.passportPhotograph,
        passportPhotographExtension:
          value?.requiredDocuments?.passportPhotographName.split('.')[1],
        signature: value?.requiredDocuments?.signature,
        signatureExtension:
          value?.requiredDocuments?.signatureName?.split('.')[1],
        // added this utility
        utilityBill: '',
        utilityBillExtension: '',
        // utilityBill: "",
        // utilityBillExtension: "",
      },
      accountManager: userData?.username,
      address: value?.residentialAddress,
      avrComment: 'An act comment',
      avrVisitDate: '2018-09-08',
      branchId: value?.soL_Id,
      branchName: value?.bankBranch,
      bvn: value?.bvn,
      countryOfBirth: 'NG',
      currencyCode: 'NGN',
      customerRelationshipManager: 'CCC9676',
      dateOfBirth: formatDateOfBirth(value?.dateOfBirth),
      domiciliaryAccountDetails: null,
      email: value?.email?.trim(),

      employedAndStudentCustomerInformation: {
        dateOfEmployment: '2018-09-08',
        employerAddress: 'lekki phase one',
        employerName: 'Stanbic',
        institutionName: null,
        // sectorCode: "96",
        // subSectorCode: "S960",
        sectorCode:
          value?.schemename === 'Bluedge Lite Savings Account (Tier 1)'
            ? '85'
            : '90',
        subSectorCode:
          value?.schemename === 'Bluedge Lite Savings Account (Tier 1)'
            ? 'P853'
            : 'R900',
      },
      // employedAndStudentCustomerInformation: null,
      // employmentStatusCode: "004",
      employmentStatusCode:
        value?.schemename === 'Bluedge Lite Savings Account (Tier 1)'
          ? '007'
          : '004',
      internetBankingForRM: value?.internetBanking === 'Yes' || true,
      lgaOfResidence: value?.lgaOfResidenceCode
        ? value?.lgaOfResidenceCode
        : value?.lgaOfResidence?.split(' ')[0]?.slice(0, 5)?.toUpperCase(),
      maritalStatus: value?.maritalStatus
        ? maritalStatusCodes[value.maritalStatus]
        : '010',
      motherMaidenName: value?.bvnDetails?.motherMaidenName
        ? value?.bvnDetails?.motherMaidenName
        : 'Esther',
      nationality: value?.bvnDetails?.nationality,
      natureOfBusiness: '',
      // nearestBusStop: "Lekki",
      nearestBusStop: '',

      nextOfKinDetails: {
        Town: value?.nokLgaOfResidenceCode,
        address: value?.nokAddress,
        dateOfBirth: value?.nokDob,
        fullName: value?.nokFullName,
        gender: value?.nokGender,
        phoneNumber:
          value?.nokPhone?.slice(0, 1) !== '0'
            ? countryCodeNok + value?.nokPhone
            : countryCodeNok + value?.nokPhone?.slice(1),
        relationship: String(value?.nokRelationshipCode),
        relationshipName: String(value?.nokRelationship),
        stateOfResidence: value?.nokStateOfResidenceCode,
      },
      occupationCode:
        value?.schemename === 'Bluedge Lite Savings Account (Tier 1)'
          ? '042'
          : '999',
      phoneNumber:
        value?.phoneToSendOtp?.slice(0, 1) === '0'
          ? value?.phoneToSendOtp
          : `0${value?.phoneToSendOtp}`,
      platform: 5,
      politicallyExposed: false,
      politicallyExposedPersonDetails: null,
      purposeOfAccount: value?.accountPurpose,
      residenceAddress: value?.residentialAddress,
      // schemeCode: "KYCL1",
      schemeCode: value?.schemeCode,
      stateOfResidence: value?.stateOfResidenceCode
        ? value?.stateOfResidenceCode
        : value?.stateOfResidence?.split(' ')[0]?.slice(0, 5)?.toUpperCase(),
      // subSegment: "BLUE",
      subSegment: '102',
      title: String(value?.titleCode),
    };
    // @ts-ignore

    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };

  return { data, error, handleCreateTierOne, isLoading, reset };
};

export const useCreateTierThree = () => {
  const navigation = useNavigation();
  const { setTierOneSuccess, userData } = useStore((state) => state);
  const { handleVerifyID } = useVerifyID();
  const { handleVerifyIDBackup } = useVerifyIDBackUp();
  const mutation = useMutation(
    (payload: any) =>
      createTierThreeService({
        ...payload,
        sap: userData.username,
        token: userData.token,
      }),
    {
      onError: (error, payload) => {
        showToast({
          message:
            'Request could not be completed at the moment, please try again.',
          type: 'danger',
        });
      },
      onSuccess: async (res, payload) => {
        if (res?.responseCode === '000') {
          setTierOneSuccess({ content: res, isSuccess: true });
          await queryClient.invalidateQueries(['success-accounts']);
          await queryClient.invalidateQueries(['pending-accounts']);
          await queryClient.invalidateQueries(['failed-accounts']);
        } else {
          showToast({ message: res?.content, type: 'success' });
        }
      },
    }
  );
  const { isLoading, error, data, reset } = mutation;

  const handleValidateTierThreeData = (value: any) => {
    if (!value?.title) {
      return showToast({ message: 'Select title', type: 'danger' });
    }
    if (!value?.motherMedianName) {
      return showToast({
        message: "Enter Mother's Maiden Name",
        type: 'danger',
      });
    }
    if (hasRepeatedCharsOrNumOrSpecialSymbols(value?.motherMedianName)) {
      return showToast({
        message:
          "Mother's Maiden Name contains repeated characters or invalid symbols",
        type: 'danger',
      });
    }
    if (hasRepeatedCharacter(value?.residentialAddress)) {
      return showToast({
        message: 'Address contains repeated characters',
        type: 'danger',
      });
    }
    if (!value?.residentialAddress) {
      return showToast({ message: 'Enter address', type: 'danger' });
    }
    if (value?.residentialAddress.length < 10) {
      return showToast({
        message: 'Customers address should not be less than 10 characters',
        type: 'danger',
      });
    }

    if (value?.residentialAddress.split(' ').length < 4) {
      return showToast({
        message:
          'Kindly enter a descriptive address. Address must have at least four words. ',
        type: 'danger',
      });
    }

    if (!value?.stateOfResidence) {
      return showToast({
        message: 'Select state of residence',
        type: 'danger',
      });
    }
    if (!value?.lgaOfResidence) {
      return showToast({
        message: 'Select lga of residence',
        type: 'danger',
      });
    }
    if (!value?.landmark) {
      return showToast({ message: 'Enter landmark', type: 'danger' });
    }

    if (value?.landmark?.split(' ')?.length < 4) {
      return showToast({
        message:
          'Kindly enter a descriptive landmark. Landmark should be at least 4 words',
        type: 'danger',
      });
    }

    if (hasRepeatedCharacter(value?.landmark)) {
      return showToast({
        message: 'Landmark contains repeated characters',
        type: 'danger',
      });
    }
    if (!value?.countryOfBirth) {
      return showToast({
        message: 'Select country of birth',
        type: 'danger',
      });
    }
    if (!value?.phoneToSendOtp) {
      return showToast({ message: 'Enter phone number', type: 'danger' });
    }
    if (
      value.phoneToSendOtp?.length !== 11 &&
      value.phoneToSendOtp?.slice(0, 1) === '0'
    ) {
      return showToast({
        message: 'Enter valid phone number',
        type: 'danger',
      });
    }
    if (
      value.phoneToSendOtp?.length !== 10 &&
      value.phoneToSendOtp?.slice(0, 1) !== '0'
    ) {
      return showToast({
        message: 'Enter valid phone number',
        type: 'danger',
      });
    }
    if (
      value?.email?.trim() &&
      !/^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/.test(
        value.email?.trim()
      )
    ) {
      return showToast({ message: 'Enter valid email', type: 'danger' });
    }
    if (value?.politicallyExposed === 'Yes') {
      if (!value?.familyMemberHeldGovernment) {
        return showToast({
          message: 'Select the politically exposed person',
          type: 'danger',
        });
      }
      if (value?.familyMemberHeldGovernment === 'Relation') {
        if (!value?.familyMemberFullName) {
          return showToast({
            message: 'Enter full name of the politically exposed person',
            type: 'danger',
          });
        }
        if (!value?.relationWithFamilyMember) {
          return showToast({
            message:
              'Select your relationship with the politically exposed person',
            type: 'danger',
          });
        }
      }
    }
    // if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.email)) {
    //     return  showToast('Enter valid email');
    // }
    if (!value?.nokFullName) {
      return showToast({
        message: 'Enter next of kin full name',
        type: 'danger',
      });
    }
    if (value?.nokFullName.length < 5) {
      return showToast({
        message: 'Next of kin name is too short',
        type: 'danger',
      });
    }
    if (hasRepeatedCharsOrNumOrSpecialSymbols(value?.nokFullName)) {
      return showToast({
        message: 'Next of kin name conatins Invalid or repeated characters',
        type: 'danger',
      });
    }
    if (!value?.nokStateOfResidenceCode) {
      return showToast({
        message: 'Select next of kin state',
        type: 'danger',
      });
    }
    if (!value?.nokLgaOfResidenceCode) {
      return showToast({ message: 'Select next of kin LGA', type: 'danger' });
    }
    if (!value?.nokPhone) {
      return showToast({
        message: 'Enter next of kin phone number',
        type: 'danger',
      });
    }
    if (
      value?.nokPhone?.length !== 11 &&
      value?.nokPhone?.slice(0, 1) === '0'
    ) {
      return showToast({
        message: 'Enter valid next of kin phone number',
        type: 'danger',
      });
    }
    if (
      value?.nokPhone?.length !== 10 &&
      value?.nokPhone?.slice(0, 1) !== '0'
    ) {
      return showToast({
        message: 'Enter valid next of kin phone number',
        type: 'danger',
      });
    }
    if (!value?.nokGender) {
      return showToast({
        message: 'Select next of kin gender',
        type: 'danger',
      });
    }
    if (!value?.nokRelationship) {
      return showToast({
        message: 'Select next of kin relationship',
        type: 'danger',
      });
    }
    if (!value?.nokAddress) {
      return showToast({
        message: 'Enter next of kin address',
        type: 'danger',
      });
    }

    if (value?.nokAddress.length < 10) {
      return showToast({
        message: 'Address field should be more than 10 characters',
        type: 'danger',
      });
    }

    if (value?.nokAddress?.split(' ')?.length < 4) {
      return showToast({
        message: 'Kindly enter a descriptive address for next of kin',
        type: 'danger',
      });
    }
    if (hasRepeatedCharacter(value?.nokAddress)) {
      return showToast({
        message: 'Address has repeated characters',
        type: 'danger',
      });
    }
    if (!value?.nokDob) {
      return showToast({
        message: 'Enter next of kin date of birth',
        type: 'danger',
      });
    }
    if (!value?.requiredDocuments?.identityType) {
      return showToast({ message: 'Select identity type', type: 'danger' });
    }

    if (!value?.idNumber) {
      return showToast({ message: 'Enter id number', type: 'danger' });
    }
    if (
      (value?.requiredDocuments?.identityType === 'Drivers Licence' ||
        value?.requiredDocuments?.identityType === 'International Passport') &&
      !value?.idIssueDate
    ) {
      return showToast({ message: 'Select id issue date', type: 'danger' });
    }

    if (
      value?.requiredDocuments.identityType === 'International Passport' ||
      value?.requiredDocuments.identityType === 'V NIN'
    ) {
      const res2 = handleVerifyIDBackup();
    } else {
      const response = handleVerifyID();
    }
  };

  const handleCreateTierThree = async (value: any) => {
    if (!value?.employmentStatusCode) {
      return showToast({ message: 'Select employment status', type: 'danger' });
    }
    if (
      (value.employmentStatusCode === '001' ||
        value.employmentStatusCode === '004' ||
        value.employmentStatusCode === '003') &&
      !value?.occupationCode
    ) {
      return showToast({ message: 'Select occupation', type: 'danger' });
    }
    if (value.employmentStatusCode === '007' && !value?.institutionName) {
      return showToast({ message: 'Enter institution name', type: 'danger' });
    }
    if (
      value.employmentStatusCode !== '007' &&
      value.employmentStatusCode !== '003' &&
      value.employmentStatusCode !== '005' &&
      value.employmentStatusCode !== '006'
    ) {
      if (!value?.employerName) {
        return showToast({ message: "Enter employer's name", type: 'danger' });
      }
      if (!value?.employerAddress) {
        return showToast({
          message: "Enter employer's address",
          type: 'danger',
        });
      }
      if (!value?.employmentStartDate) {
        return showToast({
          message: 'Select date of employment',
          type: 'danger',
        });
      }
    }

    if (
      value?.politicallyExposed === 'Yes' &&
      !value?.requiredDocuments?.pepApprovalLetter
    ) {
      return showToast({
        message: 'Upload PEP approval letter',
        type: 'danger',
      });
    }

    if (!value?.avrVisitDate && value.avr === 'Yes') {
      return showToast({ message: 'Enter AVR visit date', type: 'danger' });
    }
    if (!value?.avrComment && value.avr === 'Yes') {
      return showToast({ message: 'Enter AVR comment', type: 'danger' });
    }
    if (!value?.rmName && value.avr === 'Yes') {
      return showToast({
        message: 'Enter RM that conducted the AVR visit',
        type: 'danger',
      });
    }
    if (
      !value?.requiredDocuments?.utilityBill &&
      value.hasUtilityBill !== 'Yes'
    ) {
      return showToast({
        message: 'You need to upload utility bill to continue',
        type: 'danger',
      });
    }
    if (!value?.requiredDocuments?.idImage) {
      return showToast({ message: 'Upload Id' });
    }
    if (!value?.requiredDocuments?.googleSearchImage) {
      return showToast({
        message: "Upload a screenshot of customer's google search result",
      });
    }
    if (!value?.requiredDocuments?.passportPhotograph) {
      return showToast({
        message: 'Upload picture photograph',
        type: 'danger',
      });
    }
    if (!value?.requiredDocuments?.signature) {
      return showToast({ message: 'Upload signature', type: 'danger' });
    }

    const countryCodeNok = value?.nokCountryCode
      ? value?.nokCountryCode
      : '+234';
    const countryCode = value?.countryCode ? value?.countryCode : '+234';

    const timePart = '12:21:59.972';
    const payload: any = {
      AccountTypeRequested: value?.schemeName.includes('CURRENT ACCOUNT')
        ? 'Currentaccount'
        : '3',
      BvnDetails: {
        BVN: value?.bvnDetails?.bvn,
        Base64Image: value?.bvnDetails?.base64Image,
        DateOfBirth: value?.bvnDetails?.dateOfBirth,
        Email: value?.bvnDetails?.email?.trim(),
        EnrollmentBank: value?.bvnDetails?.enrollmentBank,
        EnrollmentBranch: value?.bvnDetails?.enrollmentBranch,
        FirstName: value?.bvnDetails?.firstName,
        Gender: value?.bvnDetails?.gender,
        LastName: value?.bvnDetails?.lastName,
        LevelOfAccount: value?.bvnDetails?.levelOfAccount,
        LgaOfOrigin: value?.bvnDetails?.lgaOfOrigin,
        LgaOfResidence: value?.bvnDetails?.lgaOfResidence,
        MaritalStatus: value?.bvnDetails?.maritalStatus,
        MiddleName: value?.bvnDetails?.middleName,
        NIN: value?.bvnDetails?.nin,
        NameOnCard: value?.bvnDetails?.nameOnCard,
        Nationality: value?.bvnDetails?.Nationality
          ? value?.bvnDetails?.Nationality
          : value?.bvnDetails?.nationality,
        PhoneNumber: value?.bvnDetails?.phoneNumber,
        PhoneNumber1: value?.bvnDetails?.phoneNumber1,
        PhoneNumber2: value?.bvnDetails?.phoneNumber2,
        RegistrationDate: value?.bvnDetails?.registerationDate,
        ResidentialAddress: value?.bvnDetails?.residentialAddress,
        ResponseCode: value?.bvnDetails?.responseCode,
        ResponseMessage: value?.bvnDetails?.responseMessage,
        StateOfOrigin: value?.bvnDetails?.stateOfOrigin,
        StateOfResidence: value?.bvnDetails?.stateOfResidence,
        Title: value?.bvnDetails?.title,
        WatchListed: value?.bvnDetails?.watchListed,
      },
      Documents: {
        idImage: value?.requiredDocuments?.idImage,
        idImageExtension: value?.requiredDocuments?.idImageName?.split('.')[1],
        idIssueDate: new Date().toISOString(),
        idIssueDateString: value?.idIssueDate ?? new Date().toISOString(),
        idNumber: value?.idNumber,
        identityType: value?.requiredDocuments?.identityTypeCode,
        internetSearch: value?.requiredDocuments?.googleSearchImage,
        passportPhotograph: value?.requiredDocuments?.passportPhotograph,
        passportPhotographExtension:
          value?.requiredDocuments?.passportPhotographName?.split('.')[1],
        pepApprovalLetter:
          value?.politicallyExposed === 'Yes'
            ? value?.requiredDocuments?.pepApprovalLetter
            : '',
        signature: value?.requiredDocuments?.signature,
        signatureExtension:
          value?.requiredDocuments?.signatureName?.split('.')[1],
        utilityBill: value?.requiredDocuments?.utilityBill,
        utilityBillExtension:
          value?.requiredDocuments?.utilityBillName?.split('.')[1],
      },

      // CurrentAccountType: value?.currencyCode !== 'NGN' ? 'DOM Savings' : ['ODSAL', 'OD002', 'OD003', 'OD004', 'HYCAG', 'CHYCA'].indexOf(value?.schemeCode)  !== -1 ? "Current" : '',
      accountManager: userData?.username,

      address: value?.residentialAddress,

      avrComment: value?.avrComment ? value?.avrComment : '',
      avrVisitDate: value?.avrVisitDate ?? null,
      branchId: value?.soL_Id,
      branchName: value?.bankBranch,
      bvn: value?.bvn,
      countryOfBirth: value?.countryOfBirthCode,
      currencyCode: value?.currency ? value?.currencyCode : 'NGN',
      currentAccountType: value?.schemeName.includes('CURRENT ACCOUNT')
        ? value?.schemeName?.split(' ').slice(-1)[0].charAt(0).toUpperCase() +
          value?.schemeName.split(' ').slice(-1)[0].slice(1).toLowerCase()
        : '',
      customerRelationshipManager:
        value.schemeName.includes('GOLD') ||
        value.subSegment.includes('AFFLUENT') ||
        value.schemeName.includes('PRIVATE') ||
        value.schemeName.includes('HIGH YIELD')
          ? value?.rnAgentId
          : 'CCC9676',
      dateOfBirth: formatDateOfBirth(value?.dateOfBirth),
      domiciliaryAccountDetails:
        value?.currencyCode === 'USD' || value?.currencyCode === 'EUR'
          ? {
              expectedCumulativeBalance: value?.cumulativeBalance
                ? value?.cumulativeBalance
                : '',
              sourceOfFunds: Number.parseInt(value?.fxSource),
            }
          : null,
      email: value?.email?.trim(),
      employedAndStudentCustomerInformation:
        value?.employmentStatusCode === '001' ||
        value?.employmentStatusCode === '004' ||
        value?.employmentStatusCode === '008' ||
        value?.employmentStatusCode === '009'
          ? {
              dateOfEmployment: value?.employmentStartDate
                ? value?.employmentStartDate
                : '',
              employerAddress: value?.employerAddress
                ? value?.employerAddress
                : '',
              employerName: value?.employerName ? value?.employerName : '',
              institutionName: value?.institutionName,
            }
          : null,
      employmentStatusCode: value?.employmentStatusCode,
      idCardDetails: {
        address: value?.idDetails?.Address ? value?.idDetails?.Address : '',
        doB_Y: value?.idDetails?.dateOfBirth
          ? value?.idDetails?.dateOfBirth
          : value?.idDetails?.DOB_Y
          ? value?.idDetails?.DOB_Y
          : value?.idDetails?.dateOfBirth
          ? value?.idDetails?.dateOfBirth
          : value?.idDetails?.dob
          ? value?.idDetails?.dob
          : '',
        documentIssuer: value?.requiredDocuments?.docIssuer,
        expiryDate: value?.idDetails?.expiredDate
          ? `${value?.idDetails?.expiredDate}T${timePart}`
          : value?.idDetails?.expiryDate
          ? `${value?.idDetails?.expiryDate}T${timePart}`
          : '',
        // expiryDate: "2024-08-15T12:21:59.972",
        firstName: value?.idDetails?.firstName
          ? value?.idDetails?.firstName
          : value?.idDetails?.FirstName
          ? value?.idDetails?.FirstName
          : '',
        gender: value?.idDetails?.gender
          ? value?.idDetails?.gender
          : value?.idDetails?.Gender
          ? value?.idDetails?.Gender
          : '',
        issueDate: value?.idDetails?.issuedDate
          ? `${value?.idDetails?.issuedDate}T${timePart}`
          : value?.idDetails?.issueDate
          ? `${value?.idDetails?.issueDate}T${timePart}`
          : new Date().toISOString(),
        lastName: value?.idDetails?.lastName
          ? value?.idDetails?.lastName
          : value?.idDetails?.LastName
          ? value?.idDetails?.LastName
          : '',
        lga: value?.idDetails?.LGA ? value?.idDetails?.LGA : '',
        mobileNo: value?.idDetails?.MobileNo
          ? value?.idDetails?.MobileNo
          : value?.idDetails?.mobile
          ? value?.idDetails?.mobile
          : '',
        occupation: value?.idDetails?.Occupation
          ? value?.idDetails?.Occupation
          : '',
        picture: value?.idDetails?.image
          ? value?.idDetails?.image
          : value?.idDetails?.Picture
          ? value?.idDetails?.Picture
          : value?.idDetails?.img
          ? value?.idDetails?.img
          : '',
        state: value?.idDetails?.country ? value?.idDetails?.country : 'NG',
        success: value?.idDetails?.success
          ? value?.idDetails?.success
          : value?.idDetails?.status === 'found',
        vin: value?.idNumber,
      },
      internetBankingForRM: value?.internetBanking === 'Yes',
      lgaOfResidence: value?.lgaOfResidenceCode
        ? value?.lgaOfResidenceCode
        : value?.lgaOfResidence?.split(' ')[0]?.slice(0, 5)?.toUpperCase(),
      maritalStatus: value?.maritalStatus
        ? maritalStatusCodes[value?.maritalStatus]
        : '010',
      motherMaidenName: value?.bvnDetails.motherMaidenName
        ? value?.bvnDetails.motherMaidenName
        : value?.motherMedianName,
      nationality: value?.bvnDetails?.nationality,
      natureOfBusiness: null,
      nearestBusStop: value?.landmark,
      nextOfKinDetails: {
        Town: value?.nokLgaOfResidenceCode,
        address: value?.nokAddress,

        dateOfBirth: value?.nokDob,

        fullName: value?.nokFullName,
        gender: value?.nokGender,
        phoneNumber:
          value?.nokPhone?.slice(0, 1) !== '0'
            ? countryCodeNok + value?.nokPhone
            : countryCodeNok + value?.nokPhone?.slice(1),
        relationship: String(value?.nokRelationshipCode),
        relationshipName: String(value?.nokRelationship),
        stateOfResidence: value?.nokStateOfResidenceCode,
      },
      occupationCode: value?.occupationCode
        ? value?.occupationCode
        : value?.employmentStatusCode === '007'
        ? '021'
        : '999',
      phoneNumber:
        value?.phoneToSendOtp?.slice(0, 1) === '0'
          ? value?.phoneToSendOtp
          : `0${value?.phoneToSendOtp}`,
      platform: 5,
      politicallyExposed: value?.politicallyExposed === 'Yes' ? true : false,
      politicallyExposedPersonDetails:
        value?.politicallyExposed === 'Yes'
          ? {
              familyMemberFullName: value?.familyMemberFullName ?? '',
              familyMemberHeldGovernment:
                value?.familyMemberHeldGovernment ?? '',
              familyMemberPositionHeld: value?.familyMemberPositionHeld ?? '',
              relationWithFamilyMember:
                value?.relationWithFamilyMemberCode ?? '',
            }
          : null,
      purposeOfAccount: value?.accountPurpose,
      residenceAddress: value?.residentialAddress,
      rmName: value?.avr ? value?.rmName : '',
      schemeCode:
        value?.schemeName === 'PURE SAVE (TIER 3 SAVINGS)'
          ? 'SB001'
          : value?.schemeCode,
      sectorCode: value?.occupationCode ? value?.sectorCode : null,
      stateOfResidence: value?.stateOfResidenceCode
        ? value?.stateOfResidenceCode
        : value?.stateOfResidence?.split(' ')[0]?.slice(0, 5)?.toUpperCase(),
      subSectorCode: value?.occupationCode ? value?.subSectorCode : null,
      subSegment: value?.subSegmentCode,
      title: String(value?.titleCode),
    };

    console.log('pppppppp', payload);
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
    // @ts-ignore
  };

  return {
    data,
    error,
    handleCreateTierThree,
    handleValidateTierThreeData,
    isLoading,
    reset,
  };
};

export const useEmploymentStatus = () => {
  const { userData } = useStore((state) => state);
  const res = useQuery('employmentStatusService', () =>
    employmentStatusService(userData.token)
  );

  const employmentStatusData = res.data;
  const isLoadingEmploymentStatusData = res.isLoading;
  return { employmentStatusData, isLoadingEmploymentStatusData };
};

export const useOccupation = () => {
  const { accountOpeningData, userData } = useStore((state) => state);
  const res = useQuery('occupation', () => occupationsService(userData.token));

  const occupationData = res.data;
  const isLoadingOccupation = res.isLoading;
  return { isLoadingOccupation, occupationData };
};

export const useRMAgents = () => {
  const res = useQuery('rm-agents', () => rmAgentsService());
  const RMAgentsData = res.data;
  return { RMAgentsData };
};

export const useBranch = () => {
  const { accountOpeningData, userData } = useStore((state) => state);
  const { data } = useQuery('branch', () => branchService(userData.token));
  return { data };
};

export const useGetSuccessAccounts = (data: any) => {
  const res = useQuery('success-accounts', () => getSuccessAccounts(data));
  const successAccounts = res.data;
  const isLoadingSuccessAccounts = res.isLoading;
  const refetchSuccess = res?.refetch;
  return { isLoadingSuccessAccounts, refetchSuccess, successAccounts };
};

export const useGetPendingAccounts = (data: any) => {
  const res = useQuery('pending-accounts', () => getPendingAccounts(data));

  const pendingAccounts = res.data;
  const isLoadingPendingAccounts = res.isLoading;
  const refetchPending = res?.refetch;
  return { isLoadingPendingAccounts, pendingAccounts, refetchPending };
};

export const useGetFailedAccounts = (data: any) => {
  const res = useQuery('failed-accounts', () => getFailedAccounts(data));

  const failedAccounts = res.data;
  const isLoadingFailedAccounts = res.isLoading;
  const refetchFailure = res?.refetch;
  return { failedAccounts, isLoadingFailedAccounts, refetchFailure };
};

export const useValidateNIN = () => {
  const { accountOpeningData, setAccountOpeningData } = useStore(
    (state) => state
  );

  const mutation = useMutation((payload) => verifyIDService(payload), {
    onError: (error, payload) => {},
    onSuccess: async (res, payload) => {
      if (res.IsFinalResult) {
        const data = res.FullData;
        let result = true;
        const firstNameNIN = data.firstname.trim();
        const lastNameNIN = data.surname.trim();
        const dateOfBirthNIN = data.dateOfBirth.trim();

        const bvnFirstName = accountOpeningData?.firstName?.trim();
        const bvnLastName = accountOpeningData?.lastName?.trim();
        const bvnDOB = moment(accountOpeningData?.dateOfBirth).format(
          'YYYY-MM-DD'
        );
        const arrayError: { title: string; desc: string }[] = [];
        if (firstNameNIN !== bvnFirstName) {
          const errorDesc = `First Name on BVN (${bvnFirstName}) does not match First Name on ID (${firstNameNIN})`;
          arrayError.push({
            desc: errorDesc,
            title: 'First name on BVN does not match First Name on ID card',
          });
          result = false;
        }
        if (lastNameNIN !== bvnLastName) {
          const errorDesc = `Last Name on BVN (${bvnLastName}) does not match Last Name on ID (${lastNameNIN})`;
          arrayError.push({
            desc: errorDesc,
            title: 'Last name on BVN does not match Last Name on ID card',
          });
          result = false;
        }
        if (dateOfBirthNIN !== moment(bvnDOB).format('YYYY-MM-DD')) {
          arrayError.push({
            desc: `Date Of Birth on BVN (${moment(bvnDOB).format(
              'YYYY-MM-DD'
            )}) does not match Date Of Birth on ID (${dateOfBirthNIN})`,
            title:
              'Date Of Birth on BVN does not match Date Of Birth on ID card',
          });
          result = false;
        }
      } else {
        showToast({
          message:
            JSON.stringify(res) ??
            'Invalid BVN, input correct BVN and try again',
          type: 'danger',
        });
      }
    },
  });

  const { error, data, reset } = mutation;

  const isValidateNINLoading = mutation.isLoading;

  const handleValidateNIN = async () => {
    const oldDate = accountOpeningData?.dateOfBirth;
    const dateParts = oldDate.split('-');
    const month = dateParts[1];
    const day = dateParts[0];
    const year = dateParts[2];

    function getMonthNumber(month: any) {
      const months = {
        Apr: '04',
        Aug: '08',
        Dec: '12',
        Feb: '02',
        Jan: '01',
        Jul: '07',
        Jun: '06',
        Mar: '03',
        May: '05',
        Nov: '11',
        Oct: '10',
        Sep: '09',
      };

      return months[month];
    }

    const newDate = `${year}-${getMonthNumber(month)}-${day}`;

    const payload: any = {
      channel: 'MOBILE_APP',
      country: 'NG',
      dob: newDate,
      // processingOfficer: accountOpeningData?.rnAgentId,
      firstName: accountOpeningData?.firstName,
      idNumber: accountOpeningData?.bvnDetails?.nin ?? accountOpeningData?.nin,
      idType: 'NIN',
      lastName: accountOpeningData?.lastName,
      moduleId: 'QTIxMjY2MTow',
    };
    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      // If there is internet connectivity, make the login request
      mutation.mutate(payload);
    } else {
      // If there is no internet connectivity, show a toast
      showToast({
        message: 'No internet connection available',
        type: 'danger',
      });
    }
  };
  return { data, error, handleValidateNIN, isValidateNINLoading, reset };
};
