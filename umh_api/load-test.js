import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 50,           
  duration: '10s',   
  thresholds: {
    http_req_duration: ['avg<800'], 
  },
};

export default function () {
  const url = 'http://localhost:5000/api/auth/signin'; 

  // 1. You MUST provide the exact JSON structure your auth route expects.
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

  // 3. This is where the actual HTTP POST request happens. We send the payload and headers together.
  const res = http.post(url, payload, params); 
  
  // 4. Check if the login was actually successful
  check(res, {
    'is status 200 (Login Success)': (r) => r.status === 200,
  });

  sleep(1); 
}