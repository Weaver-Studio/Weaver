import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@weaver/ui/components/ui/card";
import { api } from "@weaver/backend/convex/_generated/api";
import { useQuery } from 'convex/react';


export type PostWithAuthor = {
  _id: string;
  _creationTime: number;
  userId: string;
  title: string;
  content: string;
  updateAt: number;
  author: {
    name: string;
  } | null;
};

export function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <Card>
      <CardHeader>
        <Link to="/posts/$postId" params={{ postId: post._id }}>
          <CardTitle>{post.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p>{post.content.substring(0, 100)}...</p>
      </CardContent>
      <CardFooter>
        <p>Posted by {post.author?.name}</p>
      </CardFooter>
    </Card>
  );
}
