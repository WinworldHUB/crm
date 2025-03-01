import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

interface SimpleBreadCrumbProps {
  items: BreadcrumbItem[];
}

const SimpleBreadCrumb: React.FC<SimpleBreadCrumbProps> = ({ items }) => {
  return (
    <ul className="breadcrumb">
      {items.map((item, index) => (
        <Fragment key={index}>
          <li className={`breadcrumb-text ${index === 0 ? "active" : ""}`}>
            <Link to={item.path}>{item.label}</Link>
          </li>
          {index < items.length - 1 && (
            <li className="breadcrumb-text mt-1">
              <FeatherIcon icon="chevron-right" />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default SimpleBreadCrumb;
