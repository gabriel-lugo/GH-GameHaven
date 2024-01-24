import { Button, Modal, Text } from "@mantine/core";

interface DeleteAccountModalProps {
  opened: boolean;
  onClose: () => void;
  onDeleteAccount: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  opened,
  onClose,
  onDeleteAccount,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete Account"
      size="auto"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text mt={"lg"} mb={"lg"}>
        Are you sure? Your account and all your data will be removed.
      </Text>
      <Button
        color="green"
        style={{ marginRight: "10px" }}
        onClick={onDeleteAccount}
      >
        Yes
      </Button>
      <Button color="red" onClick={onClose}>
        No
      </Button>
    </Modal>
  );
};

export default DeleteAccountModal;
