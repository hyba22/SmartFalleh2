import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

async function checkUser() {
    const email = 'test4@example.com';

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
        const user = await dataSource.query(
            'SELECT id, email, password, role, created_at, updated_at FROM user WHERE email = ?',
            [email]
        );

        if (user && user.length > 0) {
            console.log('User found:');
            console.log(`ID: ${user[0].id}`);
            console.log(`Email: ${user[0].email}`);
            console.log(`Password hash: ${user[0].password}`);
            console.log(`Role: ${user[0].role}`);
            console.log(`Created at: ${user[0].created_at}`);
            console.log(`Updated at: ${user[0].updated_at}`);
            console.log('\nHash format check:');
            const hash = user[0].password;
            console.log(`Starts with $2b$: ${hash.startsWith('$2b$')}`);
            console.log(`Starts with $2a$: ${hash.startsWith('$2a$')}`);
            console.log(`Starts with $2y$: ${hash.startsWith('$2y$')}`);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error checking user:', error);
    } finally {
        await dataSource.destroy();
    }
}

checkUser();
