/* eslint-disable react/prop-types */
import { InputAdornment } from "@mui/material";

export const InputIcon = ({
  icon,
  color,
  iconSecond,
  changeIcon,
  valueChange = false,
}) => {
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
