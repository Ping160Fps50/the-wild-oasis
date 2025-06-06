import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import styled from "styled-components";
import PropTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [show, setShow] = useState(false);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const handleDelete = () => {
    deleteCabin(cabinId);
  };
  const { createCabin, isCreating } = useCreateCabin();
  const handleDuplicate = () => {
    createCabin({
      name: `Copy Of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  };
  return (
    <>
      <TableRow role="row">
        <Img src={image} alt="wild oasis cabin" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShow((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={handleDelete} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {show && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
