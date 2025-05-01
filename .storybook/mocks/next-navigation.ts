export const mockRouter = {
  push: (path: string) => {
    console.log(`Navigating to: ${path}`);
  },
  back: () => {
    console.log("Going back");
  },
  forward: () => {
    console.log("Going forward");
  },
  refresh: () => {
    console.log("Refreshing");
  },
  replace: (path: string) => {
    console.log(`Replacing with: ${path}`);
  },
};

export const useRouter = () => mockRouter;
