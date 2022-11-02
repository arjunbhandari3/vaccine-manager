import moment from "moment";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";

import { sortVaccinesData } from "utils/array";
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

  const vaccines = useSelector((state) => state.vaccine.vaccines);

  const [vaccinesData, setVaccinesData] = useState(vaccines || []);

  useDocumentTitle("Vaccines");

  const formatVaccineData = useCallback((vaccines) => {
    return vaccines.map((vaccine) => ({
      ...vaccine,
      releaseDate: moment(vaccine.releaseDate).format("YYYY-MM-DD"),
      expirationDate: moment(vaccine.expirationDate).format("YYYY-MM-DD"),
    }));
  }, []);

  useEffect(() => {
    if (vaccines?.length) {
      setVaccinesData(formatVaccineData(vaccines));
    } else {
      dispatch(getAllVaccines());
    }
  }, [dispatch, vaccines, formatVaccineData]);

  const getVaccineData = useCallback(async () => {
    const vaccines = await getAllVaccines();
    const sortedVaccines = sortVaccinesData(vaccines);

    setVaccinesData(sortedVaccines);
    dispatch(getAllVaccines());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await deleteVaccine(id);

    showSuccessNotification(VACCINE_DELETED_MESSAGE);

    getVaccineData();
  };

  const { Column } = Table;

  return (
    <div>
      <Table dataSource={vaccinesData} pagination={false}>
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
        <Column title="Description" dataIndex="description" key="description" />
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
                <div className="edit-link">Edit</div>
              </Link>

              <div
                className="delete-link"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                Delete
              </div>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
