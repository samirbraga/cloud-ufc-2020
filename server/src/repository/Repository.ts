import { generateId } from "../postgres-db/utils"

abstract class IRepository<Model, IModel=Model> {
    public generateId() {
        return generateId.smallint()
    }

    abstract getById(id: number | string): Promise<Model>

    abstract getAll(filters: any): Promise<Model[]>

    abstract insert(data: IModel): Promise<Model>

    abstract updateById(id: number | string, updated: Partial<IModel>): Promise<[number, Model[]]>

    abstract destroyById(id: number | string): Promise<number>

    abstract destroy(filters: Partial<IModel>): Promise<number>
}

export default IRepository