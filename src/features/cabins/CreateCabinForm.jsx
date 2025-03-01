import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCabinFormSchema } from "../../utils/CabinsSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

import styled from "styled-components";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function CreateCabinForm() {
  const methods = useForm({
    mode: "all",
    // resolver: zodResolver(createCabinFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = methods;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, image: data.image[0] });
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Cabin name">
          <Input
            type="text"
            id="name"
            {...register("name")}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label="maxCapacity">
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", { valueAsNumber: true })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label="regularPrice">
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice", { valueAsNumber: true })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label="discount">
          <Input
            type="number"
            id="discount"
            {...register("discount", { valueAsNumber: true })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label="description">
          <Textarea
            type="text"
            id="description"
            {...register("description")}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow label="image">
          <FileInput
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
            disabled={isCreating}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isCreating ? "Creating..." : "Edit cabin"}
          </Button>
        </FormRow>
      </Form>
    </FormProvider>
  );
}

export default CreateCabinForm;
