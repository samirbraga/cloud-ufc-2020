import userData from './usersData.json';

export default {
    'GET /api/users': (req, res) => {
        res.json(userData);
    }
};