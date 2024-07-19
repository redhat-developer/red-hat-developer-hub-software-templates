import { Theme } from "@material-ui/core";

export const getChipStyle = (theme: Theme) => {
  return {
    backgroundColor: theme.palette.type === "dark" ? "#3d5061" : "#e7f1fa",
  };
};
