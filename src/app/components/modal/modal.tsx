// components/CustomModal.tsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<CustomModalProps> = ({ open, onClose, title, content, actions }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {actions ? (
          actions
        ) : (
          <>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onClose}>确定</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
