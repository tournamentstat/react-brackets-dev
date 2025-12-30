import React, { useEffect, useState } from "react";
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
  BoxProps
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface EditableTextFieldProps
  extends Omit<React.ComponentProps<typeof TextField>, "onChange" | "value"> {
  onSave: (newValue: string) => void;
  text: string;
  hint: string;
  fitText: boolean;
  sizes: { font: number; resize: number; inputWidth: number };
  boxProps?: BoxProps
}

const EditableTextField = ({
  text,
  onSave,
  hint,
  fitText,
  sizes,
  boxProps
}: EditableTextFieldProps) => {
  const FONT_SIZE = sizes.resize;
  const DEFAULT_INPUT_WIDTH = sizes.inputWidth;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(text);
  const [isEditable, setIsEditable] = useState(false);
  const [inputWidth, setInputWidth] = useState(DEFAULT_INPUT_WIDTH);

  const handleSave = () => {
    onSave(value);
    setIsEditable(false);
  };

  const handleCancel = () => {
    setValue(text);
    setIsEditable(false);
  };

  const handleKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Enter") {
      handleSave();
    } else if (ev.key === "Escape") {
      handleCancel();
    }
  };

  useEffect(() => {
    if (!value) return;
    const inputElement = document.getElementById("editable-textfield");
    if (value.length * FONT_SIZE > DEFAULT_INPUT_WIDTH) {
      if (inputElement!.scrollWidth > value.length * FONT_SIZE) {
        setInputWidth((value.length + 1) * FONT_SIZE);
      }
    } else {
      setInputWidth(DEFAULT_INPUT_WIDTH);
    }
  }, [value]);

  return (
    <Box
      id="editable-textfield"
      sx={{
        justifyContent: "start",
        display: "flex",
      }}
      {...boxProps}
    >
      {isEditable ? (
        <ClickAwayListener onClickAway={handleCancel}>
          <TextField
            helperText={hint}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyPress}
            inputRef={(input) => input && input.focus()}
            multiline={isMobile}
            InputProps={{
              style: {
                width: fitText ? `${inputWidth}px` : "100%",
                fontSize: sizes.font,
                height: isMobile ? "100%" : "2.5em",
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    my: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    aria-label="save"
                    size={"small"}
                    component="span"
                    onClick={handleSave}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="cancel"
                    size={"small"}
                    component="span"
                    onClick={handleCancel}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </ClickAwayListener>
      ) : (
        <div>
          {value}
          <IconButton
            onClick={() => setIsEditable(true)}
            sx={{ margin: "0 0.7rem" }}
          >
            <EditIcon fontSize={sizes.font > 20 ? "medium" : "small"} />
          </IconButton>
        </div>
      )}
    </Box>
  );
};

export default EditableTextField;
