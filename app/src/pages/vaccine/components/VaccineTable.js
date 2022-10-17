import moment from "moment";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";

import { sortVaccinesData } from "utils/array";
import { getAllVaccines } from "redux/actions/vaccineAction";
import { showSuccessNotification } from "utils/notification";
import { deleteVaccine, editVaccine } from "services/vaccine";

import { VACCINE_DELETED_MESSAGE } from "constants/common";

export const VaccineTable = (props) => {
  const dispatch = useDispatch();

  const vaccines = useSelector((state) => state.vaccine.vaccines);

  const [vaccinesData, setVaccinesData] = useState(vaccines || []);

  let data = vaccinesData.map((vaccine) => ({
    ...vaccine,
    releaseDate: moment(vaccine.releaseDate).format("DD-MM-YYYY"),
    expirationDate: moment(vaccine.expirationDate).format("DD-MM-YYYY"),
  }));

  useEffect(() => {
    if (vaccines?.length) {
      setVaccinesData(vaccines);
    } else {
      dispatch(getAllVaccines());
    }
  }, [dispatch, vaccines]);

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

  const toggleMandatory = async (isMandatory, vaccine) => {
    const updatedVaccine = {
      ...vaccine,
      isMandatory: !isMandatory,
    };

    await editVaccine(updatedVaccine);

    getVaccineData();
  };

  const { Column } = Table;

  return (
    <div>
      <Table dataSource={data} pagination={false}>
        <Column
          title="Mandatory"
          dataIndex="isMandatory"
          key="isMandatory"
          render={(isMandatory, object, index) => {
            return (
              <div
                className="favourite-container"
                onClick={() => toggleMandatory(isMandatory, object)}
              >
                {isMandatory ? (
                  <StarFilled style={{ color: "orange" }} />
                ) : (
                  <StarOutlined />
                )}
              </div>
            );
          }}
        />
        <Column
          title=""
          dataIndex="photoUrl"
          key="photoUrl"
          render={(pic) => (
            <img src={pic} alt={pic + ""} className="profile-img" />
          )}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Manufacturer"
          dataIndex="manufacturer"
          key="manufacturer"
        />
        <Column
          title="Number of Doses"
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
          dataIndex="key"
          render={(key) => (
            <Space size="small">
              <Link to={`/vaccine/${key}/edit-vaccine`}>
                <div className="edit-link">Edit</div>
              </Link>

              <div
                className="delete-link"
                onClick={() => {
                  handleDelete(key);
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
