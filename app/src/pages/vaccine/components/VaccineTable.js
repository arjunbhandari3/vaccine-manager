import {
  StarFilled,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Space, Table, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { handleError } from "utils/error";
import { deleteVaccine } from "services/vaccine";
import useDocumentTitle from "hooks/useDocumentTitle";
import { showSuccessNotification } from "utils/notification";
import { getAllVaccines } from "redux/actions/vaccineAction";

import VaccineModal from "./VaccineModal";

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_VACCINE_IMAGE,
  VACCINE_DELETED_MESSAGE,
} from "constants/common";

const VaccineTable = (props) => {
  const dispatch = useDispatch();

  const vaccines = useSelector((state) => state.data.vaccine.vaccines);
  const isVaccinesLoading = useSelector(
    (state) => state.ui.vaccine.isVaccinesLoading
  );

  useDocumentTitle("Vaccines");

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        setLoading(true);

        await dispatch(getAllVaccines());
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteVaccine(id);
      await dispatch(getAllVaccines());

      showSuccessNotification(VACCINE_DELETED_MESSAGE);
    } catch (err) {
      handleError(err);
    }
  };

  const { Column } = Table;

  return (
    <div>
      <Table
        dataSource={vaccines}
        pagination={{
          onChange(current, pageSize) {
            setPageNumber(current);
            setPageSize(pageSize);
          },
          defaultPageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
        }}
        loading={isVaccinesLoading || loading}
      >
        <Column
          title="S.N."
          key="index"
          render={(value, item, index) =>
            (pageNumber - 1) * pageSize + index + 1
          }
        />
        <Column
          title="Mandatory"
          dataIndex="isMandatory"
          key="isMandatory"
          colSpan={1}
          render={(isMandatory) => {
            return isMandatory ? (
              <StarFilled style={{ color: "orange", fontSize: 20 }} />
            ) : (
              <StarOutlined style={{ fontSize: 20 }} />
            );
          }}
        />
        <Column
          title=""
          dataIndex="photoUrl"
          key="photoUrl"
          render={(pic) => {
            pic = pic || DEFAULT_VACCINE_IMAGE;

            return <Avatar size={40} src={pic} />;
          }}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Description"
          dataIndex="description"
          key="description"
          ellipsis={true}
        />
        <Column
          title="Manufacturer"
          dataIndex="manufacturer"
          key="manufacturer"
        />
        <Column
          title="No. of Doses"
          dataIndex="numberOfDoses"
          key="numberOfDoses"
        />
        <Column
          title="Release Date"
          dataIndex="releaseDate"
          key="releaseDate"
        />
        <Column
          title="Expiration Date"
          dataIndex="expirationDate"
          key="expirationDate"
        />
        <Column
          title="Action"
          key="action"
          dataIndex="id"
          render={(id, object) => (
            <Space size="small">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setSelectedVaccine(object);
                }}
              >
                <EditOutlined style={{ fontSize: 20, color: "blue" }} />
              </div>

              <div
                className="cursor-pointer"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <DeleteOutlined style={{ fontSize: 20, color: "red" }} />
              </div>
            </Space>
          )}
        />
      </Table>
      <VaccineModal
        vaccine={selectedVaccine}
        visible={showModal}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default VaccineTable;
