// test-db.mjs
import mongoose from 'mongoose';

const uri = 'mongodb+srv://aamirsheikh0008_db_user:AcfJDdmjRwrlmDbG@cluster0.c2ekhpp.mongodb.net/?appName=Cluster0'; // paste directly, no .env

async function test() {
  try {
    console.log('Connecting...');
    await mongoose.connect(uri);
    console.log('✅ Connected!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  }
}

test();