import {
  Controller,
  ExtractControllerData,
} from '@zoom-conference-manager/api-interfaces';
import { AxiosResponse } from 'axios';

// eslint-disable-next-line func-names
export default function <T extends Controller<ExtractControllerData<T>>>(
  fetcher: Promise<AxiosResponse<unknown, unknown>>
) {
  return (fetcher as ReturnType<T>).then((res) => {
    if (res.error) {
      throw new Error();
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return res.data!;
  });
}
