import Point from "../Point.js";
import Node from "./Node.js";

export default class NodeBucket {
  nodes: Node[];
  constructor(nodes: Node[] = []) {
    this.nodes = nodes;
  }

  pick(point: Point) {
    const result = this.nodes.find(node => node.point === point);
    if (result) {
      return result;
    }
    const newer = new Node(point);
    this.nodes.push(newer);
    return newer;
  }
}
