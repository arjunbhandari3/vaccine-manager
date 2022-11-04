import {
  Spin,
  Space,
  Input,
  Table,
  Modal,
  Button,
  Avatar,
  Tooltip,
  PageHeader,
} from "antd";
import {
  StarFilled,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleError } from "utils/error";
import { deleteVaccine, updateVaccine } from "services/vaccine";
import useDocumentTitle from "hooks/useDocumentTitle";
import { getAllVaccines } from "redux/actions/vaccineAction";
import VaccineFormModal from "./components/VaccineFormModal";
import { showSuccessNotification } from "utils/notification";

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_VACCINE_IMAGE,
  VACCINE_DELETED_MESSAGE,
  VACCINE_MANADATORY_UPDATE_MESSAGE,
} from "constants/common";

export const Vaccines = (props) => {
  const dispatch = useDispatch();

  const vaccines = useSelector((state) => state.data.vaccine.vaccines);
  const isVaccinesLoading = useSelector(
    (state) => state.ui.vaccine.isVaccinesLoading
  );

  useDocumentTitle("Vaccines");

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [value, setValue] = useState("");
  const [vaccinesData, setVaccinesData] = useState(vaccines);

  useEffect(() => {
    setVaccinesData(vaccines);
  }, [vaccines]);

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

  const handleUpdateMandatory = async (vaccine) => {
    try {
      setIsUpdating(true);

      await updateVaccine(vaccine.id, { isMandatory: !vaccine.isMandatory });
      await dispatch(getAllVaccines());

      showSuccessNotification(VACCINE_MANADATORY_UPDATE_MESSAGE);
    } catch (err) {
      handleError(err);
    } finally {
      setIsUpdating(false);
      setSelectedVaccine(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);

      await deleteVaccine(id);

      await dispatch(getAllVaccines());

      showSuccessNotification(VACCINE_DELETED_MESSAGE);
    } catch (err) {
      handleError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const showDeleteVaccineModal = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this vaccine?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Delete Vaccine",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      confirmLoading: isDeleting,
    });
  };

  const { Column } = Table;

  return (
    <div className="vaccines-container">
      <VaccineFormModal
        vaccine={null}
        open={showModal}
        onCancel={() => setShowModal(false)}
      />

      <PageHeader
        title={<h1 className="vaccines-header-title">All Vaccines</h1>}
        extra={[
          <Input
            key={1}
            placeholder="Search Vaccines"
            value={value}
            onChange={(e) => {
              if (e.target.value === "") {
                setVaccinesData(vaccines);
              } else {
                setVaccinesData(
                  vaccines.filter((vaccine) =>
                    vaccine.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
                );
              }

              setValue(e.target.value);
            }}
          />,
          <Button key={2} type="primary" onClick={() => setShowModal(true)}>
            Add vaccine
          </Button>,
        ]}
      />
      <div>
        <Table
          dataSource={vaccinesData}
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
            width={80}
            render={(value, item, index) =>
              (pageNumber - 1) * pageSize + index + 1
            }
          />

          <Column
            title=""
            dataIndex="photoUrl"
            key="photoUrl"
            align="center"
            width={80}
            render={(pic) => {
              pic = pic || DEFAULT_VACCINE_IMAGE;

              return <Avatar size={40} src={pic} />;
            }}
          />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Mandatory"
            dataIndex="isMandatory"
            key="isMandatory"
            align="center"
            width={120}
            render={(isMandatory, object) => {
              return isUpdating && selectedVaccine === object.id ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                <Tooltip title={"Change Mandatory Status"}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedVaccine(object.id);
                      handleUpdateMandatory(object);
                    }}
                  >
                    {isMandatory ? (
                      <StarFilled style={{ color: "orange", fontSize: 20 }} />
                    ) : (
                      <StarOutlined style={{ fontSize: 20 }} />
                    )}
                  </div>
                </Tooltip>
              );
            }}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            width={200}
            ellipsis={{ showTitle: false }}
            render={(description) => (
              <Tooltip placement="topLeft" title={description}>
                {description}
              </Tooltip>
            )}
          />
          <Column
            title="Manufacturer"
            dataIndex="manufacturer"
            ellipsis={{ showTitle: false }}
            key="manufacturer"
          />
          <Column
            title="No. of Doses"
            dataIndex="numberOfDoses"
            key="numberOfDoses"
            align="center"
            width={120}
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
                <Tooltip title="Edit Vaccine">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedVaccine(object);
                    }}
                  >
                    <EditOutlined style={{ fontSize: 20, color: "blue" }} />
                  </div>
                </Tooltip>
                <Tooltip title="Delete Vaccine">
                  <div
                    className="cursor-pointer"
                    onClick={() => showDeleteVaccineModal(id)}
                  >
                    <DeleteOutlined style={{ fontSize: 20, color: "red" }} />
                  </div>
                </Tooltip>
              </Space>
            )}
          />
        </Table>
        <VaccineFormModal
          vaccine={selectedVaccine}
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            setSelectedVaccine(null);
          }}
        />
      </div>
    </div>
  );
};
