const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
	const cookies = req.cookies
	console.log(cookies)
	if (!cookies?.jwt) return res.sendStatus(401)

	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) return res.send('No user in DB').status(403) //Forbidden
	// evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
		if (err) return res.sendStatus(403)

		const accessToken = jwt.sign(
			{ _id: foundUser._id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		)
		res.json({ accessToken })
	})
})

module.exports = router
