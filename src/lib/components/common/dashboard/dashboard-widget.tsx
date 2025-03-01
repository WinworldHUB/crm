import { GBP_SYMBOL } from "lib/constants";
import React from "react";
import CountUp from "react-countup";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

interface DashboardWidgetProps {
  title: string;
  count: number;
  percentage: number;
  icon: React.ReactNode;
  total?: number;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  count,
  percentage,
  icon,
  total,
}) => {
  const isNegative = percentage < 0;
  const percentageClass = isNegative ? "negative-view" : "passive-view";

  return (
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
      <div className="dash-widget">
        <div className="dash-boxs comman-flex-center">{icon}</div>
        <div className="dash-content dash-count flex-grow-1">
          <h4>{title}</h4>
          <h2>
            <span>{title === "Earnings" ? GBP_SYMBOL : ""}</span>
            <CountUp delay={0.4} end={count} duration={0.6} />
            {total && (
              <span className="dashboard-widget-total"> / {total}</span>
            )}
          </h2>
          <p>
            <span className={`rounded-pill ${percentageClass}`}>
              {isNegative ? (
                <>
                  <FaArrowDown className="icon" /> {Math.abs(percentage)}%
                </>
              ) : (
                <>
                  <FaArrowUp className="icon" /> {percentage}%
                </>
              )}
            </span>
            <span className="mx-1 text-muted">vs last month</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
