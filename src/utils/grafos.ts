export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface Graph {
  [key: string]: { [key: string]: number };
}

interface PriorityQueueElement {
  node: string;
  priority: number;
}

class PriorityQueue {
  private elements: PriorityQueueElement[];

  constructor() {
    this.elements = [];
  }

  enqueue(element: PriorityQueueElement) {
    this.elements.push(element);
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): PriorityQueueElement | undefined {
    return this.elements.shift();
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

export function shortestPath(previous: { [key: string]: string | null }, endNode: string) {
  const path: string[] = [];
  let currentNode: string | null = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return path;
}
