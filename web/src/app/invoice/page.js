'use client';
import React, { Component } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@carbon/react';
import {
  Loading,
  TextInput,
  Button,
  Grid,
  Row,
  Column,
} from 'carbon-components-react';

import axios from 'axios';

import {
  Advocate,
  Globe,
  AcceleratingTransformation,
} from '@carbon/pictograms-react';

import '../../components/css/common.css'; // Import the CSS file for styling
import CarbonTable from '@/components/CarbonTable/CarbonTable';
import EnvUtility from '../../components/EnvUtility/EnvUtility';

class InvoicePage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      configData: null,
      loadingInvoice: false,
      loadingUtilityBills: false,
      resultProcessInvoice: '',
      resultProcessUtilityBills: '',
    };
    this.envUtility = new EnvUtility();
  }

  handleLoad() {
    const headers = {
      Authorization: 'Bearer xxxxx',
      'Access-Control-Allow-Origin': '*',
    };

    var my_URL = this.envUtility.getAPIUrl() + '/api/config/load';
    axios
      .post(my_URL, {}, { headers })
      .then((response) => {
        const returnData = response.data;
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.configData = returnData;
          newData.loading = false;
          return newData;
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.configData = {};
          newData.loading = false;
          return newData;
        });
      });
  }

  componentDidMount() {
    this.handleLoad();
  }

  handleInputChange = (event, section1, section2, field) => {
    const { value } = event.target;
    this.setState((prevData) => {
      const newData = { ...prevData };
      newData.configData[section1][section2][field] = value;
      return newData;
    });
  };

  handleProcessUtilityBills = (event) => {
    event.preventDefault();

    this.setState((prevData) => {
      const newData = { ...prevData };
      newData.loadingUtilityBills = true;
      newData.resultProcessUtilityBills = '';
      return newData;
    });

    const headers = {
      Authorization: 'Bearer xxxxx',
      'Access-Control-Allow-Origin': '*',
    };

    var my_URL = this.envUtility.getAPIUrl() + '/api/utilitybill/export';
    axios
      .post(my_URL, {}, { headers })
      .then((response) => {
        const returnData = response.data;
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.resultProcessUtilityBills = returnData;
          newData.loadingUtilityBills = false;
          return newData;
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.loading = false;
          newData.loadingUtilityBills = false;
          return newData;
        });
      });
  };

  handleProcessInvoices = (event) => {
    event.preventDefault();

    this.setState((prevData) => {
      const newData = { ...prevData };
      newData.loadingInvoice = true;
      newData.resultProcessInvoice = '';
      return newData;
    });

    const headers = {
      Authorization: 'Bearer xxxxx',
      'Access-Control-Allow-Origin': '*',
    };

    var my_URL = this.envUtility.getAPIUrl() + '/api/invoice/export';
    axios
      .post(my_URL, {}, { headers })
      .then((response) => {
        const returnData = response.data;
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.resultProcessInvoice = returnData;
          newData.loadingInvoice = false;
          return newData;
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.loading = false;
          newData.loadingInvoice = false;
          return newData;
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState((prevData) => {
      const newData = { ...prevData };
      newData.loading = true;
      return newData;
    });

    const headers = {
      Authorization: 'Bearer xxxxx',
      'Access-Control-Allow-Origin': '*',
    };

    var my_URL = this.envUtility.getAPIUrl() + '/api/config/update';
    axios
      .post(my_URL, this.state.configData, { headers })
      .then((response) => {
        const returnData = response.data;
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.configData = returnData;
          newData.loading = false;
          return newData;
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevData) => {
          const newData = { ...prevData };
          newData.loading = false;
          return newData;
        });
      });
  };

  render() {
    return (
      <Grid className="landing-page" fullWidth>
        <Column
          lg={16}
          md={8}
          sm={4}
          className="landing-page__banner my-title-image"
        >
          <span className="SubHeaderTitle">Invoice Processing</span>
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <Tabs defaultSelectedIndex={0}>
            <Grid className="my-tabs-group-content">
              <Column lg={16} className="landing-page__tab-content">
                <table className="fin-table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="my-component">
                          <div className="fin-header-section">
                            <div className="fin-text-heading">
                              Process Invoice
                            </div>
                            <div className="fin-text-heading-label">
                              To process Scope 3 - Category 1 Purchased Goods
                            </div>
                          </div>
                          <div className="fin-container">
                            <table>
                              <tbody>
                                <tr>
                                  <td className="instruction-label">
                                    Envizi Invoice Assist helps to process the
                                    Purchased goods Invoices of your
                                    organziation and create Scope 3 - Category 1
                                    Purchased Goods Data that can be feed into
                                    Envizi AI-Assist feature.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="instruction-label">
                                    <Button
                                      className="fin-button-1"
                                      onClick={this.handleProcessInvoices}
                                      disabled={this.state.loadingInvoice}
                                    >
                                      Process Invoices
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="instruction-msg">
                                      {!this.state.loadingInvoice &&
                                      this.state.resultProcessInvoice ? (
                                        <span>
                                          <p>
                                            {
                                              this.state.resultProcessInvoice
                                                .msg
                                            }
                                          </p>
                                          <p></p>
                                          <p>
                                            You can upload this file in the AI
                                            AssistFile Processing section of
                                            Envizi.
                                          </p>
                                        </span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {this.state.loadingInvoice && (
                          <div>
                            <p>&nbsp;</p>
                            <Loading description="Loading content..." />
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          {this.state.resultProcessInvoice &&
                            this.state.resultProcessInvoice.processed_data && (
                              <CarbonTable
                                columns={
                                  this.state.resultProcessInvoice
                                    .processed_data_columns
                                }
                                jsonData={
                                  this.state.resultProcessInvoice.processed_data
                                }
                                headingText1={'Data Created'}
                                headingText2={
                                  'The below data have been created for uploading into Envizi'
                                }
                              />
                            )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Column>
            </Grid>
          </Tabs>
        </Column>
      </Grid>
    );
  }
}
export default InvoicePage;
