import { useDispatch } from "react-redux";
import { Input, Button, PageHeader } from "antd";
import React, { useEffect, useState } from "react";

import useDocumentTitle from "hooks/useDocumentTitle";
import useDebounceEffect from "hooks/useDebounceEffect";

import VaccineCount from "./components/VaccineCount";
import VaccineTable from "./components/VaccinesTable";
import VaccineFormModal from "./components/VaccineFormModal";

import { getAllVaccines } from "redux/actions/vaccineAction";

import { VACCINE_METADATA } from "constants/common";

const Vaccines = (props) => {
  const dispatch = useDispatch();

  useDocumentTitle("Vaccines");

  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [metaQuery, setMetaQuery] = useState(VACCINE_METADATA.TOTAL);

  const searchQuery = useDebounceEffect(searchValue);

  useEffect(() => {
    dispatch(getAllVaccines({ mandatory: metaQuery, search: searchQuery }));
  }, [dispatch, metaQuery, searchQuery]);

  return (
    <div className="vaccines-container">
      <PageHeader
        title={<h1 className="vaccines-header-title">All Vaccines</h1>}
        tags={
          <VaccineCount metaQuery={metaQuery} setMetaQuery={setMetaQuery} />
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
            onChange={(e) => setSearchValue(e.target.value)}
          />,
        ]}
      />
      <div>
        <VaccineTable
          query={{ mandatory: metaQuery, search: searchQuery }}
          setShowModal={setShowModal}
          selectedVaccine={selectedVaccine}
          setSelectedVaccine={setSelectedVaccine}
        />
        {showModal && (
          <VaccineFormModal
            vaccine={selectedVaccine}
            open={showModal}
            onCancel={() => {
              setShowModal(false);
              setSelectedVaccine(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Vaccines;
