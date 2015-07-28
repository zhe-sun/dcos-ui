var React = require("react");

var Modal = require("../../components/Modal");

var ErrorModal = React.createClass({

  displayName: "ErrorModal",

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    errorMsg: React.PropTypes.element
  },

  onClose: function () {
    this.props.onClose();
  },

  render: function () {
    return (
      <Modal titleText="Looks Like Something is Wrong"
          subHeader=""
          showCloseButton={false}
          showFooter={false}
          onClose={this.onClose}
          open={this.props.open}>
        {this.props.errorMsg}
      </Modal>
    );
  }
});

module.exports = ErrorModal;
