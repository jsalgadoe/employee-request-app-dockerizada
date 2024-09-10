import { InputAdornment } from "@mui/material";
import React from "react";

interface Props {
  icon: React.ReactNode;
  color: string;
  iconSecond?: React.ReactNode;
  valueChange?: boolean;
  changeIcon?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

export const InputIcon = ({
  icon,
  color,
  iconSecond,
  changeIcon,
  valueChange = false,
}: Props) => {
  return (
    <>
      <div
        onClick={() => {
          if (!!changeIcon) {
            changeIcon(!valueChange);
          }
        }}
      >
        <InputAdornment position="start" sx={{ color }}>
          {!!iconSecond ? (valueChange ? icon : iconSecond) : icon}
        </InputAdornment>
      </div>
    </>
  );
};
