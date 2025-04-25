import { Box, Field, Text, Input, Textarea } from "@chakra-ui/react";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
type props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  label: string;
  defaultValue?: string;
  textArea?: boolean;
  type?: string;
  field: Path<T>;
  error?: string;
  className?: string;
};
const InputField = <T extends FieldValues>({
  label,
  field,
  register,
  textArea,
  type,
  defaultValue,
  error,
  className,
}: props<T>) => {
  return (
    <Box>
      {textArea ? (
        <Field.Root>
          <Field.Label>
            {label.slice(0, 1).toUpperCase() + label.slice(1)}
          </Field.Label>
          <Textarea
            {...register(field)}
            className={className ? className : ""}
            defaultValue={defaultValue ? defaultValue : ""}
          />
        </Field.Root>
      ) : (
        <Field.Root>
          <Field.Label>
            {label.slice(0, 1).toUpperCase() + label.slice(1)}
          </Field.Label>
          <Input
            type={type ? type : "text"}
            {...register(field)}
            className={className ? className : ""}
            defaultValue={defaultValue ? defaultValue : ""}
          />
        </Field.Root>
      )}

      <Text className="text-red-600 text-sm">{error}</Text>
    </Box>
  );
};

export default InputField;
