// test-db.mjs
import mongoose from 'mongoose';

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
