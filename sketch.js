let poly;
let rotation = 60;

class Polygon {
  constructor() {
    this.edges = [];
    this.vertices = [];
  }
  addVertex(x, y) {
    let a = createVector(x, y);
    let total = this.vertices.length;
    if (total > 0) {
      let prev = this.vertices[total - 1];
      let edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }
  show() {
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
  }
  hankin() {
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin();
    }
    this.edges[0].findEnds(this.edges[1]);
  }
  close() {
    let total = this.vertices.length;
    let first = this.vertices[0];
    let last = this.vertices[total - 1];
    let lastEdge = new Edge(last, first);
    this.edges.push(lastEdge);
  }
}

class Edge {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.h1;
    this.h2;
  }
  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    this.h1.show();
    this.h2.show();
  }
  hankin() {
    let mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);
    let v1 = p5.Vector.sub(this.a, mid);
    let v2 = p5.Vector.sub(this.b, mid);
    v1.rotate(180 + rotation);
    v2.rotate(-180 - rotation);
    this.h1 = new Hankin(mid, v1);
    this.h2 = new Hankin(mid, v2);
  }
  findEnds(edge) {
    this.h1.findEnd(edge.h1);
    this.h2.findEnd(edge.h1);
    this.h1.findEnd(edge.h2);
    this.h2.findEnd(edge.h2);
  }
}

class Hankin {
  constructor(a, v) {
    this.a = a;
    this.v = v;
    this.b = p5.Vector.add(a, v);
    this.end;
  }
  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    fill(100);
    ellipse(this.a.x, this.a.y, 8);
    if (this.end) {
      fill(100, 0, 50);
      ellipse(this.end.x, this.end.y, 8);
    }
  }
  findEnd(other) {
    //     line line intersection
    let den = other.v.y * this.v.x - other.v.x * this.v.y;
    let numa =
      other.v.x * (this.a.y - other.a.y) - other.v.y * (this.a.x - other.a.x);
    let numb =
      this.v.x * (this.a.y - other.a.y) - this.v.y * (this.a.x - other.a.x);
    let ua = numa / den;
    let ub = numb / den;
    let x = this.a.x + ua * this.v.x;
    let y = this.a.y + ua * this.v.y;

    if (ua > 0 && ub > 0) {
      this.end = createVector(x, y);
    }
  }
}

function setup() {
  background(220);
  createCanvas(750, 750);
  angleMode(DEGREES);
  poly = new Polygon();
  poly.addVertex(100, 100);
  poly.addVertex(200, 100);
  poly.addVertex(200, 200);
  poly.addVertex(100, 200);
  poly.close();
  poly.hankin();
  poly.show();
}
