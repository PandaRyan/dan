import http from 'k6/http';
import { sleep, check } from 'k6';

// This is where we strictly enforce your CI/CD table requirements!
export const options = {
  vus: 50,           // Simulate 50 virtual users hitting the API at the exact same time
  duration: '10s',   // Blast the API continuously for 10 seconds
  thresholds: {
    // The magic rule: 95% of all requests MUST finish in under 800 milliseconds
    http_req_duration: ['p(95)<800'], 
    // Another good rule: Less than 1% of requests are allowed to fail
    http_req_failed: ['rate<0.01'],   
  },
};
//retest
export default function () {
  // Replace this URL with an actual endpoint you create in your Express app
  // (e.g., a simple health check or a database fetch route)
  const res = http.get('http://localhost:5000/api/auth'); 
  
  // Optional: Check that the server actually responded with a 200 OK status
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1); // Small pause between simulated user clicks
}