import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Divider,
  Box,
} from '@material-ui/core';
import MoreOptions from './MoreOptions';
import EditButtons from './EditButtons';
import HistoryButtons from './HistoryButtons';
import SaveJobSetButton from './SaveJobSetButton';
import LoadButton from './LoadButton';
import { useReadOnly } from '../../store/useSelectors';

const useStyles = makeStyles(theme => ({
  titleRow: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar - 1,
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
  },
  toolbar: { // move
    display: "flex",
    boxSizing: "border-box",
    boxShadow: "0px 6px 4px -6px rgba(0,0,0,0.75)",
    "& > *": {
      margin: "2px"
    },
  },
  separator: { flexGrow: 1 },
}));

const TitleRow = ({
  id,
  pageTitle,
  readOnly,
  isJsonEditorOpen,
  openJsonEditorCallback,
  closeJsonEditorCallback,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.titleRow}>
      <Toolbar className={classes.toolbar}>
        <h1>
          {pageTitle}
          <Box
            fontStyle="italic"
            color="text.hint"
            fontSize="h5.fontSize"
            component="span"
          >
            {readOnly ? "(read-only)" : "(edit)"}
          </Box>
        </h1>
        {id ? <LoadButton id={id} /> : null}
        <div className={classes.separator} />
        {!readOnly ? <HistoryButtons id={id} /> : null}
        {!readOnly ? <SaveJobSetButton id={id} /> : null}
        {id ? <EditButtons id={id} /> : null}
        <MoreOptions
          id={id}
          isJsonEditorOpen={isJsonEditorOpen}
          openJsonEditorCallback={openJsonEditorCallback}
          closeJsonEditorCallback={closeJsonEditorCallback}
        />
      </Toolbar>
      <Divider variant="middle" />
    </div>
  );
};
const TitleRowContainer = ({
  id,
  isJsonEditorOpen,
  openJsonEditorCallback,
  closeJsonEditorCallback,
}) => {
  const readOnly = useReadOnly();
  const pageTitle = id ? `Job Set #${id}` : "New Job Set";
  return (
    <TitleRow
      id={id}
      pageTitle={pageTitle}
      readOnly={readOnly}
      isJsonEditorOpen={isJsonEditorOpen}
      openJsonEditorCallback={openJsonEditorCallback}
      closeJsonEditorCallback={closeJsonEditorCallback}
    />
  )
};

export default TitleRowContainer;