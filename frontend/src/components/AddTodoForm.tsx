import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Box, TextField, Button, FormHelperText } from "@mui/material";

type FormInput = {
  text: string;
};

const schema = yup.object({
  text: yup.string().required("必須です"),
});

export type AddTodoFormProps = {
  addTodo: (text: string) => void;
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    try {
      const trimmedText = data.text.trim();
      if (trimmedText.length === 0) return;
      addTodo(trimmedText);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap={1}>
        <TextField
          error={errors.text ? true : false}
          variant="outlined"
          placeholder="input here!"
          {...register("text")}
          sx={{ flexGrow: 1 }}
        />
        <Button type="submit" variant="contained" size="large">
          add
        </Button>
      </Box>
      <FormHelperText error={errors.text ? true : false}>
        {errors.text && errors.text.message}
      </FormHelperText>
    </Box>
  );
};

export default AddTodoForm;
