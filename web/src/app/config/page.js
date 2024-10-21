'use client';
import React, { Component } from 'react';
import { unstable_noStore as noStore } from 'next/cache';

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
import DataTable from '../../components/DataTable/DataTable';
import EnvUtility from '../../components/EnvUtility/EnvUtility';

import '../../components/css/common.css'; // Import the CSS file for styling

class ConfigPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      configData: null,
      loadingInvoice: false,
      resultProcessInvoice: '',
      loadingUtility: false,
      resultProcessUtility: '',
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
          className="landing-page__banner  my-title-image"
        >
          <span className="SubHeaderTitle">Configuration Settings</span>
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          {!this.state.loading && this.state.configData && (
            <p>
              <div className="my-component">
                <section className="top-section">
                  <div className="text-sub-heading">Envizi Parameters</div>
                  <div className="text-sub-heading-label2">
                    Envizi Parameters details
                  </div>
                  <div className="upload-section">
                    <table>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="Org Name"
                            value={
                              this.state.configData.envizi.parameters.org_name
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'envizi',
                                'parameters',
                                'org_name'
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="Location"
                            value={
                              this.state.configData.envizi.parameters.location
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'envizi',
                                'parameters',
                                'location'
                              )
                            }
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </section>
              </div>
              <div className="my-component">
                <section className="top-section">
                  <div className="text-sub-heading">Discovery</div>
                  <div className="text-sub-heading-label2">
                    Watson Discovery configuration for Invoice Processing
                  </div>
                  <div className="upload-section">
                    <table>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="API Key"
                            type="password"
                            value={
                              this.state.configData.discovery.access.api_key
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'discovery',
                                'access',
                                'api_key'
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="Service URL"
                            value={
                              this.state.configData.discovery.access.service_url
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'discovery',
                                'access',
                                'service_url'
                              )
                            }
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </section>

                <section className="top-section">
                  <div className="text-sub-heading">watsonx.ai</div>
                  <div className="text-sub-heading-label2">
                    watsonx.ai Processing
                  </div>
                  <div className="upload-section">
                    <table>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="API Key"
                            type="password"
                            value={
                              this.state.configData.watsonx_ai.access.api_key
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'watsonx_ai',
                                'access',
                                'api_key'
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="API URL"
                            value={
                              this.state.configData.watsonx_ai.access.api_url
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'watsonx_ai',
                                'access',
                                'api_url'
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="Project Id"
                            value={
                              this.state.configData.watsonx_ai.access.project_id
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'watsonx_ai',
                                'access',
                                'project_id'
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="Model Id"
                            value={
                              this.state.configData.watsonx_ai.access.model_id
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'watsonx_ai',
                                'access',
                                'model_id'
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="my-textbox-row">
                          <TextInput
                            class="my-textbox"
                            labelText="IBM Auth URL"
                            value={
                              this.state.configData.watsonx_ai.access
                                .ibmc_auth_url
                            }
                            onChange={(e) =>
                              this.handleInputChange(
                                e,
                                'watsonx_ai',
                                'access',
                                'ibmc_auth_url'
                              )
                            }
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </section>
                <section className="top-section">
                  <Button
                    className="fin-button-1"
                    onClick={this.handleSubmit}
                    disabled={this.state.loading}
                  >
                    Save
                  </Button>
                </section>
              </div>
            </p>
          )}
        </Column>
      </Grid>
    );
  }
}
export default ConfigPage;
