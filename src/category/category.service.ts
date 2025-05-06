import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/db/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryEnum } from './category.enum';

@Injectable()
export class CategoryService implements OnModuleInit{
      constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
      ){}
  async onModuleInit() {
    await this.seedCategories()
  }

  private async seedCategories() {
    const defaultCategories = Object.values(CategoryEnum)

    for (const categoryName of defaultCategories) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: categoryName } });
      if (!existingCategory) {
        const newCategory = this.categoryRepository.create({ name: categoryName });
        await this.categoryRepository.save(newCategory);
      }
    }
  }
}
