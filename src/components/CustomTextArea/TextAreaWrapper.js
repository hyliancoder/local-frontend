import React, { Component } from 'react';
import PropTypes from 'prop-types';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import TextArea from './TextArea';

const { REACT_APP_ALGOLIA_APP_ID, REACT_APP_ALGOLIA_API_KEY } = process.env;

const searchClient = algoliasearch(
  REACT_APP_ALGOLIA_APP_ID,
  REACT_APP_ALGOLIA_API_KEY
);
class CustomTextArea extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <InstantSearch
        indexName='dev_endemic_users'
        searchClient={searchClient}
      >
        <TextArea
          onTextChange={this.props.onTextChange}
          initialValue={this.props.initialValue}
        />
      </InstantSearch>
    );
  }
}

CustomTextArea.propTypes = {
  onTextChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};
export default CustomTextArea;
