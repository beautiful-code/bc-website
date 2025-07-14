export interface Author {
  name: string;
  profilePicUrl: string;
}

export const authorMap: Record<string, Author> = {
  Manjunath: {
    name: "Manjunath",
    profilePicUrl:
      "https://cdn.theorg.com/457e05fe-0414-423c-954f-34fa6d94a622_thumb.jpg",
  },
};

export function getAuthor(authorName: string): Author | null {
  return authorMap[authorName] || null;
}
