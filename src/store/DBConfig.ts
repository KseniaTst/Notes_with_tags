export const DBConfig = {
    name: "MyDB",
    version: 1,
    objectStoresMeta: [
        {
            store: "notes",
            storeConfig: {keyPath: "id", autoIncrement: true},
            storeSchema:
                [
                { name: "id", keypath: "id", options: { unique: true } },
                { name: "text", keypath: "name", options: { unique: false } },
                { name: "tag", keypath: "tag", options: { unique: false } },
            ],
        },
    ],
};