import { Result, Button } from "antd";
import { Link } from "react-router-dom";

import * as routes from "constants/routes";

const NotFound = (props) => {
  return (
    <div className="wrapper">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={routes.HOME}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
