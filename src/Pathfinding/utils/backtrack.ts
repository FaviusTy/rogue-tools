import Node from "../Node";

export default function backtrace(node: Node) {
  const path = [node.point];
  while (node.parent) {
    node = node.parent;
    path.push(node.point);
  }
  return path.reverse();
}
