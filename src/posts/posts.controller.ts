import { PostsService } from './posts.service';
import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { CreatePostDTO } from './dtos/create-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  async createPost(@Body() postDTO: CreatePostDTO, @UploadedFile() image: any) {
    return await this.postsService.createPost(postDTO, image);
  }
}
