import React, { Component, createRef, Fragment } from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";

import LawButtons from "./Buttons";
import Modal from "./Modal";

import "../styles/MapContainer.scss";
// import features from "../data/geo.json";
import axios from "axios";

const position = [0, 0];

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLawSelected: false,
      currentLawSelected: "",
      isModalShown: false,
      modalInfo: "",
      geoInfo: null,
    };
    this.geoRef = React.createRef();
    this.changeCurrentLaw = this.changeCurrentLaw.bind(this);
    this.lawGeoStyle = this.lawGeoStyle.bind(this);
    this.getGeoColor = this.getGeoColor.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
    this.launchModal = this.launchModal.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async componentDidMount() {
    let response = await axios.get("/api/geojson", {
      mode: "no-cors",
    });
    let feature = await response.data;

    this.setState({ geoInfo: feature });
  }

  // Law Buttons when clicked change the state for the current law
  changeCurrentLaw(e) {
    let lawClicked = e.target.id;
    // first turn state of isLawSelected to false, so when updateGeo is called,
    // is will switch to true and it will force rerender of the component
    this.setState(
      {
        isLawSelected: false,
        currentLawSelected: lawClicked,
      },
      () => {
        this.updateGeo(lawClicked);
      }
    );
  }

  // this is called to render the GeoJson styling
  updateGeo(law) {
    this.setState({ isLawSelected: true });
    this.lawGeoStyle();
  }

  // this will only select the countries that match the law being selected for coloring
  getGeoColor(law) {
    return law === "law1"
      ? "red"
      : law === "law2"
      ? "blue"
      : law === "law3"
      ? "yellow"
      : "none";
  }

  lawGeoStyle(e) {
    let currentLaw = this.state.currentLawSelected;
    if (e) {
      if (currentLaw === "law1") {
        return {
          fillColor: this.getGeoColor(e.properties.law1),
          weight: 2,
          opacity: 1,
          color: "none",
          // dashArray: "1",
          fillOpacity: 0.7,
        };
      } else if (currentLaw === "law2") {
        return {
          fillColor: this.getGeoColor(e.properties.law2),
          weight: 2,
          opacity: 1,
          color: "none",
          // dashArray: "1",
          fillOpacity: 0.7,
        };
      } else if (currentLaw === "law3") {
        return {
          fillColor: this.getGeoColor(e.properties.law3),
          weight: 2,
          opacity: 1,
          color: "none",
          // dashArray: "1",
          fillOpacity: 0.7,
        };
      }
    }
  }

  highlightFeature(e) {
    let layer = e.target;

    if (layer.feature.properties[this.state.currentLawSelected]) {
      layer.setStyle({
        weight: 1,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.5,
      });
    }
  }

  resetHighlight(e) {
    this.geoRef.current.leafletElement.resetStyle(e.target);
  }

  launchModal(e) {
    this.setState({
      isModalShown: true,
      modalInfo: e.target.feature.properties,
    });
  }

  onEachFeature(feature, layer) {
    if (feature.properties.law1) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.launchModal,
      });
    } else if (feature.properties.law2) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.launchModal,
      });
    } else if (feature.properties.law3) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.launchModal,
      });
    }
  }

  handleClose() {
    this.setState({ isModalShown: false });
  }

  render() {
    return (
      <Fragment>
        {this.state.isModalShown && (
          <Modal handleClose={this.handleClose} info={this.state.modalInfo} />
        )}
        {console.log(this.state.geoInfo)}
        <Map
          center={position}
          zoom={1}
          id="mapContainer"
          className="mapDemo"
          currentLaw={this.state.currentLawSelected}
        >
          <LawButtons changeLaw={this.changeCurrentLaw} />
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hyaXNzdGFuYXJzZW5hdWx0IiwiYSI6ImNrOWY1dDV4NjA5bnczZW9iNXB4dmkzcHIifQ.03UOcpgGEfNQbYGxuVBkBQ`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            minZoom={3}
            maxZoom={10}
            zoomDelta={0.1}
            zoomSnap={0}
            // id="mapbox/streets-v11"
            // id="chrisstanarsenault/cka0bh3lk13qg1it67mcpj4gg"
            id="chrisstanarsenault/cka0cv5op0e971ipj4a8qqnax"
            tileSize={512}
            zoomOffset={-1}
            accessToken="pk.eyJ1IjoiY2hyaXNzdGFuYXJzZW5hdWx0IiwiYSI6ImNrOWY1dDV4NjA5bnczZW9iNXB4dmkzcHIifQ.03UOcpgGEfNQbYGxuVBkBQ"
          />

          {this.state.isLawSelected && (
            <GeoJSON
              data={this.state.geoInfo}
              style={this.lawGeoStyle}
              onEachFeature={this.onEachFeature}
              ref={this.geoRef}
            />
          )}
        </Map>
      </Fragment>
    );
  }
}
