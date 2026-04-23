import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 50,           
  duration: '10s',   
  thresholds: {
    http_req_duration: ['p(95)<800'], 
    http_req_failed: ['rate<0.01'],   
  },
};

export default function () {
  const url = 'http://localhost:5000/api/auth/signin'; // Ensure this matches your launched server port!

  

  // 1. You MUST provide the exact JSON structure your auth route expects.
  // Replace these with a real username/email and password that actually exists in your database.
  const payload = JSON.stringify({
    email: 'testuser@example.com', 
    password: 'password123',
  });

  // 2. You MUST tell Express that you are sending JSON data, otherwise req.body will be empty!
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 3. Notice we changed http.get() to http.post()
  const res = http.post(url, payload, params); 
  
  // 4. Check if the login was actually successful
  check(res, {
    'is status 200 (Login Success)': (r) => r.status === 200,
    // Optional: If your server sends a token back, you can verify it isn't crashing by checking for a 500 error instead
    // 'did not crash': (r) => r.status !== 500, 
  });

  sleep(1); 
}