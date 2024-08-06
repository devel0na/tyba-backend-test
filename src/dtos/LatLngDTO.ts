import { IsNotEmpty, IsString } from "class-validator";

export class LatLngDTO {
  @IsString()
  @IsNotEmpty()
  lat: number;

  @IsString()
  @IsNotEmpty()
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
