import mongoose from 'mongoose';
import { PAGINATE_OPTIONS } from '../../../config/BuildConfig';
export type ModelType = mongoose.Model<mongoose.Document | any>;
class BaseCollection {
    model: ModelType;

    constructor(model: ModelType) {
        this.model = model;
    }

    getModel() {
        return this.model;
    }

    setModel(model: ModelType) {
        this.model = model;
    }
    // Tạo mớis
    store(data: any, user?: any) {
        if (user) {
            return this.getModel().create({
                ...data,
                created_by: user._id ?? null,
                updated_by: user._id ?? null,
            });
        }
        return this.getModel().create(data);
    }

    // tìm 1 hoặc nhiều
    findBy(conditions = {}, sort = {}) {
        return this.getModel()
            .find({ ...conditions, deleted_at: null })
            .sort(sort);
    }
    // tìm 1 cái
    findOne(conditions = {}) {
        return this.getModel().findOne({ ...conditions, deleted_at: null });
    }
    // tìm kiếm theo id
    findById(id: string) {
        return this.getModel().findOne({
            _id: id,
            deleted_at: null,
        });
    }
    // Cập nhật
    update(id: string, data: any, user?: any) {
        if (user) {
            return this.getModel().findByIdAndUpdate(id, {
                ...data,
                updated_by: user._id ?? null,
                updated_at: new Date(),
            });
        }

        return this.getModel().findByIdAndUpdate(id, data);
    }
    // Đếm theo conditions
    count(conditions = {}) {
        return this.getModel().countDocuments({ ...conditions });
    }
    // Xoá theo id
    delete(id: string, user?: string) {
        return this.getModel().findByIdAndUpdate(id, {
            deleted_at: new Date(),
            deleted_by: user,
            is_deleted: 1,
        });
    }
    // Tìm kiếm tất cả và phân trang
    async paginate(conditions: any, limit = PAGINATE_OPTIONS.limit, page = PAGINATE_OPTIONS.page) {
        limit = +limit || PAGINATE_OPTIONS.limit;
        page = +page || PAGINATE_OPTIONS.page;
        const con = { ...conditions };
        if (conditions.is_deleted != 1) con.is_deleted = 0;
        const [data, total] = await Promise.all([
            this.getModel()
                .find(con)
                .skip(limit * (page - 1))
                .limit(limit),
            this.getModel().countDocuments(conditions),
        ]);

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
