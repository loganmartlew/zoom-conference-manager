import { usePublishEvent } from './api/publishEvent';
import { useUnpublishEvent } from './api/unpublishEvent';

export const usePublish = (postExecute: () => void) => {
  const onSuccess = () => {
    postExecute();
  };

  const onError = () => {
    postExecute();
    console.log('Error');
  };

  const { mutate: publish } = usePublishEvent(onSuccess, onError);
  const { mutate: unpublish } = useUnpublishEvent(onSuccess, onError);

  return { publish, unpublish };
};
