import React, { Component } from 'react';

export default class ZipForm extends Component {

  constructor(props) {
    super(props);

    this.submitZipCode = this.submitZipCode.bind(this);
  }

  submitZipCode(e) {
    const { onSubmit } = this.props;

    onSubmit(e.target.value);
  }

  render() {
    return (
      <div className='zip-form'>
        <form>
          <label htmlFor='zipcode'>Zip Code</label>
          <select onChange={this.submitZipCode}>
            <option value=''>Select a zip</option>
            {this.props.zips.map(zip =>
              <option key={zip} value={zip}>{zip}</option>
            )}
          </select>
        </form>
      </div>
    );
  }
}
