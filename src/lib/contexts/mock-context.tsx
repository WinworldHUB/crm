import React, { createContext, useContext, useState, ReactNode } from "react";
import { MockCampaigns } from "../mocks";

interface MockData {
  campaigns: CampaignDetails[];
}

type MockContextType = {
  getMockData: (
    propertyName: keyof MockData,
    id?: string
  ) => CampaignDetails[] | CampaignDetails;
  setMockDataById: (
    propertyName: keyof MockData,
    newData: CampaignDetails,
    id?: string
  ) => void;
};

const MockContext = createContext<MockContextType | undefined>(undefined);

type MockProviderProps = {
  children: ReactNode;
};

export const MockProvider: React.FC<MockProviderProps> = ({ children }) => {
  const [mockData, setMockData] = useState<MockData>({
    campaigns: MockCampaigns,
  });

  const getMockData = (propertyName: keyof MockData, id?: string): any => {
    if (id) {
      return (mockData[propertyName] || []).find((data: CampaignDetails) => data.basicDetails.id === id);
    } else {
      return mockData[propertyName] || [];
    }
  };

  const setMockDataById = (
    propertyName: keyof MockData,
    newData: CampaignDetails,
    id?: string
  ): void => {
    setMockData((prevData) => {
      const campaigns: CampaignDetails[] = prevData[propertyName];
      if (id) {
        const index = campaigns.findIndex(
          (data: CampaignDetails) => data.basicDetails.id === id
        );
        if (index > -1) {
          campaigns[index] = newData;
        } else {
          campaigns.push(newData);
        }
      } else {
        campaigns.push(newData);
      }

      return {
        ...prevData,
        [propertyName]: campaigns,
      };
    });
  };

  return (
    <MockContext.Provider value={{ getMockData, setMockDataById }}>
      {children}
    </MockContext.Provider>
  );
};

export const useMock = (): MockContextType => {
  const context = useContext(MockContext);
  if (!context) {
    throw new Error("useMock must be used within a MockProvider");
  }
  return context;
};
