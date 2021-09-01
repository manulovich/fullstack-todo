const saltRounds = 7;
const mongodbUrl = process.env.mongodbUrl;
const secretKey = process.env.secretKey;

export default {
    saltRounds,
    mongodbUrl,
    secretKey
};
