import React, { Component } from 'react';
import './personal-deatails.css';

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: JSON.parse(window.localStorage.getItem('userData'))
    };
  }

  render() {
    const { userData } = this.state;
    const textpic = userData.name !== undefined ? userData.name[0].charAt(0) : 'U';
    return (
      <div className="container">
        <div className="col-md-3 no-margin word_br">
          <div className="col-md-12 no-padding profile-area-container">
            <div className="col-md-12 no-padding pt_20">
              <div className="profileImage pos-r ">
                <span className="fw">
                  {textpic}
                </span>
                <div className="upload-pic change-pic pos-a">
                  <i className="full-width full-height zom-edit-profile" />
                  <input
                    type="file"
                    accept="image/*"
                    id="chequeFilePicker"
                    className="pos-a"
                  />
                </div>
              </div>
              <div className="col-md-12 no-padding pt_20">
                <p className="text-center fw_normal text-capitalize fw_400">
                  {userData.name && userData.name}
                </p>
                <hr className="pull-left full-width mt_10 no-margin" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-offset-1 col-md-8">
          <div className="pull-left full-width mb_30 document no-border">
            <div className="col-md-12">
              <div className="row m_auto pt_10">
                <div className="row">
                  <div className="col-md-12 no-padding pb_10 border-bottom-light">
                    <h3 className="pull-left ml_5 document-type-header mt_0 mb_0">
                      Personal Details
                    </h3>
                  </div>
                  <hr className="full-width no-margin" />
                  <div className="col-md-4 mt_10">
                    <div className="pull-left full-width fs_14 font-color-gray">
                      Full Name
                    </div>
                    <div className="pull-left full-width fs_16 word_br pb_20 fw_normal">
                      {userData.name && userData.name}
                    </div>
                  </div>
                  <div className="col-md-5 mt_10">
                    <div className="pull-left full-width fs_14 font-color-gray">
                      Email
                    </div>
                    <div className="pull-left full-width fs_16 word_br pb_20 fw_normal">
                      {userData.email && userData.email}
                    </div>
                  </div>
                  <div className="col-md-3 mt_10">
                    <div className="pull-left full-width fs_14 font-color-gray">
                      Phone
                    </div>
                    <div className="pull-left full-width fs_16 word_br pb_20 fw_normal">
                      {userData.mobileNumber && userData.mobileNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalDetails;
