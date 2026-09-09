import React, { useEffect, useState } from 'react'
import DokumenPendukung from './DokumenPendukung';
import Rfi from './Rfi';
import Kontrak from './Kontrak';
import BAMK from './BAMK';
import BillingCollectionPlan from './BillingCollectionPlan';
import VendorPlanning from './VendorPlanning';
import ProjectAkselerasi from './ProjectAkselerasi';
import { useLocation } from 'react-router-dom';
import Remind from './Remind';
import { getCookies } from 'global/helper/cookie';

const TabDokumen = ({ data, getDetailProject, isDetailModalAkselerasi, isBillingRealization, isVendorRealization, isProject }) => {
  const accountAccess = getCookies("accountAccess");
  const location = useLocation();
  const { view } = location?.state;
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const [activeTab, setActiveTab] = useState('Dokumen Pendukung');
  const [activeTabVendor, setActiveTabVendor] = useState(isBillingRealization ? 'Vendor Billing' : 'Vendor Planning');
  const [tabs, setTabs] = useState(['Dokumen Pendukung']);
  const [tabsVendor, setTabsVendor] = useState(['Vendor Planning']);
  const tabComponents = {
    'Dokumen Pendukung':
      <DokumenPendukung data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} view={view}/>,
    'RFQ/RFI':
      <Rfi data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} sub_pro={sub_pro} view={view}/>,
    'Kontrak':
      <Kontrak data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} isProject={isProject} sub_pro={sub_pro} view={view}/>,
    'BAMK':
      <BAMK data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} view={view}/>,
    'Billing Collection Plan':
      <BillingCollectionPlan data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isBillingRealization={isBillingRealization} view={view}/>,
    'Billing Collection':
      <BillingCollectionPlan data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isBillingRealization={isBillingRealization} view={view}/>,
    'Project Akselerasi':
      <ProjectAkselerasi data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location}/>,
    'Remind':
      <Remind data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} />,
    'Vendor Planning':
      <VendorPlanning data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} view={view}/>,
    'Vendor Billing':
      <VendorPlanning data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} sub_pro={sub_pro} view={view} isProject={isProject}/>
  };

  const tabComponentsVendor = {
    'Vendor Planning':
      <VendorPlanning data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} sub_pro={sub_pro} view={view} isProject={isProject}/>,
    'Vendor Billing':
      <VendorPlanning data={data} getDetailProject={getDetailProject} isDetailModalAkselerasi={isDetailModalAkselerasi} isVendorRealization={isVendorRealization} isBillingRealization={isBillingRealization} location={location} />
  };

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleTabClickVendor = (tab) => setActiveTabVendor(tab);

  useEffect(() => {
    if (data?.AKSELERASI?.length > 0) {
      if (tabs.includes('Project Akselerasi')) {
        return;
      };
      setTabs([...tabs, 'Project Akselerasi']);
    };
    if (isBillingRealization && !sub_pro) {
      setTabs(['Dokumen Pendukung', 'RFQ/RFI', 'BAMK', 'Kontrak', 'Billing Collection'])
      setTabsVendor(['Vendor Billing'])
    } else if (isBillingRealization && sub_pro) {
      setTabs(['Dokumen Pendukung', 'RFQ/RFI', 'BAMK', 'Kontrak', 'Vendor Billing'])
      // setTabsVendor(['Vendor Billing'])
    } else if (isVendorRealization) {
      // setTabs(['Dokumen Pendukung', 'RFQ/RFI', 'BAMK', 'Kontrak', 'Vendor Billing', 'Remind'])
      setTabs(['Dokumen Pendukung', 'RFQ/RFI', 'BAMK', 'Kontrak', 'Vendor Billing'])
      // setTabsVendor(['Vendor Billing'])
    };
    
    if (isProject && (data?.KD_STATUS === '004' || data?.KD_STATUS === '005')) {
      setTabs(['Dokumen Pendukung', 'RFQ/RFI', 'BAMK', 'Kontrak', 'Billing Collection Plan'])
    }
    if (isProject && (data?.KD_STATUS === '001' || data?.KD_STATUS === '002')) {
      setTabs(['Dokumen Pendukung', 'RFQ/RFI'])
    }
    if (isProject && (data?.KD_STATUS === '003')) {
      setTabs(['Dokumen Pendukung', 'RFQ/RFI', 'BAMK', 'Kontrak'])
    }
    // eslint-disable-next-line
  }, [data])

  return (
    <div className='mt-5'>
      <div>
        {!sub_pro && !isVendorRealization && (
          <div className={`font-bold px-3 py-2 text-white bg-gradient-to-r from-primary to-white rounded-full my-3`}>Customer</div>
        )}
        <div role="tablist" className="tabs tabs-lifted bg-white">
          {tabs?.length > 0 ? tabs?.map((tab, index) => (
            <>
              <input
                key={index}
                type="radio"
                name="my_tabs"
                role="tab"
                className={`tab ${activeTab === tab ? 'text-primary font-bold' : 'font-semibold'} [--tab-bg:white] min-w-[180px]`} aria-label={tab}
                defaultChecked={index === 0}
                onClick={() => handleTabClick(tab)}
              />
              <div role="tabpanel" className={`tab-content bg-white border-base-300 rounded-box px-5 overflow-auto ${accountAccess?.kode === '8002' ? "pointer-events-none" : ""}`}>
                {tabComponents[activeTab]}
              </div>
            </>
          )) : null}
        </div>
      </div>
      {!sub_pro && !isVendorRealization && (
        <div>
          <div className={`font-bold px-3 py-2 text-white bg-gradient-to-r from-primary to-white rounded-full my-3`}>Vendor</div>
          <div role="tablist" className="tabs tabs-lifted bg-white">
            {tabsVendor?.length > 0 ? tabsVendor?.map((tab, index) => (
              <>
                <input
                  key={index}
                  type="radio"
                  name="my_tabsVendor"
                  role="tab"
                  className={`tab ${activeTabVendor === tab ? 'text-primary font-bold' : 'font-semibold'} [--tab-bg:white] min-w-[180px]`} aria-label={tab}
                  defaultChecked={index === 0}
                  onClick={() => handleTabClickVendor(tab)}
                />
                <div role="tabpanel" className={`tab-content bg-white border-base-300 rounded-box px-5 overflow-auto ${accountAccess?.kode === '8002' ? "pointer-events-none" : ""}`}>
                  {tabComponentsVendor[activeTabVendor]}
                </div>
              </>
            )) : null}
          </div>
        </div>
      )}
      {/* <div className='my-5'>
        <div className='border-b-2'>
          {tabs?.length > 0 ? tabs?.map((tab, index) => (
            <div
              key={`tab-${index}`}
              className={`tab tab-lg ${activeTab === tab
                ? "tab-active text-[#2E66B9] border-b-2 border-b-[#2E66B9] font-bold"
                : "font-semibold"
                }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          )) : null}
        </div>
        <div>{tabComponents[activeTab]}</div>
      </div> */}
    </div>
  )
}

export default TabDokumen