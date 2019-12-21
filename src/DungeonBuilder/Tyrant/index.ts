import DataGrid from "../../DataGrid";

const privates = new WeakMap();

const DEFAULT_OPTS = {
  dugPercentage: 0.2,
  roomNumber: 4,
  minRoomWidth: 3,
  maxRoomWidth: 9,
  minRoomHeight: 3,
  maxRoomHeight: 5,
  corriderNumber: 4,
  minCorriderLength: 3,
  maxCorriderLength: 10
};

export default class Tyrant {
  constructor(map, options = {}) {
    this.map = map;
    privates.set(this, {
      rooms: [],
      corriders: [],
      walls: [],
      dug: 0,
      ...Object.assign({}, DEFAULT_OPTS, options)
    });
  }
}
