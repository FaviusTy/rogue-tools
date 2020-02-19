((modules, entryPoint) => {
  let global = function() {
    return this;
  }();
  let cache = {};
  let require = (target, arg) => {
    if (typeof target === "number") {
      let module = cache[target], exports;
      if (!module) {
        module = cache[target] = {
          exports: {}
        };
        modules[target].call(global, require, module.exports, module);
      }
      exports = module.exports;
      if (arg && (!exports || !exports.__esModule)) {
        if (!exports || typeof exports !== "object") {
          exports = {};
        }
        if (!("default" in exports)) {
          Object.defineProperty(exports, "default", {
            get: () => module.exports,
            enumerable: true
          });
        }
      }
      return exports;
    }
    arg.__esModule = () => true;
    for (let name in arg) {
      Object.defineProperty(target, name, {
        get: arg[name],
        enumerable: true
      });
    }
  };
  return require(entryPoint);
})({
  15(require, exports) {
    // node_modules/@favi_ty/range/dist/range.js
    "use strict";
    function range(e) {
      var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return Array.from(new Array(e), function(e2, t) {
        return r ? r + t : t;
      });
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    }), exports.default = range;
  },

  14(require, exports) {
    // node_modules/@favi_ty/private-fields/dist/PrivateFields.js
    "use strict";
    function _classCallCheck(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, t) {
      for (var r = 0; r < t.length; r++) {
        var a = t[r];
        a.enumerable = a.enumerable || false, a.configurable = true, "value" in a && (a.writable = true), Object.defineProperty(e, a.key, a);
      }
    }
    function _createClass(e, t, r) {
      return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e;
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    }), exports.default = void 0;
    var PrivateFields = function() {
      function e() {
        _classCallCheck(this, e), this.map = new WeakMap();
      }
      return _createClass(e, [{
        key: "set",
        value: function(e2, t) {
          this.map.set(e2, t);
        }
      }, {
        key: "get",
        value: function(e2) {
          var t = this.map.get(e2);
          if (!t)
            throw new Error("undefined private value!");
          return t;
        }
      }]), e;
    }();
    exports.default = PrivateFields;
  },

  9(require, index2) {
    // js/utils/lerp.js
    function lerp2(start, end) {
      var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      return start + t * (end - start);
    }

    // js/Point.js
    const private_fields3 = require(14 /* @favi_ty/private-fields */, true /* ES6 import */);
    var {abs, round, sqrt, pow, floor} = Math;
    var instanceCaches = new Map();
    var privates3 = new private_fields3.default();
    function key(x, y) {
      return "".concat(x, ",").concat(y);
    }
    function point() {
      var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return new Point4(x, y);
    }
    class Point4 {
      constructor() {
        var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        var cache = instanceCaches.get(key(x, y));
        if (cache) {
          return cache;
        }
        privates3.set(this, {
          x,
          y,
          key: key(x, y)
        });
        instanceCaches.set(key(x, y), this);
      }
      toString() {
        return "Point{".concat(this.key, "}");
      }
      static sort(a, b) {
        var diff = a.sub(b);
        if (diff.x === 0 && diff.y === 0)
          return 0;
        if (diff.x !== 0)
          return diff.x;
        return diff.y;
      }
      static lerp(start, end, t) {
        return new Point4(default10(start.x, end.x, t), default10(start.y, end.y, t));
      }
      get x() {
        return privates3.get(this).x;
      }
      get y() {
        return privates3.get(this).y;
      }
      get key() {
        return privates3.get(this).key;
      }
      get abs() {
        return new Point4(abs(this.x), abs(this.y));
      }
      get round() {
        return new Point4(round(this.x), round(this.y));
      }
      get floor() {
        return new Point4(floor(this.x), floor(this.y));
      }
      distanse(point2) {
        return sqrt(pow(this.x - point2.x, 2) + pow(this.y - point2.y, 2));
      }
      add(point2) {
        return new Point4(this.x + point2.x, this.y + point2.y);
      }
      sub(point2) {
        return new Point4(this.x - point2.x, this.y - point2.y);
      }
      mul(point2) {
        return new Point4(this.x * point2.x, this.y * point2.y);
      }
      div(point2) {
        return new Point4(this.x / point2.x, this.y / point2.y);
      }
    }

    // js/matrix.js
    var matrix2 = {};
    require(matrix2, {
      beautifyRadius: () => beautifyRadius,
      circle: () => circle,
      column: () => column,
      insideCircle: () => insideCircle,
      isMatrix: () => isMatrix,
      line: () => line,
      rect: () => rect,
      row: () => row
    });
    const range3 = require(15 /* @favi_ty/range */, true /* ES6 import */);
    var {floor: floor2} = Math;
    function insideCircle(center, target, radius) {
      var distance = center.sub(target);
      var squared = distance.mul(distance);
      return squared.x + squared.y < radius * radius;
    }
    function beautifyRadius(radius) {
      var integer = floor2(radius);
      return integer + 0.5;
    }
    function row(point2) {
      var length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      return range3.default(length).map((x) => new default2(point2.x + x, point2.y));
    }
    function column(point2) {
      var length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      return range3.default(length).map((y) => new default2(point2.x, point2.y + y));
    }
    function rect(point2) {
      var width = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      var height = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      return range3.default(height, point2.y).reduce((res, y) => res.concat(...range3.default(width, point2.x).map((x) => new default2(x, y))), []);
    }
    function circle(center, radius) {
      var intRadius = floor2(radius);
      var origin = center.sub(point(intRadius, intRadius));
      var side = intRadius * 2 + 1;
      return rect(origin, side, side).filter((point2) => insideCircle(center, point2, radius));
    }
    function borderes(matrix3) {
      if (matrix3.length === 0)
        return matrix3;
      var topX = matrix3[0].x;
      var bottomX = matrix3[matrix3.length - 1].x;
    }
    function line(start, end) {
      var {x, y} = start.sub(end).abs;
      var diagonal_distance = x > y ? x : y;
      return range3.default(diagonal_distance + 1).map((_, index3) => diagonal_distance === 0 ? 0 : index3 / diagonal_distance).map((t) => {
        return default2.lerp(start, end, t).round;
      });
    }
    function isMatrix(target) {
      if (!Array.isArray(target))
        return false;
      if (target.length === 0)
        return true;
      if (target.filter((point2) => !(point2 instanceof default2)).length !== 0)
        return false;
      return true;
    }

    // js/utils/exsits.js
    function exists(value) {
      return value !== void 0 && value !== null;
    }

    // js/Neighbors.js
    const private_fields2 = require(14 /* @favi_ty/private-fields */, true /* ES6 import */);
    var privates2 = new private_fields2.default();
    var NeighborIndexes = Object.freeze({
      UP: 0,
      UP_RIGHT: 1,
      RIGHT: 2,
      BOTTOM_RIGHT: 3,
      BOTTOM: 4,
      BOTTOM_LEFT: 5,
      LEFT: 6,
      UP_LEFT: 7
    });
    class Neighbors2 {
      constructor() {
        var edges = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 4;
        privates2.set(this, edges);
      }
      get edges() {
        return privates2.get(this);
      }
      up(point2) {
        return new default2(point2.x, point2.y - 1);
      }
      down(point2) {
        return new default2(point2.x, point2.y + 1);
      }
      left(point2) {
        return new default2(point2.x - 1, point2.y);
      }
      right(point2) {
        return new default2(point2.x + 1, point2.y);
      }
      upperLeft(point2) {
        if (this.edges === 4)
          return null;
        return this.left(this.up(point2));
      }
      upperRight(point2) {
        if (this.edges === 4)
          return null;
        return this.right(this.up(point2));
      }
      bottomLeft(point2) {
        if (this.edges === 4)
          return null;
        return this.left(this.down(point2));
      }
      bottomRight(point2) {
        if (this.edges === 4)
          return null;
        return this.right(this.down(point2));
      }
      arounds(point2) {
        var result = [this.up(point2), this.upperRight(point2), this.right(point2), this.bottomRight(point2), this.down(point2), this.bottomLeft(point2), this.left(point2), this.upperLeft(point2)];
        return this.edges === 4 ? result.filter(default4) : result;
      }
    }

    // js/Pathfinding/DiagonalMovement.js
    var DiagonalMovement2 = {};
    require(DiagonalMovement2, {
      Always: () => Always,
      IfAtMostOneObstacle: () => IfAtMostOneObstacle,
      Never: () => Never,
      OnlyWhenNoObstacles: () => OnlyWhenNoObstacles,
      diagonalWalkable: () => diagonalWalkable
    });
    var {UP, RIGHT, BOTTOM, LEFT} = NeighborIndexes;
    var Always = 1;
    var Never = 2;
    var IfAtMostOneObstacle = 3;
    var OnlyWhenNoObstacles = 4;
    function diagonalWalkable(type, around) {
      if (type === Never)
        return around.map((walkable, index3) => [0, 2, 4, 6].includes(index3) && walkable);
      if (type === IfAtMostOneObstacle) {
        return [around[UP], around[UP] || around[RIGHT], around[RIGHT], around[RIGHT] || around[BOTTOM], around[BOTTOM], around[BOTTOM] || around[LEFT], around[LEFT], around[LEFT] || around[UP]];
      }
      if (type === OnlyWhenNoObstacles) {
        return [around[UP], around[UP] && around[RIGHT], around[RIGHT], around[RIGHT] && around[BOTTOM], around[BOTTOM], around[BOTTOM] && around[LEFT], around[LEFT], around[LEFT] && around[UP]];
      }
      return around;
    }

    // js/Pathfinding/Heuristic.js
    function manhattan(_ref) {
      var {x, y} = _ref;
      return x + y;
    }
    function euclidean(_ref2) {
      var {x, y} = _ref2;
      return Math.sqrt(x * x + y * y);
    }
    function octile(_ref3) {
      var {x, y} = _ref3;
      var F = Math.SQRT2 - 1;
      return x < y ? F * x + y : F * y + x;
    }
    function chebyshev(_ref4) {
      var {x, y} = _ref4;
      return Math.max(x, y);
    }
    const default6 = {
      manhattan,
      euclidean,
      octile,
      chebyshev
    };

    // js/Pathfinding/Node.js
    var NONE = 0;
    var OPEN = 1;
    var CLOSE = 2;
    class Node3 {
      constructor(point2) {
        this.point = point2;
        this.g_cost = 0;
        this.h_cost = 0;
        this.state = NONE;
      }
      get x() {
        return this.point.x;
      }
      get y() {
        return this.point.y;
      }
      get cost() {
        return this.g_cost + this.h_cost;
      }
      open() {
        this.state = OPEN;
      }
      get opened() {
        return this.state === OPEN;
      }
      close() {
        this.state = CLOSE;
      }
      get closed() {
        return this.state === CLOSE;
      }
      backtrack() {
        var list = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        if (this.parent) {
          return this.parent.backtrack([...list, this.point]);
        }
        return [...list, this.point].reverse();
      }
    }

    // js/Pathfinding/NodeBucket.js
    class NodeBucket3 {
      constructor() {
        var nodes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        this.nodes = nodes;
      }
      pick(point2) {
        var result = this.nodes.find((node) => node.point === point2);
        if (result) {
          return result;
        }
        var newer = new default7(point2);
        this.nodes.push(newer);
        return newer;
      }
    }

    // js/Pathfinding/AStar.js
    const heap_js = require(16 /* heap-js */, true /* ES6 import */);
    function defaultWalkable(entity) {
      return default4(entity);
    }
    function defaultCalcCost(entity) {
      return entity && typeof entity === "number" ? entity : 1;
    }
    var {SQRT2} = Math;
    class AStar2 {
      constructor(options) {
        this.heuristic = options.heuristic || default6.manhattan;
        this.weight = options.weight || 1;
        this.neighbors = new default5(8);
        this.diagonalMovement = options.diagonalMovement || Never;
        this.walkable = options.walkable || defaultWalkable;
        this.calcCost = options.calcCost || defaultCalcCost;
        if (this.diagonalMovement === Never) {
          this.heuristic = options.heuristic || default6.manhattan;
        } else {
          this.heuristic = options.heuristic || default6.octile;
        }
      }
      findPath(start, end, grid) {
        var _this = this;
        var openList = new heap_js.default((nodeA, nodeB) => {
          if (!nodeA || !nodeB)
            return 0;
          return nodeA.cost - nodeB.cost;
        });
        var startNode = new default7(start);
        var endNode = new default7(end);
        var bucket = new default8([startNode, endNode]);
        startNode.g_cost = 0;
        openList.init([startNode]);
        startNode.open();
        var _loop2 = function _loop22() {
          var node = openList.pop();
          if (!node)
            return "break";
          node.close();
          if (node === endNode) {
            return {
              v: endNode.backtrack()
            };
          }
          var neighbors = _this.neighbors.arounds(node.point).map((point2) => {
            return point2 && point2.x >= 0 && point2.y >= 0 ? bucket.pick(point2) : null;
          });
          var walkables = diagonalWalkable(_this.diagonalMovement, neighbors.map((node2) => node2 ? _this.walkable(grid.pick(node2.point)) : false));
          for (var neighbor of neighbors.filter((_, index3) => walkables[index3])) {
            if (!neighbor || neighbor.closed)
              continue;
            var {x, y} = neighbor;
            var base_cost = _this.calcCost(grid.pick(node.point));
            var ng = base_cost + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);
            if (!neighbor.opened || ng < neighbor.g_cost) {
              neighbor.g_cost = ng;
              neighbor.h_cost = neighbor.h_cost || _this.weight * _this.heuristic(neighbor.point.sub(end).abs);
              neighbor.parent = node;
              if (!neighbor.opened) {
                openList.push(neighbor);
                neighbor.open();
                continue;
              }
              openList.comparator();
            }
          }
        };
        _loop:
          while (!openList.isEmpty()) {
            var _ret = _loop2();
            switch (_ret) {
              case "break":
                break _loop;
              default:
                if (typeof _ret === "object")
                  return _ret.v;
            }
          }
        return [];
      }
    }

    // js/Pathfinding/index.js
    var index = {};
    require(index, {
      AStar: () => default9,
      CLOSE: () => CLOSE,
      DiagonalMovement: () => DiagonalMovement2,
      Heuristic: () => default6,
      NONE: () => NONE,
      Node: () => default7,
      NodeBucket: () => default8,
      OPEN: () => OPEN
    });

    // js/DataGrid.js
    const either = require(13 /* @favi_ty/either */, true /* ES6 import */), private_fields = require(14 /* @favi_ty/private-fields */, true /* ES6 import */), range = require(15 /* @favi_ty/range */, true /* ES6 import */);
    function isPositive(value) {
      return value >= 0;
    }
    function convertRawIndex(_ref, _ref2) {
      var {x, y} = _ref;
      var {width} = _ref2;
      return either.default(y, isPositive)(0) * width + either.default(x, isPositive)(0);
    }
    var privates = new private_fields.default();
    class Map2 {
      constructor() {
        var width = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        privates.set(this, {
          width,
          height,
          raw: new Array(width * height)
        });
      }
      toString() {
        var raw = this.raw;
        return range.default(this.height, 1).map((y) => this.width * y).map((endX) => {
          return raw.slice(endX - this.width, endX).map((item) => "".concat(item)).join(" ");
        }).join("\n");
      }
      get width() {
        return privates.get(this).width;
      }
      get height() {
        return privates.get(this).height;
      }
      get raw() {
        return [...either.default(privates.get(this).raw)([])];
      }
      isOverRange(point2) {
        var {x, y} = point2;
        if (x < 0 || y < 0)
          return true;
        return x >= this.width || y >= this.height;
      }
      fill(element) {
        privates.get(this).raw.fill(element);
      }
      put(point2, element) {
        if (this.isOverRange(point2))
          return;
        privates.get(this).raw[convertRawIndex(point2, this)] = element;
      }
      pick(point2) {
        if (this.isOverRange(point2))
          return;
        return privates.get(this).raw[convertRawIndex(point2, this)];
      }
      pickOut(point2) {
        if (this.isOverRange(point2))
          return;
        var result = this.pick(point2);
        this.put(point2);
        return result;
      }
      paste(point2, map) {
        var pasteRect = rect(point2, map.width, map.height);
        map.raw.forEach((element, index3) => {
          var point3 = pasteRect[index3];
          if (this.isOverRange(point3))
            return;
          this.put(point3, element);
        });
      }
      clip(point2, _ref3) {
        var {width, height} = _ref3;
        if (this.isOverRange(point2))
          return;
        var result = new Map2(width, height);
        var clipRect = rect(point2, width, height);
        rect(new default2(0, 0), width, height).forEach((point3, index3) => {
          result.put(point3, this.pick(clipRect[index3]));
        });
        return result;
      }
    }

    // js/index.js
    require(index2, {
      NeighborIndexes: () => NeighborIndexes,
      Neighbors: () => default5,
      Pathfinding: () => index,
      Point: () => default2,
      default: () => default3,
      matrix: () => matrix2,
      point: () => point
    });
  },

  16(require, exports, module) {
    // node_modules/heap-js/dist/heap-js.umd.js
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.heap = {}));
    })(this, function(exports2) {
      "use strict";
      var __generator = function(thisArg, body) {
        var _ = {
          label: 0,
          sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        }, f, y, t, g;
        return g = {
          next: verb(0),
          throw: verb(1),
          return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return {
                    value: op[1],
                    done: false
                  };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return {
            value: op[0] ? op[1] : void 0,
            done: true
          };
        }
      };
      var Heap = function() {
        function Heap2(compare) {
          var _this = this;
          if (compare === void 0) {
            compare = Heap2.minComparator;
          }
          this.compare = compare;
          this.heapArray = [];
          this._limit = 0;
          this.offer = this.add;
          this.element = this.peek;
          this.poll = this.pop;
          this._invertedCompare = function(a, b) {
            return -1 * _this.compare(a, b);
          };
        }
        Heap2.getChildrenIndexOf = function(idx) {
          return [idx * 2 + 1, idx * 2 + 2];
        };
        Heap2.getParentIndexOf = function(idx) {
          if (idx <= 0) {
            return -1;
          }
          var whichChildren = idx % 2 ? 1 : 2;
          return Math.floor((idx - whichChildren) / 2);
        };
        Heap2.getSiblingIndexOf = function(idx) {
          if (idx <= 0) {
            return -1;
          }
          var whichChildren = idx % 2 ? 1 : -1;
          return idx + whichChildren;
        };
        Heap2.minComparator = function(a, b) {
          if (a > b) {
            return 1;
          } else if (a < b) {
            return -1;
          } else {
            return 0;
          }
        };
        Heap2.maxComparator = function(a, b) {
          if (b > a) {
            return 1;
          } else if (b < a) {
            return -1;
          } else {
            return 0;
          }
        };
        Heap2.minComparatorNumber = function(a, b) {
          return a - b;
        };
        Heap2.maxComparatorNumber = function(a, b) {
          return b - a;
        };
        Heap2.defaultIsEqual = function(a, b) {
          return a === b;
        };
        Heap2.print = function(heap) {
          function deep(i2) {
            var pi = Heap2.getParentIndexOf(i2);
            return Math.floor(Math.log2(pi + 1));
          }
          function repeat(str, times) {
            var out = "";
            for (; times > 0; --times) {
              out += str;
            }
            return out;
          }
          var node = 0;
          var lines = [];
          var maxLines = deep(heap.length - 1) + 2;
          var maxLength = 0;
          while (node < heap.length) {
            var i = deep(node) + 1;
            if (node === 0) {
              i = 0;
            }
            var nodeText = String(heap.get(node));
            if (nodeText.length > maxLength) {
              maxLength = nodeText.length;
            }
            lines[i] = lines[i] || [];
            lines[i].push(nodeText);
            node += 1;
          }
          return lines.map(function(line, i2) {
            var times = Math.pow(2, maxLines - i2) - 1;
            return repeat(" ", Math.floor(times / 2) * maxLength) + line.map(function(el) {
              var half = (maxLength - el.length) / 2;
              return repeat(" ", Math.ceil(half)) + el + repeat(" ", Math.floor(half));
            }).join(repeat(" ", times * maxLength));
          }).join("\n");
        };
        Heap2.heapify = function(arr, compare) {
          var heap = new Heap2(compare);
          heap.heapArray = arr;
          heap.init();
          return heap;
        };
        Heap2.heappop = function(heapArr, compare) {
          var heap = new Heap2(compare);
          heap.heapArray = heapArr;
          return heap.pop();
        };
        Heap2.heappush = function(heapArr, item, compare) {
          var heap = new Heap2(compare);
          heap.heapArray = heapArr;
          heap.push(item);
        };
        Heap2.heappushpop = function(heapArr, item, compare) {
          var heap = new Heap2(compare);
          heap.heapArray = heapArr;
          return heap.pushpop(item);
        };
        Heap2.heapreplace = function(heapArr, item, compare) {
          var heap = new Heap2(compare);
          heap.heapArray = heapArr;
          return heap.replace(item);
        };
        Heap2.heaptop = function(heapArr, n, compare) {
          if (n === void 0) {
            n = 1;
          }
          var heap = new Heap2(compare);
          heap.heapArray = heapArr;
          return heap.top(n);
        };
        Heap2.heapbottom = function(heapArr, n, compare) {
          if (n === void 0) {
            n = 1;
          }
          var heap = new Heap2(compare);
          heap.heapArray = heapArr;
          return heap.bottom(n);
        };
        Heap2.prototype.add = function(element) {
          this._sortNodeUp(this.heapArray.push(element) - 1);
          this._applyLimit();
          return true;
        };
        Heap2.prototype.addAll = function(elements) {
          var _a;
          var i = this.length;
          (_a = this.heapArray).push.apply(_a, elements);
          for (var l = this.length; i < l; ++i) {
            this._sortNodeUp(i);
          }
          this._applyLimit();
          return true;
        };
        Heap2.prototype.bottom = function(n) {
          if (n === void 0) {
            n = 1;
          }
          if (this.heapArray.length === 0 || n <= 0) {
            return [];
          } else if (this.heapArray.length === 1) {
            return [this.heapArray[0]];
          } else if (n >= this.heapArray.length) {
            var cloned = this.heapArray.slice(0);
            cloned.sort(this._invertedCompare);
            return cloned;
          } else {
            var result = this._bottomN(n);
            result.sort(this._invertedCompare);
            return result;
          }
        };
        Heap2.prototype.check = function() {
          var _this = this;
          return this.heapArray.find(function(el, j, arr) {
            return !!_this.getChildrenOf(j).find(function(ch) {
              return _this.compare(el, ch) > 0;
            });
          });
        };
        Heap2.prototype.clear = function() {
          this.heapArray = [];
        };
        Heap2.prototype.clone = function() {
          var cloned = new Heap2(this.comparator());
          cloned.heapArray = this.toArray();
          cloned._limit = this._limit;
          return cloned;
        };
        Heap2.prototype.comparator = function() {
          return this.compare;
        };
        Heap2.prototype.contains = function(o, fn) {
          if (fn === void 0) {
            fn = Heap2.defaultIsEqual;
          }
          return this.heapArray.findIndex(function(el) {
            return fn(el, o);
          }) >= 0;
        };
        Heap2.prototype.init = function(array) {
          if (array) {
            this.heapArray = array.slice(0);
          }
          for (var i = Math.floor(this.heapArray.length); i >= 0; --i) {
            this._sortNodeDown(i);
          }
          this._applyLimit();
        };
        Heap2.prototype.isEmpty = function() {
          return this.length === 0;
        };
        Heap2.prototype.leafs = function() {
          if (this.heapArray.length === 0) {
            return [];
          }
          var pi = Heap2.getParentIndexOf(this.heapArray.length - 1);
          return this.heapArray.slice(pi + 1);
        };
        Object.defineProperty(Heap2.prototype, "length", {
          get: function() {
            return this.heapArray.length;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Heap2.prototype, "limit", {
          get: function() {
            return this._limit;
          },
          set: function(_l) {
            this._limit = _l;
            this._applyLimit();
          },
          enumerable: true,
          configurable: true
        });
        Heap2.prototype.peek = function() {
          return this.heapArray[0];
        };
        Heap2.prototype.pop = function() {
          var pop = this.heapArray.pop();
          if (this.length > 0 && pop !== void 0) {
            return this.replace(pop);
          }
          return pop;
        };
        Heap2.prototype.push = function() {
          var elements = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
          }
          if (elements.length < 1) {
            return false;
          } else if (elements.length === 1) {
            return this.add(elements[0]);
          } else {
            return this.addAll(elements);
          }
        };
        Heap2.prototype.pushpop = function(element) {
          var _a;
          if (this.compare(this.heapArray[0], element) < 0) {
            _a = [this.heapArray[0], element], element = _a[0], this.heapArray[0] = _a[1];
            this._sortNodeDown(0);
          }
          return element;
        };
        Heap2.prototype.remove = function(o, fn) {
          if (fn === void 0) {
            fn = Heap2.defaultIsEqual;
          }
          if (this.length > 0) {
            if (o === void 0) {
              this.pop();
              return true;
            } else {
              var idx = this.heapArray.findIndex(function(el) {
                return fn(el, o);
              });
              if (idx >= 0) {
                if (idx === 0) {
                  this.pop();
                } else if (idx === this.length - 1) {
                  this.heapArray.pop();
                } else {
                  this.heapArray.splice(idx, 1, this.heapArray.pop());
                  this._sortNodeUp(idx);
                  this._sortNodeDown(idx);
                }
                return true;
              }
            }
          }
          return false;
        };
        Heap2.prototype.replace = function(element) {
          var peek = this.heapArray[0];
          this.heapArray[0] = element;
          this._sortNodeDown(0);
          return peek;
        };
        Heap2.prototype.size = function() {
          return this.length;
        };
        Heap2.prototype.top = function(n) {
          if (n === void 0) {
            n = 1;
          }
          if (this.heapArray.length === 0 || n <= 0) {
            return [];
          } else if (this.heapArray.length === 1 || n === 1) {
            return [this.heapArray[0]];
          } else if (n >= this.heapArray.length) {
            var cloned = this.heapArray.slice(0);
            cloned.sort(this.compare);
            return cloned;
          } else {
            var result = this._topN(n);
            result.sort(this.compare);
            return result;
          }
        };
        Heap2.prototype.toArray = function() {
          return this.heapArray.slice(0);
        };
        Heap2.prototype.toString = function() {
          return this.heapArray.toString();
        };
        Heap2.prototype.get = function(i) {
          return this.heapArray[i];
        };
        Heap2.prototype.getChildrenOf = function(idx) {
          var _this = this;
          return Heap2.getChildrenIndexOf(idx).map(function(i) {
            return _this.heapArray[i];
          }).filter(function(e) {
            return e !== void 0;
          });
        };
        Heap2.prototype.getParentOf = function(idx) {
          var pi = Heap2.getParentIndexOf(idx);
          return this.heapArray[pi];
        };
        Heap2.prototype[Symbol.iterator] = function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!this.length)
                  return [3, 2];
                return [4, this.pop()];
              case 1:
                _a.sent();
                return [3, 0];
              case 2:
                return [2];
            }
          });
        };
        Heap2.prototype.iterator = function() {
          return this;
        };
        Heap2.prototype._applyLimit = function() {
          if (this._limit && this._limit < this.heapArray.length) {
            var rm = this.heapArray.length - this._limit;
            while (rm) {
              this.heapArray.pop();
              --rm;
            }
          }
        };
        Heap2.prototype._bottomN = function(n) {
          var bottomHeap = new Heap2(this.compare);
          bottomHeap.limit = n;
          bottomHeap.init(this.heapArray.slice(-n));
          var startAt = this.heapArray.length - 1 - n;
          var parentStartAt = Heap2.getParentIndexOf(startAt);
          var indices = [];
          for (var i = startAt; i > parentStartAt; --i) {
            indices.push(i);
          }
          var arr = this.heapArray;
          while (indices.length) {
            var i = indices.shift();
            if (this.compare(arr[i], bottomHeap.peek()) > 0) {
              bottomHeap.replace(arr[i]);
              if (i % 2) {
                indices.push(Heap2.getParentIndexOf(i));
              }
            }
          }
          return bottomHeap.toArray();
        };
        Heap2.prototype._moveNode = function(j, k) {
          var _a;
          _a = [this.heapArray[k], this.heapArray[j]], this.heapArray[j] = _a[0], this.heapArray[k] = _a[1];
        };
        Heap2.prototype._sortNodeDown = function(i) {
          var _this = this;
          var moveIt = i < this.heapArray.length - 1;
          var moved = false;
          var self2 = this.heapArray[i];
          var getPotentialParent = function(best, j) {
            if (_this.compare(_this.heapArray[j], _this.heapArray[best]) < 0) {
              best = j;
            }
            return best;
          };
          while (moveIt) {
            var childrenIdx = Heap2.getChildrenIndexOf(i);
            var bestChildIndex = childrenIdx.reduce(getPotentialParent, childrenIdx[0]);
            var bestChild = this.heapArray[bestChildIndex];
            if (typeof bestChild !== "undefined" && this.compare(self2, bestChild) > 0) {
              this._moveNode(i, bestChildIndex);
              i = bestChildIndex;
              moved = true;
            } else {
              moveIt = false;
            }
          }
          return moved;
        };
        Heap2.prototype._sortNodeUp = function(i) {
          var moveIt = i > 0;
          var moved = false;
          while (moveIt) {
            var pi = Heap2.getParentIndexOf(i);
            if (pi >= 0 && this.compare(this.heapArray[pi], this.heapArray[i]) > 0) {
              this._moveNode(i, pi);
              i = pi;
              moved = true;
            } else {
              moveIt = false;
            }
          }
          return moved;
        };
        Heap2.prototype._topN = function(n) {
          var topHeap = new Heap2(this._invertedCompare);
          topHeap.limit = n;
          var indices = [0];
          var arr = this.heapArray;
          while (indices.length) {
            var i = indices.shift();
            if (i < arr.length) {
              if (topHeap.length < n) {
                topHeap.push(arr[i]);
                indices.push.apply(indices, Heap2.getChildrenIndexOf(i));
              } else if (this.compare(arr[i], topHeap.peek()) <= 0) {
                topHeap.replace(arr[i]);
                indices.push.apply(indices, Heap2.getChildrenIndexOf(i));
              }
            }
          }
          return topHeap.toArray();
        };
        return Heap2;
      }();
      exports2.Heap = Heap;
      exports2.default = Heap;
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
    });
  },

  13(require, exports) {
    // node_modules/@favi_ty/either/dist/either.js
    "use strict";
    function exists(e) {
      return null != e;
    }
    function either(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : exists;
      return function(r) {
        return t(e) ? e : r;
      };
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    }), exports.default = either;
  }
}, 9);
