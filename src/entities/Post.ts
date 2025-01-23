import { ObjectType, Field, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  "postId": string;

  @Field()
  @Column()
  "title": string;

  @Field(() => [String])
  @Column("simple-array") // tags는 배열로 저장
  "tags": string[];

  @Field()
  @Column()
  "createdDate": string;
}
