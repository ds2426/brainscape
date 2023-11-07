import { RequestStatus } from "../utils/enums";
import { IPhoto } from "./IPhoto";

export interface PhotoState {
    photos: IPhoto[];
    status: RequestStatus;
  }