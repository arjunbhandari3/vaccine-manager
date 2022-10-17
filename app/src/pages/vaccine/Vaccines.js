import { Divider } from "antd";
import { VaccineTable } from "./components/VaccineTable";

export const Vaccines = (props) => {
  return (
    <div className="vaccines-container">
      <div>
        <h1 className="vaccines-heading">All Vaccines</h1>
      </div>
      <Divider />
      <div>
        <VaccineTable />
      </div>
    </div>
  );
};
