import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NetworkErrors } from 'src/auth/constants';
import { Post } from 'src/database/models/posts.model';
import { CreatePostDTO } from './dtos/create-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postsService: typeof Post,
    private readonly usersService: UsersService
  ) {}

  async getPostByValue(value: string) {
    return await this.postsService.findOne({ where: { title: value } });
  }

  async checkIfPostWithSuchTitleExists(postDTO: CreatePostDTO) {
    const candidate = await this.getPostByValue(postDTO.title);
    if (candidate) {
      throw new HttpException(
        NetworkErrors.POST_EXISTS,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createPost(postDTO: CreatePostDTO, image: any) {
    console.log('typeof image');
    console.log(typeof image);

    await this.checkIfPostWithSuchTitleExists(postDTO);
    return await this.postsService.create({ ...postDTO, image: 'fileName' });
  }
}
