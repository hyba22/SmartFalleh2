import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

async function checkSpecificUser() {
    const email = 'bouslahihiba55@hmail.com';

    // Initialize database connection
    const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['src/**/*.entity{.ts,.js}'],
        synchronize: false,
    });

    try {
        await dataSource.initialize();
        console.log('Database connected');

        // Query the user
        const [user] = await dataSource.query(
            'SELECT id, email, password, role, created_at, updated_at FROM user WHERE email = ?',
            [email]
        );

        if (user) {
            console.log('User found:');
            console.log(`ID: ${user.id}`);
            console.log(`Email: ${user.email}`);
            console.log(`Password hash: ${user.password}`);
            console.log(`Role: ${user.role}`);
            console.log(`Created at: ${user.created_at}`);
            console.log(`Updated at: ${user.updated_at}`);
            
            // Check hash format
            const hash = user.password;
            console.log('\nHash format check:');
            console.log(`Starts with $2b$: ${hash.startsWith('$2b$')}`);
            console.log(`Starts with $2a$: ${hash.startsWith('$2a$')}`);
            console.log(`Starts with $2y$: ${hash.startsWith('$2y$')}`);
            
            // Check if the password matches
            const bcrypt = require('bcrypt');
            const isMatch = await bcrypt.compare('Hiba1234', hash);
            console.log(`\nPassword 'Hiba1234' matches hash: ${isMatch}`);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error checking user:', error);
    } finally {
        await dataSource.destroy();
    }
}

checkSpecificUser();
