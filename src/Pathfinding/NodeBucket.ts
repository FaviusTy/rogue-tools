import Point from "../Point";
import Node from "./Node";

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
