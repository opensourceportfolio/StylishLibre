import * as React from 'react';

import { Status } from '../api/fetch';
import { Attempt } from '../model/response';

export type ResetStatusFn = (newStatus?: Status) => void;

export default function useAsyncScreen<T>(
  initialStatus: Status,
  thunk: () => Attempt<T>,
): [Status, ResetStatusFn] {
  const [screenStatus, setScreenStatus] = React.useState(initialStatus);
  const resetScreenStatus = React.useCallback((newStatus?: Status) => {
    setScreenStatus(newStatus ?? initialStatus);
  }, []);

  React.useEffect(() => {
    screenStatus === Status.loading &&
      thunk().then((res) => {
        if (res?.type == 'failure') {
          return setScreenStatus(Status.failure);
        } else {
          return setScreenStatus(Status.success);
        }
      });
  }, [screenStatus]);

  return [screenStatus, resetScreenStatus];
}
