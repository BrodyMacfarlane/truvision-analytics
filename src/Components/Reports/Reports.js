import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

function getColor(value){
  let percentvalue = value * 100;
  if(percentvalue <= 32){
    return "red"
  }
  else if(percentvalue > 32 && percentvalue < 67){
    return "yellow"
  }
  else {
    return "green"
  }
}

const rankDictionary = {
  0: "None",
  30: "Senior Associate",
  40: "One Star",
  50: "Two Star",
  60: "Three Star",
  70: "Four Star",
  80: "Five Star",
  90: "Six Star",
  100: "Seven Star",
  110: "Eight Star"
}

const reportTypes = ["Level One", "Downline", "Other Report"]

class Reports extends Component {
  constructor(){
    super()
    this.state = {
      currentData: [],
      reportType: 2,
      low: 0,
      avg: 0,
      high: 0,
      currentReport: 0
    }
    this.getReport = this.getReport.bind(this)
    this.selectReportType = this.selectReportType.bind(this)
  }

  getReport(rankid){
    this.setState({currentReport: rankid})
    axios.post('/api/getRankData', {rank: rankid})
      .then(response => {
        let data = response.data
        let total = 0
        for(let i = 0; i < data.length; i++){
          total += parseFloat(data[i].value)
        }
        this.setState({
          low: parseFloat(data[0].value * 100).toFixed(2),
          avg: ((total/data.length) * 100).toFixed(2),
          high: (parseFloat(data[data.length - 1].value) * 100).toFixed(2)
        })
        console.log(data)

        this.setState({currentData: data})
      })
  }

  selectReportType(typeid){
    this.setState({reportType: typeid})
  }

  render() {
    return (
      <BrowserRouter>
        <div className="component-container reports-container">
          <div className="sidebar-container">
            <div className="sidebar">
              <div onClick={() => this.getReport(30)} className="sidebar-option">Senior Associate</div>
              <div onClick={() => this.getReport(40)} className="sidebar-option">One Star</div>
              <div onClick={() => this.getReport(50)} className="sidebar-option">Two Star</div>
              <div onClick={() => this.getReport(60)} className="sidebar-option">Three Star</div>
              <div onClick={() => this.getReport(70)} className="sidebar-option">Four Star</div>
              <div onClick={() => this.getReport(80)} className="sidebar-option">Five Star</div>
              <div onClick={() => this.getReport(90)} className="sidebar-option">Six Star</div>
              <div onClick={() => this.getReport(100)} className="sidebar-option">Seven Star</div>
              <div onClick={() => this.getReport(110)} className="sidebar-option">Eight Star</div>
            </div>
          </div>
          <div className="content">
            <div className="report-types-container">
              <div onClick={() => this.selectReportType(1)} className={this.state.reportType === 1 ? "report-type report-type-active" : "report-type"}>First Level</div>
              <div onClick={() => this.selectReportType(2)} className={this.state.reportType === 2 ? "report-type report-type-active" : "report-type"}>Entire Downline</div>
              <div onClick={() => this.selectReportType(3)} className={this.state.reportType === 3 ? "report-type report-type-active" : "report-type"}>Report type 3</div>
            </div>
            <div className="report-title-container">
              <div className="report-title">
                Currently displaying <span className="rank-span">{reportTypes[this.state.reportType - 1]}</span> data for: <span className="rank-span">{rankDictionary[this.state.currentReport]}</span>.
              </div>
            </div>
            {this.state.currentData.length > 0 ?
              <div className="report-main-stats">
                <div className="main-stat main-stat-worst">
                  <div className="main-stat-title">Low</div>
                  <div className="main-stat-gauge">{this.state.low}%</div>
                  <div className="main-stat-name">{this.state.currentData[0].firstname} {this.state.currentData[0].lastname}</div>
                  <div className="main-stat-id">{this.state.currentData[0].backofficeid}</div>
                </div>
                <div className="main-stat main-stat-avg">
                  <div className="main-stat-title">Avg</div>
                  <div className="main-stat-gauge">{this.state.avg}%</div>
                </div>
                <div className="main-stat main-stat-best">
                  <div className="main-stat-title">High</div>
                  <div className="main-stat-gauge">{this.state.high}%</div>
                  <div className="main-stat-name">{this.state.currentData[this.state.currentData.length - 1].firstname} {this.state.currentData[this.state.currentData.length - 1].lastname}</div>
                  <div className="main-stat-id">{this.state.currentData[this.state.currentData.length - 1].backofficeid}</div>
                </div>
              </div>
            : null}
          </div>
          <div className="distributors-container component-container">
            <div className="distributors-title">Breakdown</div>
            {
              this.state.currentData.map((distributor, i) => {
                return (
                  <div key={i} className={`distributor distributor-data  ${getColor(i/(this.state.currentData.length - 1))}`}>
                    <div className="main-profile-value">{(distributor.value * 100).toFixed(2)}%</div>
                    <div className="main-profile-img-container">
                      {this.state.currentData.length < 20 ? <img src={`https://truvision.corpadmin.directscale.com/BackOffice/ProfileImage?id=${distributor.associateid}`} alt="Profile Image" className={`profile-img`}/> : null}
                    </div>
                    <div className="main-profile-name-container">
                      <div className="main-profile-name">{distributor.firstname} {distributor.lastname}</div>
                      <div className="main-profile-id">{distributor.associateid}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Reports;
