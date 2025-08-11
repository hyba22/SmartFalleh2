import * as bcrypt from 'bcrypt';

async function checkPassword(plainPassword: string, hashedPassword: string) {
    try {
        console.log('Comparing passwords...');
        console.log(`Plain password: ${plainPassword}`);
        console.log(`Hashed password: ${hashedPassword}`);
        
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        console.log(`Password match: ${isMatch}`);
        
        // Try to generate a hash to see if it works
        const saltRounds = 10;
        const newHash = await bcrypt.hash(plainPassword, saltRounds);
        console.log(`New hash for verification: ${newHash}`);
        
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}

// Example usage (replace with actual values)
// checkPassword('your_password', 'stored_hash_here')
//     .then(result => console.log('Result:', result))
//     .catch(err => console.error('Error:', err));
