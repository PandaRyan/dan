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
  const url = 'http://localhost:5000/api/health'; // Change this to your actual auth endpoint, e.g., 'http://localhost:5000/api/auth/login' 
  // or change to zai later

  //json structure for login
  const payload = JSON.stringify({
    email: 'testuser@example.com', 
    password: 'password123',
  });

  //send the payload as json
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //send the payload and headers together
  const res = http.post(url, payload, params); 
  
  //see if the login was actually successful
  check(res, {
    'is status 200 (Login Success)': (r) => r.status === 200,
  });

  sleep(1); 
}