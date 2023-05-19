import { Button, Col, Row, Switch } from "antd";
import "./first.css";
import { useResize } from "../../../utils/helpers";

export const DashboardFirst = (props) => {
  const {withHighlights, displayHighlights} = props;
  const { isResponsive } = useResize();

  const onChange = (val) => {
    displayHighlights(val);
  };

  return (
    <div className="dashboard-first-main-container">
      <div className="dashboard-first-inner-container">
        <div className="first">
          <Row align={'middle'} justify={'space-between'}>
            <Col span={isResponsive ? 24 : 21} className="text">
                <h1 className="title">
                  <span>Today's Cryptocurrency Prices by Market Cap</span>
                </h1>
                <p className="sub-title">
                  The global crypto market cap is $1.14T, a 0.82% increase over the last day.
                  <Button type="ghost">Read more</Button>
                </p>
            </Col>
            <Col span={isResponsive ? 0 : 3} >
              <div className="highlights">
                <p>Highlights</p>
                <Switch checked={withHighlights} onChange={onChange} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}