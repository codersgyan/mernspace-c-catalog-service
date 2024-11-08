import CategoryModel from "./category-model";
import { Category } from "./category-types";

export class CategoryService {
    async create(category: Category) {
        const newCategory = new CategoryModel(category);
        return await newCategory.save();
    }

    async getAll() {
        return await CategoryModel.find();
    }

    async getOne(categoryId: string) {
        return await CategoryModel.findOne({ _id: categoryId });
    }

    async update(
        categoryId: string,
        updateData: Partial<Category>,
    ): Promise<({ _id: string } & Category) | null> {
        return await CategoryModel.findByIdAndUpdate(
            categoryId,
            { $set: updateData },
            { new: true },
        );
    }
}
