import {
  Tag,
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
  HeatMapOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import debounce from "lodash/debounce";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { truncate } from "utils/string";
import { handleError } from "utils/error";
import { truncateArray } from "utils/array";
import { showSuccessNotification } from "utils/notification";

import useDocumentTitle from "hooks/useDocumentTitle";
import VaccineFormModal from "./components/VaccineFormModal";
import { getAllVaccines, getVaccineCount } from "redux/actions/vaccineAction";
import { deleteVaccine, updateVaccineMandatoryStatus } from "services/vaccine";

import {
  SUCCESS,
  DATE_FORMAT,
  VACCINE_METADATA,
  MIN_DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  ALLERGY_RISK_COLOR,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_VACCINE_IMAGE,
  VACCINE_METADATA_ENUM,
  VACCINE_METADATA_COLOR,
  VACCINE_DELETED_MESSAGE,
  VACCINE_METADATA_COLOR_CODE,
  VACCINE_MANDATORY_UPDATE_MESSAGE,
} from "constants/common";

const Vaccines = (props) => {
  const dispatch = useDispatch();

  const vaccines = useSelector((state) => state.data.vaccine.vaccines);
  const isVaccinesLoading = useSelector(
    (state) => state.ui.vaccine.isVaccinesLoading
  );
  const vaccineCount = useSelector((state) => state.data.vaccine.vaccineCount);

  useDocumentTitle("Vaccines");

  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [metaQuery, setMetaQuery] = useState(VACCINE_METADATA.TOTAL);

  useEffect(() => {
    dispatch(getAllVaccines({ mandatory: metaQuery, search: searchValue }));
  }, [dispatch, metaQuery, searchValue]);

  useEffect(() => {
    dispatch(getVaccineCount());
  }, [dispatch]);

  const handleUpdateMandatory = async (vaccine) => {
    try {
      setIsUpdating(true);

      await updateVaccineMandatoryStatus(vaccine.id, {
        isMandatory: !vaccine.isMandatory,
      });

      await dispatch(
        getAllVaccines({ mandatory: metaQuery, search: searchValue })
      );
      await dispatch(getVaccineCount());

      showSuccessNotification(SUCCESS, VACCINE_MANDATORY_UPDATE_MESSAGE);
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

      await dispatch(
        getAllVaccines({ mandatory: metaQuery, search: searchValue })
      );
      await dispatch(getVaccineCount());

      showSuccessNotification(SUCCESS, VACCINE_DELETED_MESSAGE);
    } catch (err) {
      handleError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const showDeleteVaccineModal = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this vaccine?",
      icon: <HeatMapOutlined style={{ color: "red" }} />,
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
      <PageHeader
        title={<h1 className="vaccines-header-title">All Vaccines</h1>}
        tags={
          vaccineCount.total > 0 &&
          VACCINE_METADATA_ENUM.map((meta, index) => (
            <Tag
              key={index}
              color={
                meta === metaQuery
                  ? VACCINE_METADATA_COLOR_CODE[meta]
                  : VACCINE_METADATA_COLOR[meta]
              }
              style={{ cursor: "pointer" }}
              onClick={() => setMetaQuery(meta)}
            >
              {meta}: {vaccineCount[meta.toLowerCase()]}
            </Tag>
          ))
        }
        extra={[
          <Button key={1} type="primary" onClick={() => setShowModal(true)}>
            Add vaccine
          </Button>,
          <Input
            key={2}
            placeholder="Search Vaccines"
            value={searchValue}
            allowClear
            onChange={(e) =>
              debounce(setSearchValue(e.target.value), MIN_DEBOUNCE_TIME)
            }
          />,
        ]}
      />
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
          loading={isVaccinesLoading}
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
                  key={object.id}
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
            key="manufacturer"
            width={150}
            ellipsis={{ showTitle: false }}
            render={(manufacturer) => (
              <Tooltip placement="topLeft" title={manufacturer}>
                {manufacturer}
              </Tooltip>
            )}
          />
          <Column
            title="No. of Doses"
            dataIndex="numberOfDoses"
            key="numberOfDoses"
            align="center"
          />
          <Column
            title="Release Date"
            dataIndex="releaseDate"
            key="releaseDate"
            render={(releaseDate) => moment(releaseDate).format(DATE_FORMAT)}
          />
          <Column
            title="Expiration Date"
            dataIndex="expirationDate"
            key="expirationDate"
            render={(expirationDate) =>
              moment(expirationDate).format(DATE_FORMAT)
            }
          />
          <Column
            title={
              <div className="d-flex align-items-center">
                <div>Allergies</div>
                <div className="table-header-icon">
                  <Tooltip
                    title="Allergies have their own risk among 'High', 'Medium' and 'Low' and color coded accordingly as 
                  'Red', 'Orange' and 'Green' respectively."
                  >
                    <InfoCircleOutlined className="ml-2 cursor-pointer" />
                  </Tooltip>
                </div>
              </div>
            }
            dataIndex="allergies"
            key="allergies"
            ellipsis={{ showTitle: false }}
            width={200}
            render={(allergies) => {
              const allergiesList =
                allergies?.length > 0 && truncateArray(allergies);

              return allergies?.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {allergiesList.map(({ id, allergy, risk }) => (
                    <Tag
                      key={id}
                      className="mb-10x"
                      color={ALLERGY_RISK_COLOR[risk]}
                    >
                      <Tooltip title={allergy}>{truncate(allergy, 25)}</Tooltip>
                    </Tag>
                  ))}
                  {allergies?.length > 5 && <span>...</span>}
                </div>
              ) : (
                <span>-</span>
              );
            }}
          />
          <Column
            title=""
            key="action"
            dataIndex="id"
            selections={false}
            render={(id, object) => (
              <Space size="small" className="actions-container">
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

export default Vaccines;
