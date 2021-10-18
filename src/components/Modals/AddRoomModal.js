import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    setIsAddRoomVisible(false);

    // reset form value
    form.resetFields();
  };

  const handleCancel = () => {
    setIsAddRoomVisible(false);

    // reset form value
    form.resetFields();
  };
  return (
    <Modal
      title="Tạo phòng"
      visible={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên phòng" name="name">
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
