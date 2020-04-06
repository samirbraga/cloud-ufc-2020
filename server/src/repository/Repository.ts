interface IRepository<Model, IModel=Model> {
    getById(id: number): Promise<Model>

    getAll(filters: Partial<IModel>): Promise<Model[]>

    insert(data: IModel): Promise<Model>

    updateById(id: string, updated: Partial<IModel>): Promise<[number, Model[]]>

    destroyById(id: string): Promise<number>

    destroy(filters: Partial<IModel>): Promise<number>
}

export default IRepository