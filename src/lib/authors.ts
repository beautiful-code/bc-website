export interface Author {
  name: string;
  imageFile: string;
}

export const authorMap: Record<string, Author> = {
  Manjunath: {
    name: "Manjunath",
    imageFile: "manjunath.jpg",
  },
};

export function getAuthor(authorName: string): Author | null {
  return authorMap[authorName] || null;
}
