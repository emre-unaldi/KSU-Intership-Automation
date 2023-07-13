import User from '../models/User.js'
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import Announcement from "../models/Announcement.js";

const maxAge = 60 * 60 * 24
// JWT token oluşturma endpointi
const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge,
    })
}

const convertToTR = (role) => {
    if (role === 'student') {
        return 'Öğrenci'
    } else {
        return 'Öğretmen'
    }
}

// Kullanıcı ekleme endpointi
export const registerUser = async (req, res) => {
    const {email} = await req.body
    const existingUser = await User.find({email})

    if (existingUser[0]) {
        // E-posta adresiyle eşleşen kullanıcı varsa hata döndürün
        return res.json({
            status: 'fail',
            message: 'Bu email adresi zaten kullanımda. Farklı bir email adresi girin',
            existingUser: existingUser[0]
        })
    } else {
        // Eşleşen kullanıcı yoksa yeni kullanıcıyı kaydet
        const user = new User(req.body)

        await user
            .save()
            .then((user) => {
                return res.json({
                    status: 'success',
                    message: `${convertToTR(user.role)} ${user.name} ${user.surname} kullanıcısı başarıyla kaydedildi`,
                    user
                })
            })
            .catch((error) => {
                return res.json({
                    status: 'fail',
                    message: `${convertToTR(user.role)} kullanıcısı kaydedilemedi`,
                    error
                })
            })
    }
}

// Kullanıcı güncelleme endpointi
export const updateUser = async (req, res) => {
    const {_id, name, surname, schoolNumber, phoneNumber, email} = await req.body
    let fieldSToUpdate = {}

    if (!_id) {
        return res.json({
            status: 'fail',
            message: 'Kullanıcı kimliği bulunamadığı için güncellenemedi'
        })
    } else {
        if (schoolNumber) {
            fieldSToUpdate = {name, surname, schoolNumber, email}
        }

        if (phoneNumber) {
            fieldSToUpdate = {name, surname, phoneNumber, email}
        }

        await User.findByIdAndUpdate(
            {_id},
            fieldSToUpdate,
            {new: true}
        )
            .then((data) => {
                return res.json({
                    status: 'success',
                    message: 'Kullanıcı kaydı başarıyla güncellendi',
                    data
                })
            }).catch((error) => {
                return res.json({
                    status: 'fail',
                    message: 'Kullanıcı kaydı güncellenemedi',
                    error
                })
            })
    }
}

// Kullanıcı yetkilendirme endpointi
export const authorityUser = async (req, res) => {
    const { _id } = await req.body

    if (!_id) {
        return res.json({
            status: 'fail',
            message: 'Kullanıcı kimliği bulunamadığı için yetkilendirilemedi'
        })
    } else {
        await User.findByIdAndUpdate(
            {_id},
            { role: "admin" },
            { new: true }
        )
            .then((data) => {
                return res.json({
                    status: 'success',
                    message: 'Kullanıcı başarıyla yetkilendirildi',
                    data
                })
            }).catch((error) => {
                return res.json({
                    status: 'fail',
                    message: 'Kullanıcı yetkilendirilemedi',
                    error
                })
            })
    }
}

// Kullanıcı silme enpointi
export const deleteUser = async (req, res) => {
    const {_id} = await req.body

    if (!_id) {
        return res.json({
            status: 'fail',
            message: 'Kullanıcı kimliği bulunamadığı için öğrenci silinemedi'
        })
    } else {
        await User.findByIdAndDelete(_id)
            .then((data) => {
                return res.json({
                    status: 'success',
                    message: 'Kullanıcı başarıyla silindi',
                    data
                })
            }).catch((error) => {
                return res.json({
                    status: 'fail',
                    message: 'Kullanıcı silinemedi',
                    error
                })
            })
    }
}

// Kullanıcıları listeleme endpointi
export const getAllUsers = async (req, res) => {
    const users = User.find({})

    await users
        .then((data) => {
            return res.json({
                status: 'success',
                message: 'All users found',
                data
            })
        })
        .catch((error) => {
            return res.json({
                status: 'fail',
                message: 'All users not found',
                error
            })
        })
}

// Kullanıcıları ve stajlarını listeleme endpointi
export const getAllUserAndInternships = async (req, res) => {
    const UserAndInternships = User.aggregate([
        {
            $lookup: {
                from: 'Internships',
                localField: '_id',
                foreignField: 'studentID',
                as: 'internships'
            }
        },
        {
            $unwind: {
                path: '$internships',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    schoolNumber: '$schoolNumber',
                    email: '$email',
                    password: '$password',
                    role: '$role',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt'
                },
                internships: {
                    $push: '$internships'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                schoolNumber: '$_id.schoolNumber',
                email: '$_id.email',
                password: '$_id.password',
                role: '$_id.role',
                createdAt: '$_id.createdAt',
                updatedAt: '$_id.updatedAt',
                internships: '$internships'
            }
        }
    ])

    await UserAndInternships.then((data) => {
        return res.json({
            status: 'success',
            message: 'Kullanıcılar mevcut stajlarıyla birlikte başarıyla getirildi',
            data
        })
    }).catch((error) => {
        return res.json({
            status: 'fail',
            message: 'Kullanıcılar mevcut stajlarıyla birlikte getirilemedi',
            error
        })
    })
}

// Kullanıcı giriş endpointi
export const loginUser = async (req, res) => {
    const {email, password} = await req.body
    const existingUser = User.find({email})

    existingUser
        .then((user) => {
            // kullanıcı varsa
            compare(password, user[0].password, (error, same) => {
                if (same) {
                    // parola doğruysa
                    const token = generateToken(user[0]._id)

                    res.cookie('CONNECT_UID', token, {
                        withCredentials: true,
                        httpOnly: true,
                        maxAge: maxAge * 1000
                    })

                    return res.json({
                        status: 'success',
                        message: `${convertToTR(user[0].role)} kullanıcısı başarıyla giriş yaptı. Yönlendiriliyor`,
                        user
                    })
                } else {
                    // parola yanlışsa
                    return res.json({
                        status: 'fail',
                        message: 'Kullanıcının email adresi veya parolası doğru değil'
                    })
                }
            })
        })
        .catch(() => {
            // kullanıcı yoksa
            return res.json({
                status: 'fail',
                message: 'Girilen bilgilere ait kullanıcı bulunamadı'
            })
        })
}

// Kullanıcı çıkış endpointi
export const logoutUser = async (req, res) => {
    await res.clearCookie('CONNECT_UID')
    return res.json({
        status: 'success',
        message: 'Kullanıcı çıkış yaptı',
    })
}

// Kullanıcı kontrol endpointi
export const checkUser = async (req, res) => {
    const token = await req.cookies.CONNECT_UID

    if (token) {
        // token var
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decodedToken) => {
                if (error) {
                    return res.json({
                        status: 'fail',
                        message: 'Token doğrulaması başarısız',
                        error
                    })
                } else {
                    const existingUser = await User.findById(decodedToken.userId)

                    if (existingUser) {
                        return res.json({
                            status: 'success',
                            message: `Kullanıcı bulundu. Mevcut kullanıcı ${existingUser.name} ${existingUser.surname}`,
                            user: existingUser
                        })
                    } else {
                        return res.json({
                            status: 'fail',
                            message: 'Kullanıcı bulunamadı'
                        })
                    }
                }
            }
        )
    } else {
        // token yok
        return res.json({
            status: 'fail',
            message: 'Token bulunamadı'
        })
    }
}



