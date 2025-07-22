import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface AlertDialogSlideProps {
  open: boolean;
  isPending: boolean;
  title?: string;
  message?: string;
  agreeLabel?: string;
  cancelLabel?: string;
  handleAgree: () => void;
  handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide  ref={ref} {...props} />;
});


const AlertDialogSlide: React.FC<AlertDialogSlideProps> = ({
  open,
  title = "تأكيد العملية",
  message = "هل أنت متأكد أنك تريد تنفيذ هذا الإجراء؟",
  agreeLabel = "نعم",
  cancelLabel = "إلغاء",
  handleAgree,
  handleClose,
  isPending = false,
}) => {
  return (
    <Dialog
      fullWidth
      open={open}
      slots={{ transition: Transition }}
      slotProps={{ transition: { direction: "up" } }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="fs-2 fw-bold">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="fs-3 fw-medium w-100"
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="d-flex justify-content-between gap-2 ">
        <Button
          variant="contained"
          color="error"
          onClick={handleAgree}
          type="button"
          disabled={isPending}
          className="fs-5 w-25"
        >
          {agreeLabel}
        </Button>

        <Button
          variant="outlined"
          onClick={handleClose}
          type="button"
          className="fs-5 w-25"
        >
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogSlide;
