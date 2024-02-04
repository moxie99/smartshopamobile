import React, { Component, ErrorInfo } from 'react';
import { StyleSheet } from 'react-native';

import { ScrollBox } from '../Base';
import { Text } from '../Typography';

import Fallback from './FallBack';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
});

interface State {
  errorMessage: string;
  hasError: boolean;
  info: ErrorInfo;
}

interface Props {
  children: React.ReactNode;
}

/**
 * ErrorBoundary component to catch errors in its children and display a Fallback Screen.
 * We can get the information about which part in our component tree threw the error by using
 * the `getDerivedStateFromError` method and `componentDidCatch` lifecycle method.
 * This information can be forwarded to a logging service
 *
 * We use the component to wrap our entire application.
 * @example
 * ```tsx
 * const App = () => (
 *    <ErrorBoundary>
 *      <MyApp />
 *    </ErrorBoundary>
 * );
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: '',
      hasError: false,
      info: { componentStack: '' },
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorMessage: error.message, hasError: true, info });
  }

  render() {
    if (this.state.hasError) {
      if (__DEV__) {
        return (
          <ScrollBox contentContainerStyle={styles.container}>
            <Text variant='body'>{this.state.errorMessage}</Text>
            <Text variant='body'>{this.state.info?.componentStack}</Text>
          </ScrollBox>
        );
      }
      return <Fallback />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
