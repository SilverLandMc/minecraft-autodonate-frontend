import Sentry from "shared/aliases/Sentry";

const componentLoader = <T>(
  lazyComponent: () => Promise<{ default: T }>,
  attemptsLeft = 3,
  interval = 1000,
): Promise<{ default: T }> => {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error) => {
        setTimeout(async () => {
          if (attemptsLeft === 1) {
            Sentry.captureMessage("ComponentLoader: failed, reload page");
            window.location.reload();
            await new Promise((resolve) => setTimeout(resolve, 5000));
            reject(error);
            return;
          }
          componentLoader(lazyComponent, attemptsLeft - 1, interval).then(
            resolve,
            reject,
          );
        }, interval);
      });
  });
};

export default componentLoader;
