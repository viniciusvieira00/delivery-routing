// dijkstra.ts

import { User, Post } from './data';

interface Node {
  id: number;
  cost: number;
}

export function dijkstra(user: User, posts: Post[]): Post[] {
  const adjacencyList: { [key: number]: Node[] } = {};

  posts.forEach((post) => {
    adjacencyList[post.id] = posts
      .filter((p) => p.id !== post.id)
      .map((p) => ({ id: p.id, cost: calculateCost(post, p) }));
  });

  const distances: { [key: number]: number } = {};
  const visited: { [key: number]: boolean } = {};
  const previous: { [key: number]: number | null } = {};

  posts.forEach((post) => {
    distances[post.id] = Infinity;
    previous[post.id] = null;
  });

  const relevantPosts = posts.filter(post => user.interests.some(interest => post.tags.includes(interest)));
  relevantPosts.forEach((post, index) => {
    distances[post.id] = 0;
    visited[post.id] = false;
    previous[post.id] = null;
  });

  while (Object.keys(visited).length < relevantPosts.length) {
    const [closestNode] = Object.keys(distances)
      .filter((node) => !visited[parseInt(node, 10)])
      .sort((a, b) => distances[parseInt(a, 10)] - distances[parseInt(b, 10)]);

    if (distances[parseInt(closestNode, 10)] === Infinity) {
      break;
    }

    adjacencyList[parseInt(closestNode, 10)].forEach((neighbor) => {
      const newDist = distances[parseInt(closestNode, 10)] + neighbor.cost;
      if (newDist < distances[neighbor.id]) {
        distances[neighbor.id] = newDist;
        previous[neighbor.id] = parseInt(closestNode, 10);
      }
    });

    visited[parseInt(closestNode, 10)] = true;
  }

  return relevantPosts;
}

function calculateCost(post1: Post, post2: Post): number {
  const commonTags = post1.tags.filter((tag) => post2.tags.includes(tag));
  return commonTags.length > 0 ? 1 / commonTags.length : Infinity;
}
