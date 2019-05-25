import React from "react";
import { AppRegistry, StyleSheet, Text, View, VrButton } from "react-360";
import { connect, changeCountry } from "./store";
import GazeButton from "react-360-gaze-button";

export class MobileButton extends React.Component {
  state = {
    gazed: false,
    hover: false
  };

  setGazed = () => {
    this.setState({ gazed: true });
  };

  clickHandler(countrylink) {
    changeCountry(countrylink);
  }

  render() {
    const { gazed } = this.state;
    return (
      <GazeButton
        duration={2000}
        // onClick={this.setGazed}
        style={this.state.hover ? styles.hover : styles.button}
        onEnter={() => this.setState({ hover: true })}
        onExit={() => this.setState({ hover: false })}
        onClick={() => {
          this.setGazed;
          this.clickHandler(this.props.country);
        }}
        render={(remainingTime, isGazed) => (
          <View>
            <Text style={styles.text}>
              <Text>  </Text>
              {this.props.country}
              <Text> </Text>
            <Text style={styles.countText}>{isGazed ? remainingTime : ""}</Text>
            </Text>
          </View>
        )}
      />
    );
  }
}

// class Button extends React.Component {
//   state = {
//     hover: false
//   };

//   clickHandler(countrylink) {
//     changeCountry(countrylink);
//   }

//   render() {
//     return (
//       <VrButton
//         style={this.state.hover ? styles.hover : styles.button}
//         onEnter={() => this.setState({ hover: true })}
//         onExit={() => this.setState({ hover: false })}
//         onClick={() => this.clickHandler(this.props.country)}
//       >
//         <Text style={styles.text}>
//           {this.props.country}
//         </Text>
//       </VrButton>
//     );
//   }
// }

export class Buttons extends React.Component {
  createNeghbourBtn(array) {
    buttons = [];
    array.map(country => {
      buttons.push(
        <MobileButton key={`${country} - button`} country={country} />
      );
    });
    return buttons;
  }

  render() {
    return (
      <View style={styles.buttonPanel}>
        <Text style={styles.header}>Pick a destination!</Text>
        {this.createNeghbourBtn(this.props.neighbours)}
      </View>
    );
  }
}

export class Info extends React.Component {
  render() {
    return (
      <View style={styles.infoPanel}>
        <Text style={styles.infoHeader}>Destination Info!</Text>
        <Text style={styles.text}>Country: {this.props.name}</Text>
        <Text style={styles.text}>Location: {this.props.location}</Text>
        <Text style={styles.text}>Population: {this.props.population}</Text>
        <Text style={styles.text}>Capital: {this.props.capital}</Text>
        <Text style={styles.text}>Language: {this.props.language}</Text>
      </View>
    );
  }
}

const ConnectedButtons = connect(Buttons);
const ConnectedInfo = connect(Info);

const styles = StyleSheet.create({
  infoPanel: {
    // Fill the entire surface
    width: 550,
    height: 550,
    backgroundColor: "rgba(255, 100, 100, 0.4)",
    // borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 5,
    borderRadius: 5,
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center"
  },
  buttonPanel: {
    width: 450,
    height: 1000,
    // opacity: 0.5,
    backgroundColor: "rgba(255, 200, 50, 0.6)",
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 5,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    width: 350,
    height: 70,
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderColor: "rgb(255,255,255)",
    borderWidth: 5
  },
  hover: {
    width: 350,
    height: 70,
    backgroundColor: "#0073B7",
    borderColor: "rgb(255,255,255)",
    borderWidth: 5
  },
  header: {
    fontSize: 45,
    color: "rgb(0 ,0 ,0)",
    fontWeight: "400",
    textAlign: "center"
  },
  infoHeader: {
    fontSize: 45,
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "rgb(255 ,255 ,255)",
    fontWeight: "400",
    textAlign: "center",
    margin: 20
  },
  text: {
    // textAlign: "center",
    color: "rgb(255 ,255 ,255)",
    fontSize: 45,
    fontWeight: "400"
  },
  countText: {
    // textAlign: "center",
    color: "rgb(255 ,255 ,255)",
    fontSize: 20,
    fontWeight: "400"
  }
});

AppRegistry.registerComponent("ConnectedButtons", () => ConnectedButtons);
AppRegistry.registerComponent("ConnectedInfo", () => ConnectedInfo);

