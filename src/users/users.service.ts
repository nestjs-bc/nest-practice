import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Entity, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { transformPw } from 'src/utils/PwTransformer';
import { encryptUserData } from 'src/utils/cypher';

//export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  findAll(where, order): Promise<User[]> {
    return this.usersRepository.find({
      where: where,
      order: order,
    });
  }

  findOne(email: string): Promise<User> {
    // string -> number
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User) {
    user.password = await transformPw(user.password);
    // 암호화 로직
    const user_ = await encryptUserData(user);
    const userData = this.usersRepository.create(user_);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(userData);
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
