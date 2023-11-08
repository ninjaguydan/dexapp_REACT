import Modal from "components/modules/Modal";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeletePost({ onClose, onConfirm }: Props) {
  return (
    <Modal
      closeModal={onClose}
      onConfirm={onConfirm}>
      <Modal.Header>Delete Post</Modal.Header>
      <Modal.Body>
        <p className="my-4">Are you sure you want to delete this post? This action can't be undone.</p>
      </Modal.Body>
      <Modal.Footer>Delete</Modal.Footer>
    </Modal>
  );
}
