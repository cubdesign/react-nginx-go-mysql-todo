import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="input here!" {...register("text")} />
        <button type="submit">add</button>
        <p>{errors.text && errors.text.message}</p>
      </form>
    </div>
  );
};

export default AddTodoForm;
