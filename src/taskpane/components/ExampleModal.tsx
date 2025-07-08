import * as React from "react";
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogActions, Button } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

const ExampleModal: React.FC = () => {
  const navigate = useNavigate();
  const handleClose = () => navigate("/", { replace: true });

  return (
    <Dialog open modalType="modal" onOpenChange={handleClose}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Modal de ejemplo</DialogTitle>
          <div>¡Este es un modal controlado por React Router y Fluent UI!</div>
          <DialogActions>
            <Button appearance="primary" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ExampleModal; 