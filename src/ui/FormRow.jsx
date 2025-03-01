import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const Formrow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, children }) {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <Formrow>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {errors[children?.props?.id] && (
        <Error>{errors[children?.props?.id].message}</Error>
      )}
    </Formrow>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default FormRow;
