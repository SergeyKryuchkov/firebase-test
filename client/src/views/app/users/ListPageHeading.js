import React, { Component } from "react";
import {
  Row,
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";

class ListPageHeading extends Component {

  render() {
    const {
      match,
      heading
    } = this.props;

    return (
      <>
        <Row>
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id={heading} />
              </h1>
              <Breadcrumb match={match} />
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
      </>
    );
  }
}

export default injectIntl(ListPageHeading);
