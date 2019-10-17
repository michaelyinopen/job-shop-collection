import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { useJobColor } from './store/useSelectors';
import DeleteJobButton from './DeleteJobButton';
import JobOptionsButton from './JobOptionsButton';
//import Procedures from './Procedures';
import { job as jobStyle } from './sharedStyles';

const useStyles = makeStyles(theme => ({
  job: jobStyle(theme),
  headerRow: { display: "flex" },
  jobTitle: {
    display: "inline-flex",
    marginBlockStart: theme.spacing(1),
    marginBlockEnd: theme.spacing(1),
  },
  jobTitleColorBox: {
    display: "inline-block",
    padding: "0 4px",
    margin: "0 2px",
    borderRadius: "4px",
  },
  addButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  addIcon: { marginRight: theme.spacing(0.5) },
  separator: { flexGrow: 1 },
  headerRowActions: { display: "inline-flex", alignItems: "center" },
}));

const Job = React.memo(({
  id,
  backgroundColor,
  foregroundColor
}) => {
  const classes = useStyles();
  return (
    <Card component="section" className={classes.job}>
      <div className={classes.headerRow}>
        <h3 className={classes.jobTitle}>
          Job
          <div
            className={classes.jobTitleColorBox}
            style={{ backgroundColor: backgroundColor, color: foregroundColor }}
          >
            {id}
          </div>
        </h3>
        <div className={classes.separator} />
        <aside className={classes.headerRowActions}>
          <JobOptionsButton id={id} />
          <DeleteJobButton id={id} />
        </aside>
      </div>
      {/* <Procedures jobId={id} /> */}
    </Card>
  );
});

const JobContainer = ({
  id
}) => {
  const [backgroundColor, foregroundColor] = useJobColor(id);
  return (
    <Job
      id={id}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    />
  );
};

export default JobContainer;