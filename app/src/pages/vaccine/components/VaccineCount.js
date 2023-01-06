import { Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getVaccineCount } from "redux/actions/vaccineAction";

import {
  VACCINE_METADATA_ENUM,
  VACCINE_METADATA_COLOR,
  VACCINE_METADATA_COLOR_CODE,
} from "constants/common";

const VaccineCount = (props) => {
  const { metaQuery, setMetaQuery } = props;

  const vaccineCount = useSelector((state) => state.data.vaccine.vaccineCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccineCount());
  }, [dispatch]);

  return (
    vaccineCount?.total > 0 &&
    VACCINE_METADATA_ENUM.map((meta, index) => {
      return (
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
      );
    })
  );
};

export default VaccineCount;
