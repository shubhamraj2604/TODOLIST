import {neon} from '@neondatabase/serverless'
import dotenv from 'dotenv'

dotenv.config();

const {PGHOST , PGUSER , PGPASSWORD , PGDATABASE} = process.env

export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`
)