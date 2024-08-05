const Redis = require('ioredis');

// Configure Redis client
const redis = new Redis({
  host: 'localhost', // Redis server host
  port: 6379,        // Redis server port
  // password: 'your-redis-password', // Uncomment if Redis requires a password
});

// Function to test Redis connection
async function testRedis() {
  try {
    // Set a value in Redis
    await redis.set('test_key', 'Hello, Redis!');

    // Retrieve the value from Redis
    const value = await redis.get('test_key');

    // Print the value to the console
    console.log('Value from Redis:', value);

    // Close the Redis connection
    redis.quit();
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the test function
testRedis();
