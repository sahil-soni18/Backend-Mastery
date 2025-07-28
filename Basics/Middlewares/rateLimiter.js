import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 10* 1000, 
  max: 4, 
  message: 'Too many requests from this IP, please try again later'
});

export default apiLimiter;