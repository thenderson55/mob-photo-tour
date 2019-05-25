import React from 'react'
import data from './data/pototour'
import { asset, Environment } from 'react-360'
// import { listeners } from 'cluster';

const countries = []
for(let country in data){
  countries.push(country)
}

const State = {
  name: 'Hawaii',
  location: 'Pacific',
  population: '1,420,000',
  capital: 'Honolulu',
  language: 'Hawaiian',
  economy: 'Pork Pies, Gin, Beer, Cider',
  neighbours: countries
}

const listeners = new Set()

function updateComponents() {
  for (const callback of listeners.values()){
    callback()
  }
}

export function changeCountry(countrySelection){

  State.name = countrySelection
  State.location = data[`${countrySelection}`].location,
  State.population = data[`${countrySelection}`].population,
  State.capital = data[`${countrySelection}`].capital,
  State.language = data[`${countrySelection}`].language,
  State.economy = data[`${countrySelection}`].economy,
  State.neighbours = countries

  Environment.setBackgroundImage(asset(`${countrySelection}.jpg`))

  updateComponents()

}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      name: State.name,
      location: State.location,
      population: State.population,
      capital: State.capital,
      language: State.language,
      economy: State.economy,
      neighbours: State.neighbours
    }

    _listener = () => {
      this.setState({
        name: State.name,
        location: State.location,
        population: State.population,
        capital: State.capital,
        language: State.language,
        economy: State.economy,
        neighbours: State.neighbours
      })
    }

    componentDidMount(){
      listeners.add(this._listener)
    }

    render() {
      return(
        <Component
          {...this.props}
          name={this.state.name}
          location={this.state.location}
          population={this.state.population}
          capital={this.state.capital}
          language={this.state.language}
          economy={this.state.economy}
          neighbours={this.state.neighbours}
        />     
      )
    }
  }
}