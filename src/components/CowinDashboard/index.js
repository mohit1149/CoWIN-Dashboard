// Write your code here
// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    firstData: [],
    secondData: [],
    thirdData: [],
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const vaccinationCoverageData = fetchedData.last_7_days_vaccination.map(
        lastDate => ({
          vaccineDate: lastDate.vaccine_date,
          dose1: lastDate.dose_1,
          dose2: lastDate.dose_2,
        }),
      )
      const vaccinationAgeData = fetchedData.vaccination_by_age.map(ages => ({
        age: ages.age,
        count: ages.count,
      }))
      const vaccinationGenderData = fetchedData.vaccination_by_gender.map(
        genders => ({
          count: genders.count,
          gender: genders.gender,
        }),
      )
      this.setState({
        firstData: vaccinationCoverageData,
        secondData: vaccinationAgeData,
        thirdData: vaccinationGenderData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">Something Went Wrong</h1>
    </div>
  )

  renderProductsListView = () => {
    const {firstData, secondData, thirdData} = this.state

    return (
      <>
        <div className="first-container">
          <h1 className="plus-heading">Vaccination Coverage</h1>
          <VaccinationCoverage firstDataSend={firstData} />
        </div>
        <div className="first-container">
          <h1 className="plus-heading">Vaccination by gender</h1>
          <VaccinationByGender thirdDataSend={thirdData} />
        </div>
        <div className="first-container">
          <h1 className="plus-heading">Vaccination by Age</h1>
          <VaccinationByAge secondDataSend={secondData} />
        </div>
      </>
    )
  }

  renderAllOptions = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="plus-container">
          <img
            className="plus-image"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="plus-heading">Co-WIN</h1>
        </div>
        <h1 className="main-plus-heading">CoWIN Vaccination in India</h1>
        {this.renderAllOptions()}
      </div>
    )
  }
}
export default CowinDashboard
