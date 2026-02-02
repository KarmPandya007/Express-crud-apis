import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // set `RateLimit` and `RateLimit-Policy` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    }
});

export { limiter };
