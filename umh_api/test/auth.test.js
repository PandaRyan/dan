import { describe, test, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from './app'; 
import User from './models/Users'; 

describe('Isolated Backend Test: Auth Routes', () => {
  
  // Clear out the spies after every test so they don't interfere with each other
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should return 404 if user is not found, WITHOUT hitting the database', async () => {
    
    // the mock
    // If anyone calls User.findOne, don't ask MongoDB. Just instantly return null.
    const findOneSpy = vi.spyOn(User, 'findOne').mockResolvedValue(null);

    //Send a fake POST request to your Express app
    const response = await request(app)
      .post('/api/auth/signin') //change to zai later
      .send({ 
        email: 'ghost@example.com', 
        password: 'password123' 
      });

    //check response
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
    
    //check that the database was never called
    expect(findOneSpy).toHaveBeenCalledTimes(1); 
  });
});