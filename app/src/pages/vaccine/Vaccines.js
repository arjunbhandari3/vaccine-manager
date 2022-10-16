import { Divider } from "antd";
import VaccinesTable from "./components/VaccineTable";

export const Vaccines = (props) => {
  return (
    <div className="vaccines-container">
      <div>
        <h1 className="vaccines-heading">All Vaccines</h1>
      </div>
      <Divider />
      <div>
        <VaccinesTable />
      </div>
    </div>
  );
};
