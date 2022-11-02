import { Divider } from "antd";
import { VaccineTable } from "./components/VaccineTable";

export const Vaccines = (props) => {
  return (
    <div className="vaccines-container">
      <div>
        <h1 className="vaccines-header-title">All Vaccines</h1>
      </div>
      <Divider />
      <div>
        <VaccineTable />
      </div>
    </div>
  );
};
