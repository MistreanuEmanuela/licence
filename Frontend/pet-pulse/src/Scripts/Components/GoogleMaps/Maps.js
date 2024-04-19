import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  state = {
    currentPosition: { lat: 0, lng: 0 },
    vetCabinets: [],
  };

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
        this.searchVetCabinets(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  searchVetCabinets = async (lat, lng) => {
    const { google } = this.props;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(
      {
        location: { lat, lng },
        radius: 5000, 
        type: 'veterinary_care',
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({ vetCabinets: results });
        }
      }
    );
  };

  render() {
    const { currentPosition, vetCabinets } = this.state;

    return (
      <div style={{ position: 'relative', width: '90%', height: '500px' }}> 

      <Map
        google={this.props.google}
        center={currentPosition}
        zoom={14}
        style={{ width: '100%', height: '100%', position: 'relative'}}
        initialCenter={{ lat: currentPosition.lat, lng: currentPosition.lng }}
      >
        <Marker position={{ lat: currentPosition.lat, lng: currentPosition.lng }} />

        {vetCabinets.map((place, index) => (
          <Marker
            key={index}
            title={place.name}
            position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
          />
        ))}
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCuWiqwSqU-KUCeSAaXLRFjsGBlyb0cMg',
})(MapContainer);
