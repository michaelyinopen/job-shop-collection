export const machine = theme => ({
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  margin: theme.spacing(1),
  maxWidth: "600px",
  display: "flex",
  alignItems: "baseline"
});

const sharedStyles = theme => ({
  machine: machine(theme),
});

export default sharedStyles;