import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
      margin: "4px"
    },
  },
  separator: { flexGrow: 1 },
}));

// const MoreOptions = ({
//   id,
//   pageTitle,
//   readOnly,
//   openJsonEditorCallback,
//   closeJsonEditorCallback,
// }) => {
//   const classes = useStyles();
//   return (
//     <Menu
//       anchorEl={anchorEl}
//       keepMounted
//       open={open}
//       onClose={handleClose}
//     >
//       {id ? (
//         <MenuItem onClick={openInNewTabCallback} onContextMenu={preventDefaultPropagation}>
//           <ListItemIcon>
//             <OpenInNewIcon />
//           </ListItemIcon>
//           <DeleteJobSetButton id={id} />
//         </MenuItem>
//       ) : null}
//     </Menu>
//   );
// };
const MoreOptionsContainer = ({
  id,
  openJsonEditorCallback,
  closeJsonEditorCallback,
}) => {
  return (
    <div
    />
  )
};

export default MoreOptionsContainer;