const generateId = (max = 1e9, offset = 1000) => Math.floor(Math.random() * (max - offset)) + offset;

generateId.smallint = () => generateId(32767, 100);

export {
    generateId
};

