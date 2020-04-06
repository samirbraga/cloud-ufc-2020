import { generateId } from "../db/utils"

abstract class IRepository<Model, IModel=Model> {
    public generateId() {
        return generateId()
    }

    abstract getById(id: number): Promise<Model>

    abstract getAll(filters: Partial<IModel>): Promise<Model[]>

    abstract insert(data: IModel): Promise<Model>

    abstract updateById(id: number, updated: Partial<IModel>): Promise<[number, Model[]]>

    abstract destroyById(id: number): Promise<number>

    abstract destroy(filters: Partial<IModel>): Promise<number>
}

export default IRepository