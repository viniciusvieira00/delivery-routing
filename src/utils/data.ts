// data.ts

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  interests: string[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

export const users: User[] = [
  { id: 1, name: 'Alice', username: 'alice', password: 'password123', interests: ['tech', 'music', 'art'] },
  { id: 2, name: 'Bob', username: 'bob', password: 'password123', interests: ['tech', 'sports', 'travel'] },
  { id: 3, name: 'Charlie', username: 'charlie', password: 'password123', interests: ['music', 'travel', 'food'] },
  { id: 4, name: 'David', username: 'david', password: 'password123', interests: ['sports', 'art', 'tech'] },
  { id: 5, name: 'Eve', username: 'eve', password: 'password123', interests: ['food', 'art', 'tech'] },
];

export const posts: Post[] = [
  { id: 1, title: 'Latest Tech Trends', content: 'Discover the latest trends in technology and how they are shaping the future.', tags: ['tech'] },
  { id: 2, title: 'Top Travel Destinations', content: 'Explore the top travel destinations for this year and plan your next adventure.', tags: ['travel'] },
  { id: 3, title: 'Best Music Albums', content: 'A roundup of the best music albums released this year across various genres.', tags: ['music'] },
  { id: 4, title: 'Healthy Food Recipes', content: 'Try these delicious and healthy food recipes that are easy to make at home.', tags: ['food'] },
  { id: 5, title: 'The Art of Painting', content: 'Learn about the different styles of painting and tips for beginners.', tags: ['art'] },
  { id: 6, title: 'Tech Gadgets Review', content: 'Our review of the latest tech gadgets available in the market.', tags: ['tech'] },
  { id: 7, title: 'Exploring the World', content: 'A guide to exploring the world and experiencing new cultures.', tags: ['travel'] },
  { id: 8, title: 'Sports Highlights', content: 'Catch up on the latest highlights from various sports events.', tags: ['sports'] },
  { id: 9, title: 'Music for Relaxation', content: 'The best music tracks for relaxation and unwinding after a long day.', tags: ['music'] },
  { id: 10, title: 'Delicious Dishes', content: 'Explore our collection of delicious dishes from around the world.', tags: ['food'] },
  { id: 11, title: 'Modern Art', content: 'An introduction to modern art and its impact on contemporary culture.', tags: ['art'] },
  { id: 12, title: 'Tech Innovations', content: 'Discover the latest innovations in technology and their potential impact.', tags: ['tech'] },
  { id: 13, title: 'Travel Tips', content: 'Essential travel tips to make your trips more enjoyable and stress-free.', tags: ['travel'] },
  { id: 14, title: 'Sports Training', content: 'Tips and techniques for improving your sports performance.', tags: ['sports'] },
  { id: 15, title: 'Music Genres', content: 'A guide to different music genres and their characteristics.', tags: ['music'] },
  { id: 16, title: 'Digital Art', content: 'An exploration of digital art and its growing popularity.', tags: ['art'] },
  { id: 17, title: 'Fitness Tech', content: 'The latest tech products designed to enhance your fitness routine.', tags: ['tech'] },
  { id: 18, title: 'Travel Photography', content: 'Tips for capturing stunning travel photographs.', tags: ['travel'] },
  { id: 19, title: 'Music Production', content: 'An introduction to music production and the tools you need to get started.', tags: ['music'] },
  { id: 20, title: 'Healthy Living', content: 'Tips for maintaining a healthy lifestyle through diet and exercise.', tags: ['food'] },
];
