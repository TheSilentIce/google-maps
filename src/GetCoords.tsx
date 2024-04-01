//I am using Neovim baby

interface markerSetting {
  lat: number;
  lng: number;
}

export class GetCoords {
  constructor() {}

  /**
   * This calls the server and then returns all records in DB
   * @returns - returns records from MongoDB
   */
  private async getAddress() {
    const response = await fetch("http://localhost:8080/v1/ctec/all");

    const addressData = await response.json();

    return addressData;
  }

  /**
   * This takes the addresses from each record, and then gets the coordinates from each address of the records.
   * Returns a list with latitude and longitude.
   * @returns - returns list with latitude and longitude.
   */
  async getCoordinates() {
    let API_KEY: string = "API_STRING";
    let coords: markerSetting[] = [];
    let api: string =
      "https://maps.googleapis.com/maps/api/geocode/json?address=";

    const addressData = await this.getAddress();

    for (let i = 0; i < addressData.length; i++) {
      let constructedString: string =
        api + addressData[i].address + "&key=" + API_KEY;

      const response = await fetch(constructedString);

      const data = await response.json();
      coords.push({
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      });
    }
    return coords;
  }

  /**
   * Doesn't do anything, but needed to satisfy program
   * @returns
   */
  render() {
    return null;
  }
}
