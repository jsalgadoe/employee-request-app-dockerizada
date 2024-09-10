import { Button } from "@mui/material";
import PropTypes from "prop-types";

export const ButtonSubmit = ({ isSubmitting }) => {
  return (
    <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
      {isSubmitting ? "Enviando..." : "Enviar"}
    </Button>
  );
};

ButtonSubmit.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};
