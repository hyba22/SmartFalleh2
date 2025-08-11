import * as bcrypt from 'bcrypt';

async function testPassword() {
    const testPassword = 'testpassword123';
    
    console.log('Testing password hashing and comparison...');
    console.log(`Test password: ${testPassword}`);
    
    // Hash the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(testPassword, saltRounds);
    console.log(`Generated hash: ${hash}`);
    
    // Test comparison
    const isMatch = await bcrypt.compare(testPassword, hash);
    console.log(`Password matches hash: ${isMatch}`);
    
    if (isMatch) {
        console.log('✅ Password hashing and comparison works correctly!');
    } else {
        console.error('❌ Password hashing and comparison failed!');
    }
}

testPassword().catch(console.error);
