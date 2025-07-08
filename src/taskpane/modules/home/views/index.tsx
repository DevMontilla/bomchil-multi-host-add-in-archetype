import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import { Button } from "@fluentui/react-components";

const HomeView = () => {
  const navigate = useNavigate();
  const styles = useStyles();
  return (
    <div>
      <h1>Home</h1>
      <Button
        onClick={() => navigate("/modal/ejemplo")}
        className={styles.button}
      >
        Modal de Ejemplo
      </Button>

      <Button
        onClick={() => navigate("/view")}
        className={styles.button}
      >
        Abrir View
      </Button>
    </div>
  );
};

export default HomeView;
