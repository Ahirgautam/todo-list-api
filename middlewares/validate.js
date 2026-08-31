
const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body)
            next()
        }
        catch (err) {
            return res.status(400).json({ "message": err.message });
        }
    }
}

export default validateSchema