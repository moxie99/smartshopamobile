import { MessageType, showMessage } from 'react-native-flash-message';

export const showToast = ({
  message,

  type = 'default',
}: {
  message: string;

  type?: MessageType;
}) => {
  const defaultMessage = 'An error occurred. Please try again.';

  const isMessageString = typeof message === 'string';

  showMessage({
    description: isMessageString ? message : defaultMessage,
    duration: 5000,
    floating: true,
    hideStatusBar: true,
    message: '',
    style: {
      // Position at the top
      left: 0,
      // Set a high zIndex to display on top of other elements
      position: 'absolute',
      // Align left
      right: 0,
      // Position the toast absolutely
      top: 0,
      zIndex: 9999, // Align right
    },
    type,
  });
};

export const Capitalize = (string_: any) => {
  if (!string_) {
    return;
  }
  return string_.charAt(0).toUpperCase() + string_.slice(1).toLowerCase();
};

export const formatDateOfBirth = (date: string) => {
  if (!date) {
    return '';
  }
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];
  const newDate = date.split('-');
  const day = newDate[0];
  const monthIndex = months.indexOf(newDate[1].toLowerCase()) + 1;
  const month =
    monthIndex.toString().length === 1
      ? '0' + monthIndex.toString()
      : monthIndex.toString();
  const year = newDate[2];
  return `${year}-${month}-${day}`;
};

export function checkCardExpiryStatus(expiryDate: string): string {
  // Convert the expiryDate string to a Date object
  const expiry = new Date(expiryDate);

  // Calculate the current date
  const currentDate = new Date();

  // Calculate the date 3 months from now
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(currentDate.getMonth() + 3);

  // Check the conditions
  if (expiry < currentDate) {
    return 'Card has already expired';
  }
  if (expiry <= threeMonthsFromNow) {
    return 'Card will expire in 3 months';
  }
  return 'Card is still valid in three months';
}
