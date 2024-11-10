import mongoose from 'mongoose';
import { PAGINATE_OPTIONS } from '../../../config/BuildConfig';

export type ModelType<T> = mongoose.Model<T>;

class BaseCollection<T> {
    model: ModelType<T>;

    constructor(model: ModelType<T>) {
        this.model = model;
    }

    getModel(): ModelType<T> {
        return this.model;
    }

    // Cập nhật các phương thức trả về với kiểu T
    store(data: T, user?: any): Promise<T> {
        if (user) {
            return this.model.create({
                ...data,
                created_by: user._id ?? null,
                updated_by: user._id ?? null,
            });
        }
        return this.model.create(data);
    }

    findBy(conditions = {}, sort = {}): Promise<T[]> {
        return this.model
            .find({ ...conditions, deleted_at: null })
            .sort(sort)
            .exec();
    }

    findOne(conditions = {}): Promise<T | null> {
        return this.model.findOne({ ...conditions, deleted_at: null }).exec();
    }

    findById(id: string): Promise<T | null> {
        return this.model.findOne({ _id: id, deleted_at: null }).exec();
    }

    update(id: string, data: Partial<T>, user?: any): Promise<T | null> {
        if (user) {
            return this.model
                .findByIdAndUpdate(id, {
                    ...data,
                    updated_by: user._id ?? null,
                    updated_at: new Date(),
                })
                .exec();
        }

        return this.model.findByIdAndUpdate(id, data).exec();
    }

    count(conditions = {}): Promise<number> {
        return this.model.countDocuments({ ...conditions }).exec();
    }

    delete(id: string, user?: string): Promise<T | null> {
        return this.model
            .findByIdAndUpdate(id, {
                deleted_at: new Date(),
                deleted_by: user,
                is_deleted: 1,
            })
            .exec();
    }

    async paginate(conditions: any, limit = PAGINATE_OPTIONS.limit, page = PAGINATE_OPTIONS.page) {
        limit = +limit || PAGINATE_OPTIONS.limit;
        page = +page || PAGINATE_OPTIONS.page;
        const con = { ...conditions };
        if (conditions.is_deleted != 1) con.is_deleted = 0;
        console.log(limit, page, limit * (page - 1))
        const data = this.model
            .find(con)
            .skip(limit * (page - 1))
            .limit(limit)
            .exec()
        const total = await this.model.countDocuments(conditions).exec()

        return {
            docs: data,
            total,
            limit,
            page,
            totalPage: Math.ceil(total / limit),
        };
    }
}

export default BaseCollection;
