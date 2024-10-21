'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  Column,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
} from '@carbon/react';

import {
  Advocate,
  Globe,
  AcceleratingTransformation,
} from '@carbon/pictograms-react';
import Image from 'next/image';
import archImage from '../../components/images/arch.png'; // Import the CSS file for styling
import '../../components/css/common.css'; // Import the CSS file for styling

export default function LandingPage() {
  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <div className="my-component">
          <Grid>
            <Column lg={16}>
              <div className="mySectionTitle">
                Welcome to Envizi Invoice Assist !
              </div>
            </Column>
            <Column lg={16}>
              <div className="mySectionTitle2"></div>
            </Column>
            <Column lg={6}>
              <div className="mySectionText">
                Envizi Invoice Assist facilitates to read through the invoices
                and create AI Assist template to integrated the Spend based data
                into the IBM Envizi ESG Suite.
              </div>

              <div className="mySectionText">
                It connects to Watson Discovery to extract the content from the
                available Invoices, create a summary of the invoice data using
                the watsonx.ai llm call,and then generate the AI Assist template
                data for to integrated into IBM Envizi ESG Suite.
              </div>

              <div className="mySectionText">
                Configuration settings are accessible through the Config menu.
              </div>
            </Column>
          </Grid>
        </div>
      </Column>
    </Grid>
  );
}
