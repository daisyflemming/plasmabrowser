import React from 'react';
import {MDBBtn, MDBContainer, MDBDataTable, MDBModal, MDBModalBody, MDBModalFooter} from 'mdbreact';
import {connect} from "react-redux";
import SequenceModal from "./SequenceModal";

/*
 * See mdbreact API at https://mdbootstrap.com/docs/react/tables/datatables/
 * https://stackblitz.com/edit/react-92kvrq?file=TablePage.js
 */

const data = {
  columns: [
    {
      label: 'Name',
      field: 'sequenceName',
      sort: 'asc',
      searchable: true,
    },
    {
      label: 'Description',
      field: 'sequenceDescription',
      sort: 'asc',
      searchable: true,
    },
    {
      label: 'Sequence',
      field: 'truncated',
      sort: 'asc',
      searchable: true,
    },
  ],
};

class DatatablePage extends React.Component {
  state = {
    showPopup: false
  };

  toggle = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  showModal = (selectedSequence) => {
    this.setState({
      showPopup: !this.state.showPopup,
      selectedSequence
    });
  };

  render() {
    const {sequences} = this.props;
    sequences.map(s => {
      s['truncated'] = <span className={'truncate'}>{s.sequence}</span>;
      s['clickEvent'] = () => {
        this.showModal(s);
      };
      return s;
    });
    data['rows'] = sequences;
    return (
      <div>
        <MDBContainer >
          <MDBModal isOpen={this.state.showPopup} toggle={this.toggle}>
            <MDBModalBody>
              <SequenceModal data={this.state.selectedSequence}/>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          <MDBDataTable
            striped
            bordered
            data={data}
            order={['sequenceName', 'asc', 'sequence', 'asc']}
          />
        </MDBContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sequences: state.rootReducer.sequences,
  }
};

export default connect(mapStateToProps)(DatatablePage)
