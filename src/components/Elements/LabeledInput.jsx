import React from "react";
import Input from "./Input";

function LabeledInput(Props) {
  const { label, id, ...rest } = Props;

  return (
    <>
      <label htmlFor={id} className="block text-sm mb-2">
        {label}
      </label>
      <Input id={id} {...rest} />
    </>
  );
}

export default LabeledInput;