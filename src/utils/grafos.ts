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

export function dijkstra(graph: Graph, startNode: string) {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const pq = new PriorityQueue();

  distances[startNode] = 0;
  pq.enqueue({ node: startNode, priority: 0 });

  for (const node in graph) {
    if (node !== startNode) {
      distances[node] = Infinity;
    }
    previous[node] = null;
  }

  while (!pq.isEmpty()) {
    const smallest = pq.dequeue()?.node;

    if (smallest === undefined) {
      break;
    }

    for (const neighbor in graph[smallest]) {
      const alt = distances[smallest] + graph[smallest][neighbor];

      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = smallest;
        pq.enqueue({ node: neighbor, priority: alt });
      }
    }
  }

  return { distances, previous };
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

export function haversineDistance(point1: LatLngLiteral, point2: LatLngLiteral) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}
