import mongoose from 'mongoose';
import { readFileSync } from "fs";

const {
    AWS_DOCDB_USER,
    AWS_DOCDB_PASS,
    AWS_DOCDB_HOST
} = process.env;

const url = `mongodb://${AWS_DOCDB_USER}:${AWS_DOCDB_PASS}@${AWS_DOCDB_HOST}`

const db = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false,
    // sslCA: [readFileSync('rds-combined-ca-bundle.pem')]
})

export default db;