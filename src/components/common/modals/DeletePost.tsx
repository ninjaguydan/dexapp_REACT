import Modal from "components/modules/Modal";

import { titleCase } from "utils/Helpers";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
  label: string;
};

export default function DeletePost({ onClose, onConfirm, label }: Props) {
  return (
    <Modal
      closeModal={onClose}
      onConfirm={onConfirm}>
      <Modal.Header>Delete {titleCase(label)}</Modal.Header>
      <Modal.Body>
        <p className="my-4">Are you sure you want to delete this {label}? This action can't be undone.</p>
      </Modal.Body>
      <Modal.Footer>Delete</Modal.Footer>
    </Modal>
  );
}
