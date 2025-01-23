import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../database";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
  // 모든 포스트 조회
  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    const postRepository = AppDataSource.getRepository(Post);

    return await postRepository.find();
  }

  // 새로운 포스트 추가하기
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("tags", () => [String]) tags: string[],
    @Arg("createdDate") createdDate: string
  ): Promise<Post> {
    const postRepository = AppDataSource.getRepository(Post);

    const post = postRepository.create({
      title,
      tags,
      createdDate,
    });

    return await postRepository.save(post);
  }
}
