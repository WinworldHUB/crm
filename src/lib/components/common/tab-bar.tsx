import { FC } from "react";
import { Button } from "react-bootstrap";

interface TabBarProps {
  tabs: GeneralItem[];
  selectedTabId: number;
  onTabChange: (tabId: number) => void;
}

const TabBar: FC<TabBarProps> = ({ tabs, selectedTabId, onTabChange }) => {
  return (
    <ul className="d-flex list-unstyled justify-content-end">
      {tabs.map((tab) => (
        <li className="mx-3" key={tab.id}>
          <Button
            className={
              tab.id === selectedTabId
                ? "default-btn border-bottom-dark rounded-0"
                : "default-btn rounded-0"
            }
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon && <span className="me-2">{tab.icon}</span>}
            {tab.label}
          </Button>
        </li>
      ))}
    </ul>
  );
};
export default TabBar;
