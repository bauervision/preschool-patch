import React from "react";
import { ErrorIcon } from "../images";

const Error = ({ errorMessage }) => (
  <div className="LoginError Flex JustifyCenter AlignItems">
    <img src={ErrorIcon} alt="Error Icon" />
    {errorMessage}
  </div>
);

export default Error;
