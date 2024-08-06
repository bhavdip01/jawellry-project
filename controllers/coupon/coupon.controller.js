const coupon = require("../../models/coupon.model")
const useCoupon = require("../../models/useCoupon.model")
const { MESSAGE } = require("../../helpers/constant.helper")


const createCoupon = async (req, res, next) => {
    try {

        const { couponName, couponCode, discountType, amount, isActive, isDeleted, startDate, endDate, startTime, endTime } = req.body

        let checkCouponCode = await coupon.findOne({ couponCode: couponCode })
        if (checkCouponCode) {
            return res.send({ message: MESSAGE.COUPON_CODE })
        }

        const payload = {
            couponName: couponName,
            couponCode: couponCode,
            discountType: discountType,
            amount: amount,
            isActive: isActive,
            isDeleted: isDeleted,
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime
        }


        let couponData = await coupon.create(payload)

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload: couponData
        })

    } catch (error) {
        return res.status(500).send(error);
    }
}

const getCoupon = async (req, res, next) => {
    try {
        const { id, couponName, page, limit } = req.query
        let skip = (page - 1) * limit

        checkCoupon = await useCoupon.findOne({ couponId: id })
        if (checkCoupon) {
            return res.send({ message: MESSAGE.USE_COUPON })
        }

        let query = { isActive: true }
        if (id) {
            query = { _id: id }
        }
        if (couponName) {
            query = { couponName: couponName }
        }

        let couponData = await coupon.find(query).skip(skip).limit(limit)


        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload: couponData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

const updateCoupon = async (req, res, next) => {
    try {
        const { id } = req.query

        let checkCoupon = await coupon.findOne({ _id: id, isActive: true })
        if (!checkCoupon) {
            return res.status(404).send({ message: MESSAGE.NOT_FOUND })
        }

        const payload = {
            amount: req.body.amount,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        }

        let couponData = await coupon.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: payload
            },
            {
                new: true
            }
        )

        return res.status(200).send({
            message: MESSAGE.UPDATED_SUCCESSFULLY,
            payload: couponData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

const deleteCoupon = async (req, res, next) => {
    try {
        const { id } = req.query

        let checkCoupon = await coupon.findOne({ _id: id, isActive: true })
        if (!checkCoupon) {
            return res.status(404).send({ message: MESSAGE.NOT_FOUND })
        }

        await coupon.findOneAndUpdate({ _id: id }, { $set: { isActive: false } }, { new: true })

        return res.status(200).send({
            message: MESSAGE.DELETED_SUCCESSFULLY,
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}


