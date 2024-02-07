import React from "react";

function FormError(props) {
  return <p style={{ color: "red" }}>{props.err}</p>;
}

export default FormError;
