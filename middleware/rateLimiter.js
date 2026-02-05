import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // set `RateLimit` and `RateLimit-Policy` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    keyGenerator: (req, res) => {
        return req.user ? req.user.id : req.ip; // Use userId if available, else IP
    },
    message: {
        success: false,
        message: "Too many requests, please try again after 15 minutes"
    }
});

