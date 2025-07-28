import "dotenv/config";

export const authMiddleware = ( req, res, next ) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }


    const validAdminApiKeys = process.env.API_KEY.split(',');
    if ( req.path.startsWith('/admin') && !validAdminApiKeys.includes(apiKey) ) {
        return res.status(403).json({ message: 'Forbidden: Invalid Admin API Key' });
    }

    next();
}