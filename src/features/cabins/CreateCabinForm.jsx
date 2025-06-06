import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCabinFormSchema } from "../../utils/CabinsSchema";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import PropTypes from "prop-types";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const methods = useForm({
    mode: "all",
    defaultValues: isEditSession ? editValues : {},
    // resolver: zodResolver(createCabinFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = methods;

  const { createCabin, isCreating } = useCreateCabin(reset);
  const { editCabin, isEditing } = useEditCabin(reset);

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Cabin name">
          <Input
            type="text"
            id="name"
            {...register("name")}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="maxCapacity">
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", { valueAsNumber: true })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="regularPrice">
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice", { valueAsNumber: true })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="discount">
          <Input
            type="number"
            id="discount"
            {...register("discount", { valueAsNumber: true })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="description">
          <Textarea
            type="text"
            id="description"
            {...register("description")}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="image">
          <FileInput
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession
              ? isWorking
                ? "Editing..."
                : "Edit Cabin"
              : isWorking
              ? "Creating..."
              : "Create New Cabin"}
          </Button>
        </FormRow>
      </Form>
    </FormProvider>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
