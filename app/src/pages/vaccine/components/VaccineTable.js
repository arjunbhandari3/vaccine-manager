import {
  StarFilled,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { handleError } from "utils/error";
import { deleteVaccine } from "services/vaccine";
import useDocumentTitle from "hooks/useDocumentTitle";
import { showSuccessNotification } from "utils/notification";
import { getAllVaccines } from "redux/actions/vaccineAction";

import {
  DEFAULT_VACCINE_IMAGE,
  VACCINE_DELETED_MESSAGE,
} from "constants/common";

export const VaccineTable = (props) => {
  const dispatch = useDispatch();

  const vaccines = useSelector((state) => state.data.vaccine.vaccines);
  const isVaccinesLoading = useSelector(
    (state) => state.ui.vaccine.isVaccinesLoading
  );

  useDocumentTitle("Vaccines");

  const [loading, setLoading] = useState(false);

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
      dispatch(getAllVaccines());

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
        pagination={true}
        loading={isVaccinesLoading || loading}
      >
        <Column
          title="Mandatory"
          dataIndex="isMandatory"
          key="isMandatory"
          render={(isMandatory) => {
            return isMandatory ? (
              <StarFilled style={{ color: "orange" }} />
            ) : (
              <StarOutlined />
            );
          }}
        />
        <Column
          title=""
          dataIndex="photoUrl"
          key="photoUrl"
          render={(pic) => {
            pic = pic || DEFAULT_VACCINE_IMAGE;

            return <img src={pic} alt="vaccine" className="vaccine-img" />;
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
          render={(id) => (
            <Space size="small">
              <Link to={`/vaccines/${id}/edit-vaccine`}>
                <div className="cursor-pointer">
                  <EditOutlined style={{ fontSize: "16px", color: "blue" }} />
                </div>
              </Link>

              <div
                className="cursor-pointer"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <DeleteOutlined style={{ fontSize: "16px", color: "red" }} />
              </div>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
